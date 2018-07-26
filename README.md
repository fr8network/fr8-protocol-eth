# fr8-protocol-eth
Fr8 Protocol Smart Contracts v0.0.1
![Fr8 Network](https://fr8.network/fr8-logo-meta.jpg)

## About Fr8 Protocol
Logistics as an industry has been in dire need of neutral, globally accepted protocol for connecting information systems. Current standards like EDI are beneficial, but as point- to-point solutions they fail to capitalize on network effects. The Fr8 Network is proposing Fr8 Protocol, a collection of rules, behaviors, and formats that specify a communication standard between two or more nodes on a network. Adoption of the protocol is driven by cost savings and efficiency gains powered through a tokenized economic engine.

## About this repo
* The smart contracts contained in the repo are the building blocks of the Fr8 Protocol, which will operate both on- and off-chain
* This is very first version of the Fr8 Smart Contracts. The design and functionality is subject to change as we develop, iterate, and improve the Protocol's architecture.

## Getting Started

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js and npm](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/lang/en/)
* [Truffle](http://truffleframework.com/) (Installed Globally)
* [Ganache](http://truffleframework.com/ganache/)

### Compiling

1. Run `yarn` to install dependencies.

2. Run `yarn merge-contracts` to merge solidity smart contracts and dependencies into 1 file. Output will be in `./build/merged/` directory.

3. Run `yarn compile` to compile smart contracts. Output will be in the `./build/contracts/` directory.

## Testing

1. Start Ganache.

2. Run `yarn test` to run test suite.
