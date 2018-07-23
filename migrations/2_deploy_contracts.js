var TestToken = artifacts.require('../contracts/TestToken.sol');
var Balancer = artifacts.require('../contracts/Balancer.sol');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TestToken, 'TokenA', 'TKNA', 18, 10 ** 9 * 10 ** 18);
  const tokenA = await TestToken.deployed();
  await deployer.deploy(TestToken, 'TokenB', 'TKNB', 18, 10 ** 9 * 10 ** 18);
  const tokenB = await TestToken.deployed();

  // Balancer Constructor
  // (basis, fee, slipbound, [token addresses], minBalance, live)
  await deployer.deploy(Balancer, 10000, 10, 1000, [tokenA.address, tokenB.address], 1000000, true);
  const balancer = await Balancer.deployed();

  console.log('OWNER:', accounts[0]);
  console.log('TOKEN A ADDRESS:', tokenA.address);
  console.log('TOKEN B ADDRESS:', tokenB.address);
  console.log('BALANCER ADDRESS:', balancer.address);
};
