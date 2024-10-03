import Web3 from "web3";
import { ChatManagerArtifact } from "./artifacts";

const web3 = new Web3('http://localhost:7545');

const chatManagerContract = async () => {
  const networkId = await web3.eth.net.getId();
  // @ts-ignore
  const deployedNetwork = ChatManagerArtifact.networks[networkId];
  if (!deployedNetwork) {
    throw new Error(`Contract not deployed on network ID ${networkId}`);
  }
  return new web3.eth.Contract(ChatManagerArtifact.abi, deployedNetwork.address);
};

export default chatManagerContract