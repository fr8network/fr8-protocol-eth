require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');

const privKeys = [process.env.SERVER_ETH_PRIVATE_KEY];
const infuraProvider = (network) => {
  new HDWalletProvider(privKeys, `https://${network}.infura.io/${process.env.INFURA_API_KEY}`);
};
const rinkebyProvider = infuraProvider('rinkeby');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: 'x',
    },
    rinkeby: {
      provider: rinkebyProvider,
      network_id: 4,
    },
  },
};
