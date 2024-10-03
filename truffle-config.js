module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache Address
      port: 7545,            // Ganache Port
      network_id: "*",       // Connect to any network
      gas: 8000000,          // Gas limit
      gasPrice: 20000000000, // Gas price
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Solidity version
    },
  },  
};
