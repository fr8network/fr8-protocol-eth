import crypto from 'crypto';

const LockedToDataHash = artifacts.require('LockedToDataHash');

contract('LockedToDataHash Test', async (accounts) => {
  const deployer = accounts[0];
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an account to set a new data hash', async () => {
    let lockedToDataHashInstance = await LockedToDataHash.new({ from: deployer });
    await lockedToDataHashInstance.setDataHash(dataHash, { from: deployer });
    let newDataHash = await lockedToDataHashInstance.dataHash();
    assert.equal(newDataHash, dataHash);
  });
});
