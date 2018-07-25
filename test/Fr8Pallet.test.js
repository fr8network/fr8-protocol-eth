import crypto from 'crypto';
import expectThrow from '../helpers/expectThrow';

const Fr8Pallet = artifacts.require('Fr8Pallet');

contract('Fr8Pallet Test', async (accounts) => {
  const deployer = accounts[0]; // Also owner
  const editor = accounts[1];
  const protocol = accounts[2];
  const guest = accounts[3];
  const dataUploader = accounts[4];
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an editor to add and remove a sensor data uploader', async () => {
    let palletInstance = await Fr8Pallet.new(protocol, { from: deployer });
    await palletInstance.addEditors([editor], { from: deployer });
    await palletInstance.addSensorDataUploaders([dataUploader], { from: editor });
    let isUploaderValid = await palletInstance.sensorDataUploaders(dataUploader);
    assert(isUploaderValid, 'The sensor data  has not been added successfully');

    await palletInstance.removeSensorDataUploaders([dataUploader], { from: editor });
    isUploaderValid = await palletInstance.sensorDataUploaders(dataUploader);
    assert(!isUploaderValid, 'The sensor data uploader has not been removed successfully');
  });

  it('should not allow a non-editor to add a sensor data uploader', async () => {
    let palletInstance = await Fr8Pallet.new(protocol, { from: deployer });
    let testedFn = async function() {
      await palletInstance.addSensorDataUploaders([dataUploader], { from: guest });
    };
    await expectThrow(testedFn());
  });

  it('should allow an editor to set a new data hash', async () => {
    let palletInstance = await Fr8Pallet.new(protocol, { from: deployer });
    await palletInstance.addEditors([editor], { from: deployer });
    await palletInstance.setDataHash(dataHash, { from: editor });
    let newDataHash = await palletInstance.dataHash();
    assert.equal(newDataHash, dataHash);
  });

  it('should not allow a non-editor to set a new data hash', async () => {
    let palletInstance = await Fr8Pallet.new(protocol, { from: deployer });
    let testedFn = async function() {
      await palletInstance.setDataHash(dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });
});
