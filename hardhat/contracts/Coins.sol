// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinTracker {
    address public owner;
    mapping(address => uint256) public userTokens;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCoins(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid user address");
        userTokens[user] += amount;
    }

    function reduceTokens(uint256 amount) external {
        require(userTokens[msg.sender] >= amount, "Insufficient tokens");
        userTokens[msg.sender] -= amount;
    }
}
