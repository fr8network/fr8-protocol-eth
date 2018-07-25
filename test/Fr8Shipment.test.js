import crypto from 'crypto';
import expectThrow from '../helpers/expectThrow';

const Fr8Shipment = artifacts.require('Fr8Shipment');

contract('Fr8Shipment Test', async (accounts) => {
  const deployer = accounts[0]; // Also owner
  const owner = accounts[1];
  const editor = accounts[2];
  const data = accounts[3];
  const protocol = accounts[4];
  const guest = accounts[5];
  const dataUploader = accounts[6];
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an owner or editor to activate and terminate a shipment', async () => {
    let shipmentInstance1 = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance1.activate({ from: deployer });
    let shipmentActivated1 = await shipmentInstance1.hasBeenActivated();
    assert(shipmentActivated1, 'an owner was not able to activate a shipment');

    await shipmentInstance1.terminate({ from: deployer });
    let shipmentTerminated1 = await shipmentInstance1.hasBeenTerminated();
    assert(shipmentTerminated1, 'an owner was not able to terminate an active shipment');

    let shipmentInstance2 = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance2.addEditors([editor], { from: deployer });
    await shipmentInstance2.activate({ from: editor });
    let shipmentActivated2 = await shipmentInstance2.hasBeenActivated();
    assert(shipmentActivated2, 'an editor was not able to activate a shipment');

    await shipmentInstance2.terminate({ from: editor });
    let shipmentTerminated2 = await shipmentInstance2.hasBeenTerminated();
    assert(shipmentTerminated2, 'an editor was not able to terminate an active shipment');
  });

  it('should not allow a non-owner, non-editor to activate a shipment', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    let testedFn = async function() {
      await shipmentInstance.activate({ from: guest });
    };
    await expectThrow(testedFn());
  });

  it('should not allow an owner to terminate a non-active shipment', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    let testedFn = async function() {
      await shipmentInstance.terminate({ from: deployer });
    };
    await expectThrow(testedFn());
  });

  it('should allow the protocol to set a payment receipts hash', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    await shipmentInstance.setPaymentReceiptsHash(dataHash, { from: protocol });
    let newPaymentReceiptsHash = shipmentInstance.paymentReceiptsHash();
    assert(newPaymentReceiptsHash, dataHash);
  });

  it('should allow the protocol to set a notification receipts hash', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    await shipmentInstance.setNotificationReceiptsHash(dataHash, { from: protocol });
    let newNotificationReceiptsHash = shipmentInstance.notificationReceiptsHash();
    assert(newNotificationReceiptsHash, dataHash);
  });

  it('should not allow non-protocol to set a payment receipts hash', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    let testedFn = async function() {
      await shipmentInstance.setPaymentReceiptsHash(dataHash, { from: deployer });
    };
    await expectThrow(testedFn());
  });

  it('should allow an editor to add and remove a data uploader', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    await shipmentInstance.addEditors([editor], { from: deployer });
    await shipmentInstance.addSensorDataUploaders([dataUploader], { from: editor });
    let isUploaderValid = await shipmentInstance.sensorDataUploaders(dataUploader);
    assert(isUploaderValid, 'The uploader has not been added successfully');

    await shipmentInstance.removeSensorDataUploaders([dataUploader], { from: editor });
    isUploaderValid = await shipmentInstance.sensorDataUploaders(dataUploader);
    assert(!isUploaderValid, 'The uploader has not been removed successfully');
  });

  it('should not allow a non-editor to add a data uploader', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    let testedFn = async function() {
      await shipmentInstance.addSensorDataUploaders([dataUploader], { from: guest });
    };
    await expectThrow(testedFn());
  });

  it('should allow an editor to set a new data hash', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    await shipmentInstance.addEditors([editor], { from: deployer });
    await shipmentInstance.setDataHash(dataHash, { from: editor });
    let newDataHash = await shipmentInstance.dataHash();
    assert.equal(newDataHash, dataHash);
  });

  it('should not allow a non-editor to set a new data hash', async () => {
    let shipmentInstance = await Fr8Shipment.new(protocol, { from: deployer });
    await shipmentInstance.activate({ from: deployer });
    let testedFn = async function() {
      await shipmentInstance.setDataHash(dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });
});
