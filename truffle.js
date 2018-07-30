require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const ganache = require('ganache-cli');

const privKeys = process.env.SERVER_ETH_PRIVATE_KEY;
const infuraProvider = (network) => {
  if (process.env.NODE_ENV !== 'test')
    return new HDWalletProvider(
      privKeys,
      `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
    );
  else return;
};

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: 'x',
    },
    test: {
      provider: ganache.provider(),
      network_id: 'x',
    },
    rinkeby: {
      provider: infuraProvider('rinkeby'),
      network_id: 4,
    },
  },
};
