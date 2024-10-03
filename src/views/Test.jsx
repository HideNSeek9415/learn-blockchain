import React, { useEffect, useState } from "react";
import Web3 from "web3";
import chatManagerContract from "../contracts/chatManagerContract";
import { PrivateChatArtifact } from "../contracts/artifacts";

// const privateKey = {

// }
let privateConstract

const web3 = new Web3("http://127.0.0.1:7545");

const Test = () => {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [msg, setMsg] = useState([]);
  const [input, setInput] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [privateChatAddress, setPrivateChatAddress] = useState('');
  
  useEffect(() => {
    const loadAccounts = async () => {
      
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      
      const contract = await chatManagerContract();
      console.log("Contract address:", contract.options.address);
      setContract(contract);
        
      // contract.events.PrivateChatCreated({
      //   filter: {},
      //   fromBlock: 'latest',
      // })
      // .on("data", (event) => {
      //   console.log("PrivateChatCreated event:", event);
      // })
    };
    loadAccounts();
  }, []);

  const handleGetChat = async () => {
    const exists = await contract.methods.isExistedPrivateChat(user1, user2).call();
    console.log("Adress:", contract.options.address);
    if (!exists) {
      const tx = {
        from: user1, // Địa chỉ người gửi
        to: contract.options.address, // Địa chỉ hợp đồng
        gas: '7000000', // Giới hạn gas
        gasPrice: web3.utils.toWei('10', 'gwei'), // Đặt giá gas (có thể điều chỉnh)
        data: contract.methods.createPrivateChat(user1, user2).encodeABI(), // Mã hóa phương thức
      };
      try {
        const receipt = await web3.eth.sendTransaction(tx);
        console.log("Transaction successful:", receipt);
      } catch (error) { 
        console.error("Transaction failed:", error);
      }
    }
    const privateChatAddress = await contract.methods.getPrivateChat(user1, user2).call();
    console.log("PrivateChat address:", privateChatAddress);
    setPrivateChatAddress(privateChatAddress);
    privateConstract = new web3.eth.Contract(PrivateChatArtifact.abi, privateChatAddress);
    let messages = await privateConstract.methods.getMessages().call();
    // @ts-ignore
    setMsg(messages);
  };

  const handleSendMessage = async () => {
    const tx = {
      from: user1,
      to: privateChatAddress, 
      gas: '7000000', 
      gasPrice: web3.utils.toWei('10', 'gwei'), 
      data: privateConstract.methods.sendMessage(input, 0).encodeABI(),
    };
    try {
      await web3.eth.sendTransaction(tx);
      let messages = await privateConstract.methods.getMessages().call();
      // @ts-ignore
      setMsg(messages);
    } catch (error) { 
      console.error("Transaction failed:", error);
    }
    setInput('')
  }

  return (
    <>
      <div className="select-zone">
        <input
          type="text"
          placeholder="user1"
          width="250px"
          value={user1}
          onChange={(e) => setUser1(e.target.value)} 
        />
        <br />
        <input
          type="text"
          placeholder="user2"
          width="250px"
          value={user2}
          onChange={(e) => setUser2(e.target.value)} 
        />

        <p>Current user: {user1}</p>
        <p>Chat with user: {user2}</p>
        
        <button onClick={handleGetChat}>Get Chat</button>
        <h2>Available Accounts from Ganache:</h2>
        <ul>
          {accounts.map((account, index) => (
            <li key={index} onClick={() => navigator.clipboard.writeText(account)}>
              {account}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-zone">
        <div className="chat-user">
          <div><strong className="us1">Sender: </strong>{user1}</div>
          <div><strong className="us2">Receiver: </strong>{user2}</div>
        </div>
        <div id="chat-content">
          {msg.map((m, index) => (
            <div key={index}>
              <strong className={user1 === m.sender ? "us1" : "us2"}>
                {m.sender.slice(-5)}
              </strong>: {m.content}
            </div>
          ))}
        </div>
        <div className="sendText">
          <input type="text" onChange={(e) => setInput(e.target.value)}/>
          <button onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </>
  );
};

export default Test;
