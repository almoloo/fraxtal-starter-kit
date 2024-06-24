// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sample {
    string public name;

    function setName(string memory newName) public {
        name = newName;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
