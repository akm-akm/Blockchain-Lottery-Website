pragma solidity ^0.4.17;

// SPDX-License-Identifier: MIT

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function rand() public view returns (uint256) {
        if (players.length > 1) {
            return
                uint256(keccak256(abi.encode(block.difficulty, now, players))) %
                players.length;
        } else return 0;
    }

    function getPlayers() public view returns (uint256) {
        return players.length;
    }

    function pickWinner() public {
        require(msg.sender == manager);
        uint256 index = rand() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0);
    }
}
