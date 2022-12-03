//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "../interfaces/IdManager.sol";
import "../interfaces/Report.sol";
import "../interfaces/Reputation.sol";
import "./ReporterRateLimiter.sol";

contract CreepzIdManager is IdManager, ReporterRateLimiter {
    int256 private constant SMOOTHING_FACTOR = 4;
    uint256 private constant REPUTATION_DELTA_UPPERBOUND = 20;
    uint256 private constant REPUTATION_DELTA_LOWERBOUND = 1;
    uint8 private constant REPUTATION_DELTA_ACCURACY = 8;

    event NewReport(bytes32 against, uint256 severity);

    mapping(bytes32 => Report) private reports;
    mapping(bytes32 => Reputation) reputations;

    function setReporterRateLimit(uint64 aRate)
        public
        override
        returns (bool result)
    {
        // TODO: unimplemented
    }

    function report(
        bytes32 id,
        uint256 severity,
        string calldata metadataCID
    ) override public xyz returns (bytes32 newReportId) {
        bytes32 reportId = keccak256(abi.encodePacked(msg.sender, id));
        require(
            reports[reportId].id == bytes32(0),
            "Already reported by user!"
        );
        reports[reportId] = Report(reportId, id, severity, metadataCID);
        // compute reputation
        uint256 delta = normalize(severity, REPUTATION_DELTA_LOWERBOUND, REPUTATION_DELTA_UPPERBOUND, REPUTATION_DELTA_ACCURACY);
        updateReputation(keccak256(abi.encodePacked(msg.sender)), -int256(delta));
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
        reputations[id] = Reputation(
            newReputation,
            numInteractions + 1
        );
    }

    function normalize(
        uint256 value,
        uint256 minValue,
        uint256 maxValue,
        uint8 decimalPlaces
    ) internal pure returns (uint256) {
        // Calculate the range of the values
        uint256 range = maxValue - minValue;

        // Calculate the normalized value by dividing the value by the range and multiplying by 10^decimalPlaces
        uint256 normalizedValue = ((value - minValue) * (10**decimalPlaces)) /
            range;

        // Return the normalized value
        return normalizedValue;
    }
}
