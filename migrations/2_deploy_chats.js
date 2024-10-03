// @ts-ignore
const ChatManager = artifacts.require("ChatManager");

module.exports = async function (deployer) {
  await deployer.deploy(ChatManager);
};
