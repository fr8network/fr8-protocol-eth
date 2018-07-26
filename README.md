# fr8-protocol-eth
Fr8 Protocol Smart Contracts

![alt text](https://fr8.network/fr8-logo-meta.jpg)

## Getting Started

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
* [Yarn](https://yarnpkg.com/lang/en/)
* [Truffle](http://truffleframework.com/) Installed Globally
* [Ganache](http://truffleframework.com/ganache/)

### Compiling

1. Run `yarn` to install dependencies.

2. Run `yarn merge-contracts` to merge solidity smart contracts and dependencies into 1 file. Output will be in `./build/merged/` directory.

3. Run `yarn compile` to compile smart contracts. Output will be in the `./build/contracts/` directory.

## Testing

1. Start Ganache

2. Run `truffle test` to run test suite.
