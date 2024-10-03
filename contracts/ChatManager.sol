// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PrivateChat.sol";

contract ChatManager {

  mapping(address => mapping(address => PrivateChat)) public privateChats;

  event PrivateChatCreated(address indexed user1, address indexed user2, address chatAddress);

  function createPrivateChat(address _user1, address _user2) public {

    require(_user1 != _user2, "Users must be different");
    require(privateChats[_user1][_user2] == PrivateChat(address(0)), "Chat already exists");

    PrivateChat newChat = new PrivateChat(_user1, _user2);
    privateChats[_user1][_user2] = newChat;
    privateChats[_user2][_user1] = newChat;

    emit PrivateChatCreated(_user1, _user2, address(newChat));
  }

  function isExistedPrivateChat(address _user1, address _user2) public view returns (bool) {
    return privateChats[_user1][_user2] != PrivateChat(address(0));
  }

  function getPrivateChat(address _user1, address _user2) public view returns (address) {
    return address(privateChats[_user1][_user2]);
  }
}