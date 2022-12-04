//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../thirdparty/polygonid/lib/GenesisUtils.sol";
import "../thirdparty/polygonid/interfaces/ICircuitValidator.sol";
import "../thirdparty/polygonid/verifiers/ZKPVerifier.sol";
import "../interfaces/IdManager.sol";
import "../interfaces/Report.sol";
import "../interfaces/Reputation.sol";
import "./ReporterRateLimiter.sol";

contract CreepzIdManager is
    IdManager,
    ReporterRateLimiter,
    AccessControl
{
    int256 private constant SMOOTHING_FACTOR = 4;
    uint256 private constant REPUTATION_DELTA_UPPERBOUND = 20;
    uint256 private constant REPUTATION_DELTA_LOWERBOUND = 1;
    int256 private constant DEFAULT_GOODWILL_REPUTATION_DELTA = 5;
    uint64 public constant REPORT_REQUEST_ID = 1;
    bytes32 public constant COMMUNITY_MODERATOR_ROLE =
        keccak256("COMMUNITY_MODERATOR");

    event NewReport(bytes32 against, uint256 severity);

    // mapping(uint256 => address) public idToAddress;
    // mapping(address => uint256) public addressToId;

    mapping(bytes32 => Report) private reports;
    mapping(bytes32 => Reputation) reputations;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        initializeRateLimiter(100_000_000_000);
    }

    // /**
    //  * @dev _beforeProofSubmit
    //  */
    // function _beforeProofSubmit(
    //     uint64, /* requestId */
    //     uint256[] memory inputs,
    //     ICircuitValidator validator
    // ) internal view override {
    //     // check that challenge input of the proof is equal to the msg.sender
    //     address addr = GenesisUtils.int256ToAddress(
    //         inputs[validator.getChallengeInputIndex()]
    //     );
    //     require(
    //         _msgSender() == addr,
    //         "address in proof is not a sender address"
    //     );
    // }

    // /**
    //  * @dev _afterProofSubmit
    //  */
    // function _afterProofSubmit(
    //     uint64 requestId,
    //     uint256[] memory inputs,
    //     ICircuitValidator validator
    // ) internal override {
    //     require(
    //         requestId == REPORT_REQUEST_ID && addressToId[_msgSender()] == 0,
    //         "proof can not be submitted more than once"
    //     );

    //     uint256 id = inputs[validator.getChallengeInputIndex()];
    //     // execute the airdrop
    //     if (idToAddress[id] == address(0)) {
    //         addressToId[_msgSender()] = id;
    //         idToAddress[id] = _msgSender();
    //     }
    // }

    function setReporterRateLimit(uint64 aRate)
        public
        override
        returns (bool result)
    {
        require(hasRole(COMMUNITY_MODERATOR_ROLE, msg.sender));
        // TODO: unimplemented
        return false;
    }

    function report(
        bytes32 id,
        uint256 severity,
        string calldata metadataCID
    ) public override rateLimit returns (bytes32 newReportId) {
        bytes32 reportId = keccak256(abi.encodePacked(msg.sender, id));
        require(
            reports[reportId].id == bytes32(0),
            "Already reported by user!"
        );
        require(
            proofs[msg.sender][REPORT_REQUEST_ID] == true,
            "only identities who provided proof are allowed to submit reports!"
        );
        reports[reportId] = Report(reportId, id, severity, metadataCID);
        // compute reputation
        uint256 delta = normalize(
            severity,
            REPUTATION_DELTA_LOWERBOUND,
            REPUTATION_DELTA_UPPERBOUND
        );
        bytes32 reporter = keccak256(abi.encodePacked(msg.sender));
        updateReputation(id, -int256(delta));
        if (reputations[reporter].score == 0) {
            // reporter is unknown, set a default "goodwill" reputation.
            updateReputation(reporter, DEFAULT_GOODWILL_REPUTATION_DELTA);
        } else {
            updateReputation(reporter, int256(REPUTATION_DELTA_LOWERBOUND) * 2);
        }
        emit NewReport(id, severity);
        return reportId;
    }

    function getReputation(bytes32 identifier)
        external
        view
        returns (int256 score)
    {
        return reputations[identifier].score;
    }

    function updateReputation(bytes32 id, int256 reputationDelta) internal {
        // Retrieve the id's current reputation score and number of interactions
        int256 currentReputation = reputations[id].score;
        uint256 numInteractions = reputations[id].numInteractions;

        // Calculate the new reputation score using Laplace smoothing
        int256 newReputation = (currentReputation *
            int256(numInteractions) +
            reputationDelta +
            SMOOTHING_FACTOR) / int256(numInteractions + 1);

        // Update the entity's reputation score and number of interactions
        reputations[id] = Reputation(newReputation, numInteractions + 1);
    }

    function normalize(
        uint256 value,
        uint256 minValue,
        uint256 maxValue
    ) internal pure returns (uint256 normalizedValue) {
        // Calculate the difference between the original value and the minimum value of the range
        uint256 diff = value - minValue;

        // Calculate the range of the values
        uint256 range = maxValue - minValue;

        // Calculate the normalized value by dividing the value by the range
        normalizedValue = diff / range;
        return normalizedValue;
    }

    fallback() external payable {}

    receive() external payable {}
}
