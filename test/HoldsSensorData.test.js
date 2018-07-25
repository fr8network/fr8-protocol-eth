import crypto from 'crypto';
import expectThrow from '../helpers/expectThrow';

const HoldsSensorData = artifacts.require('HoldsSensorData');

contract('HoldsSensorData Test', async (accounts) => {
  const deployer = accounts[0];
  const dataUploader = accounts[1];
  const guest = accounts[2];
  const dataRef = 'example_data_reference';
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an account to add and remove a data uploader', async () => {
    let holdsSensorDataInstance = await HoldsSensorData.new();
    await holdsSensorDataInstance.addSensorDataUploaders([dataUploader], { from: deployer });
    let isUploaderValid = await holdsSensorDataInstance.sensorDataUploaders(dataUploader);
    assert(isUploaderValid, 'The uploader has not been added successfully');

    await holdsSensorDataInstance.removeSensorDataUploaders([dataUploader], { from: deployer });
    isUploaderValid = await holdsSensorDataInstance.sensorDataUploaders(dataUploader);
    assert(!isUploaderValid, 'The uploader has not been removed successfully');
  });

  it('should allow a data uploader to add a data collection', async () => {
    let holdsSensorDataInstance = await HoldsSensorData.new();
    await holdsSensorDataInstance.addSensorDataUploaders([dataUploader], { from: deployer });
    await holdsSensorDataInstance.addDataCollection(dataRef, dataHash, { from: dataUploader });
    let dataCollectionsLength = await holdsSensorDataInstance.numDataCollections(); // Big Number returned
    let dataCollection = await holdsSensorDataInstance.dataCollections(0); // String array,. dataCollection struct
    assert.equal(dataCollectionsLength.toNumber(), 1, 'The dataCollections length is incorrect');
    assert.equal(dataCollection[0], dataRef, 'The stored dataRef is incorrect');
    assert.equal(dataCollection[1], dataHash, 'The stored dataHash is incorrect');
  });

  it('should not allow a non-uploader to add a data collection', async () => {
    let testedFn = async function() {
      let holdsSensorDataInstance = await HoldsSensorData.new();
      await holdsSensorDataInstance.addDataCollection(dataRef, dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });
});
