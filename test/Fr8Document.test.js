import crypto from 'crypto';
import expectThrow from '../helpers/expectThrow';

const Fr8Document = artifacts.require('Fr8Document');

contract('Fr8Document Test', async (accounts) => {
  const deployer = accounts[0]; // Also owner
  const editor = accounts[1];
  const protocol = accounts[2];
  const guest = accounts[3];
  const attachmentRef = 'example_attachment_reference';
  const dataToHash = 'fr8fr8fr8fr8fr8';
  const hash = crypto.createHash('sha256');
  hash.update(dataToHash); // Hash dataToHash String
  const dataHash = `0x${hash.digest('hex')}`; // Need to add '0x' to indicate hex

  it('should allow an editor add an attachment', async () => {
    let fr8DocumentInstance = await Fr8Document.new(protocol, { from: deployer });
    await fr8DocumentInstance.addAttachment(attachmentRef, dataHash, { from: deployer });
    let attachmentsLength = await fr8DocumentInstance.numAttachments(); // Big Number returned
    let dataCollection = await fr8DocumentInstance.attachments(0); // String array,. dataCollection struct
    assert.equal(attachmentsLength.toNumber(), 1, 'The dataCollections length is incorrect');
    assert.equal(dataCollection[0], attachmentRef, 'The stored attachmentRef is incorrect');
    assert.equal(dataCollection[1], dataHash, 'The stored dataHash is incorrect');
  });

  it('should not allow an non-editor add an attachment', async () => {
    let fr8DocumentInstance = await Fr8Document.new(protocol, { from: deployer });
    let testedFn = async function() {
      await fr8DocumentInstance.addAttachment(attachmentRef, dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });

  it('should allow an editor to set a new data hash', async () => {
    let fr8DocumentInstance = await Fr8Document.new(protocol, { from: deployer });
    await fr8DocumentInstance.addEditors([editor], { from: deployer });
    await fr8DocumentInstance.setDataHash(dataHash, { from: editor });
    let newDataHash = await fr8DocumentInstance.dataHash();
    assert.equal(newDataHash, dataHash);
  });

  it('should not allow a non-editor to set a new data hash', async () => {
    let fr8DocumentInstance = await Fr8Document.new(protocol, { from: deployer });
    let testedFn = async function() {
      await fr8DocumentInstance.setDataHash(dataHash, { from: guest });
    };
    await expectThrow(testedFn());
  });
});
