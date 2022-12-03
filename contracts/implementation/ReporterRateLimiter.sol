//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "../library/BloomFilter.sol";

error ReporterRateLimitExceeded();

abstract contract ReporterRateLimiter {

    using BloomFilter for BloomFilter.Filter;

    BloomFilter.Filter private rateLimitBloomFilter;
    mapping(bytes32 => uint256) private reporterRateLimits;
    mapping(bytes32 => uint256) private lastRequestTimes;

    function setReporterRateLimit(uint64 aRate)
        public
        virtual
        returns (bool result);

    modifier xyz() {
        _updateRateLimit();
        if (rateLimitBloomFilter.check(keccak256(abi.encodePacked(msg.sender, uint256(1))))) {
            revert ReporterRateLimitExceeded();
        }
        _;
    }

    function _updateRateLimit() internal {
        bytes32 reporter = keccak256(abi.encodePacked(msg.sender));
        // Retrieve the reporter's current rate limit and last request time
        uint256 reporterRateLimit = reporterRateLimits[reporter];
        uint256 lastRequestTime = lastRequestTimes[reporter];

        // Calculate the time since the reporter's last request
        uint256 timeSinceLastRequest = block.timestamp - lastRequestTime;

        // Check if the reporter has exceeded their rate limit
        if (timeSinceLastRequest >= reporterRateLimit) {
            // The reporter has not exceeded their rate limit, so update the bloom filter with a "not exceeded" value
            rateLimitBloomFilter.add(keccak256(abi.encodePacked(msg.sender, uint256(0))));
        } else {
            // The reporter has exceeded their rate limit, so update the bloom filter with a "exceeded" value
            rateLimitBloomFilter.add(keccak256(abi.encodePacked(msg.sender, uint256(1))));
        }
    }
}
