// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



contract Greeter {

    address public owner;

    mapping(address => string) public userNames;



    event NameSet(address indexed user, string name);



    constructor() {

        owner = msg.sender;

    }



    modifier onlyOwner() {

        require(msg.sender == owner, "Not the owner");

        _;

    }



    function setUserName(string memory _name) public {

        userNames[msg.sender] = _name;

        emit NameSet(msg.sender, _name);

    }



    function getUserName(address _user) public view returns (string memory) {

        return userNames[_user];

    }

}

