//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "./Identifier.sol";

/// @custom:security-contact security@creepz.info
struct Identity {

    uint64 id;
    mapping(bytes32 => Identifier) identifiers;
    uint256 nftId; // if zero, then it is unclaimed & can be minted
    // to claim a ID, you need to provide a proof of one or more of the
    // identifiers linked to the Identity
}
