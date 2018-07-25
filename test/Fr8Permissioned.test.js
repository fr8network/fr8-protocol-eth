import expectThrow from '../helpers/expectThrow';

const Fr8Permissioned = artifacts.require('Fr8Permissioned');

contract('Fr8Permissioned Test', async (accounts) => {
  const deployer = accounts[0];
  const owner = accounts[1];
  const editor = accounts[2];
  const reader = accounts[3];
  const protocol = accounts[4];
  const guest = accounts[5];
  const otherAccount = accounts[6];

  it('should allow owner to set a new protocol address', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol);
    await permissionedInstance.setProtocolAddress(otherAddress, { from: deployer });
    let newProtocolAddress = await permissionedInstance.protocolAddress();
    assert.equal(newProtocolAddress, otherAddress);
  });

  it('should not allow a non-owner to set a new protocol address', async () => {
    let testedFn = async function() {
      let permissionedInstance = await Fr8Permissioned.new(protocol);
      await permissionedInstance.setProtocolAddress(otherAddress, { from: otherAccount });
    };
    await expectThrow(testedFn());
  });

  it('should allow an owner to add and remove an owner', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol);
    await permissionedInstance.addOwners([owner], { from: deployer });
    let isOwnerValid = await permissionedInstance.owners(owner);
    assert(isOwnerValid, 'The owner has not been added successfully');

    await permissionedInstance.removeOwners([owner], { from: deployer });
    isOwnerValid = await permissionedInstance.owners(owner);
    assert(!isOwnerValid, 'The owner has not been removed successfully');
  });

  it('should allow an owner to add and remove an editor', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol);
    await permissionedInstance.addEditors([editor], { from: deployer });
    let isEditorValid = await permissionedInstance.editors(editor);
    assert(isEditorValid, 'The editor has not been added successfully');

    await permissionedInstance.removeEditors([editor], { from: deployer });
    isEditorValid = await permissionedInstance.editors(editor);
    assert(!isEditorValid, 'The editor has not been removed successfully');
  });

  it('should allow an owner to add and remove a reader', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol);
    await permissionedInstance.addReaders([reader], { from: deployer });
    let isReaderValid = await permissionedInstance.readers(reader);
    assert(isReaderValid, 'The reader has not been added successfully');

    await permissionedInstance.removeReaders([reader], { from: deployer });
    isReaderValid = await permissionedInstance.readers(reader);
    assert(!isReaderValid, 'The reader has not been removed successfully');
  });
});
