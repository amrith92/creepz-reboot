//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "./Identity.sol";

struct Report {
    uint256 id;
    address reporter;
    uint256 severity;
    string metadataCID;
}