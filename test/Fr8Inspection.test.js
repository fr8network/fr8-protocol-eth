import crypto from 'crypto';
import expectThrow from '../helpers/expectThrow';

const Fr8Inspection = artifacts.require('Fr8Inspection');

contract('Fr8Inspection Test', async (accounts) => {
  const deployer = accounts[0]; // Also owner
  const editor = accounts[1];
  const protocol = accounts[2];
  const guest = accounts[3];
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an editor to approve an inspection', async () => {
    let inspectionInstance = await Fr8Inspection.new(protocol, { from: deployer });
    await inspectionInstance.addEditors([editor], { from: deployer });
    await inspectionInstance.approve({ from: editor });
    let approvalValid = await inspectionInstance.approvals(editor); // Big Number returns
    assert.equal(approvalValid.toNumber(), 2); // 2 => Approved
  });

  it('should allow an editor to reject an inspection', async () => {
    let inspectionInstance = await Fr8Inspection.new(protocol, { from: deployer });
    await inspectionInstance.addEditors([editor], { from: deployer });
    await inspectionInstance.reject({ from: editor });
    let approvalValid = await inspectionInstance.approvals(editor); // Big Number returns
    assert.equal(approvalValid.toNumber(), 1); // 2 => Approved
  });

  it('should not allow an non-editor to approve an inspection', async () => {
    let inspectionInstance = await Fr8Inspection.new(protocol, { from: deployer });
    let testedFn = async function() {
      await inspectionInstance.approve({ from: guest });
    };
    await expectThrow(testedFn());
  });

  it('should allow an editor to set a new data hash', async () => {
    let inspectionInstance = await Fr8Inspection.new(protocol, { from: deployer });
    await inspectionInstance.addEditors([editor], { from: deployer });
    await inspectionInstance.setDataHash(dataHash, { from: editor });
    let newDataHash = await inspectionInstance.dataHash();
    assert.equal(newDataHash, dataHash);
  });

  it('should not allow a non-editor to set a new data hash', async () => {
    let inspectionInstance = await Fr8Inspection.new(protocol, { from: deployer });
    let testedFn = async function() {
      await inspectionInstance.setDataHash(dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });
});
