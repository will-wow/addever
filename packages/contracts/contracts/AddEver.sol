// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AddEver {
    uint public unlockTime;
    address payable public owner;

    event HostChange(address owner, string host);

    // Map of addresses to their balances
    mapping(address => string) public hosts;

    function setHost(string calldata host) public {
        emit HostChange(msg.sender, host);

        hosts[msg.sender] = host;
    }
}
