//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "./Identifier.sol";

interface IdManager {

    function report(Identifier memory id, uint256 calldata severity, string calldata metadataCID) external returns (uint256 reportId);

    function getReputation(Identifier identifier) external returns(uint256 score);

    function claimIdentity(Identity id, Identifier withIdentifier) external returns(bool result);
}