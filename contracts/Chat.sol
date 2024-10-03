// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {

  enum MessageType {
      TEXT, IMAGE, VIDEO, AUDIO
  }

  struct Message {
    address sender;
    string content;
    MessageType msgtype;
    uint256 timestamp;
  }

  Message[] public messages;

  function _addMessage(string memory _content, MessageType _msgtype) internal {
    Message memory newMessage = Message({
      sender: msg.sender,
      content: _content,
      msgtype: _msgtype,
      timestamp: block.timestamp
    });
    messages.push(newMessage);
  }

  function getMessageCount() public view returns (uint256) {
    return messages.length;
  }

  function getMessages() public view returns (Message[] memory) {
    return messages;
  }
}
