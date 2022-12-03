//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

struct Report {
    bytes32 id;
    bytes32 against;
    uint256 severity;
    string metadataCID;
}