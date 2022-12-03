//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

/*
* @author amrith92
* @notice Manages the reputation of IDs, and abuse reports.
*/
interface IdManager {

    /*
     * @notice Submits an abuse report
     * @param id The ID to file the report against
     * @param severity the level of severity
     * @param metadataCID ipfs metadata of the report
     * @returns reportId a report ID
     */
    function report(
        bytes32 id,
        uint256 severity,
        string calldata metadataCID
    ) external returns (bytes32 reportId);

    /*
     * @notice Gets the reputation score of an identifier
     * @param identifier a identifier hash
     * @returns score a reputation score
     */
    function getReputation(bytes32 identifier)
        external
        view
        returns (int256 score);
}
