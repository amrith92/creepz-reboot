//SPDX-License-Identifier: AGPL-3.0-only

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

interface ICircuitValidator {
    struct CircuitQuery {
        uint256 schema;
        uint256 slotIndex;
        uint256 operator;
        uint256[] value;
        string circuitId;
    }

    function verify(
        uint256[] memory inputs,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        CircuitQuery memory query
    ) external view returns (bool r);

    function getCircuitId() external pure returns (string memory id);

    function getChallengeInputIndex() external pure returns (uint256 index);

    function getUserIdInputIndex() external pure returns (uint256 index);
}
