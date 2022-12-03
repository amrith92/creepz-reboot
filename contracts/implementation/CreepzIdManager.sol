//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "../interfaces/IdManager.sol";

contract CreepzIdManager is IdManager {

    function report(
        Identifier memory id,
        uint256 calldata severity,
        string calldata metadataCID
    ) external returns (uint256 reportId) {
        
    }
}
