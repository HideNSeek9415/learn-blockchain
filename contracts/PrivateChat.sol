// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Chat.sol";

contract PrivateChat is Chat {
  address public user1;
  address public user2;

  event MessageSent(address indexed from, address indexed to, Message message);

  constructor(address _user1, address _user2) {
    user1 = _user1;
    user2 = _user2;
  }

  function sendMessage(string memory _message, MessageType _msgtype) public {
    require(msg.sender == user1 || msg.sender == user2, "You are not a participant");
    _addMessage(_message, _msgtype); // Thêm tin nhắn
    emit MessageSent(msg.sender, msg.sender == user1 ? user2 : user1, Message({
      sender: msg.sender,
      content: _message,
      msgtype: _msgtype,
      timestamp: block.timestamp
    }));
  }
}
