import expectThrow from '../helpers/expectThrow';

const Fr8Permissioned = artifacts.require('Fr8Permissioned');

contract('Fr8Permissioned Test', async (accounts) => {
  const deployer = accounts[0]; // Also owner
  const owner1 = accounts[1];
  const owner2 = accounts[2];
  const editor = accounts[3];
  const reader = accounts[4];
  const protocol = accounts[5];
  const guest = accounts[6];
  const otherAccount = accounts[7];

  it('should allow an owner to set a new protocol address', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol, { from: deployer });
    await permissionedInstance.setProtocolAddress(otherAccount, { from: deployer });
    let newProtocolAddress = await permissionedInstance.protocolAddress();
    assert.equal(newProtocolAddress, otherAccount);
  });

  it('should not allow a non-owner to set a new protocol address', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol, { from: deployer });
    let testedFn = async function() {
      await permissionedInstance.setProtocolAddress(otherAccount, { from: otherAccount });
    };
    await expectThrow(testedFn());
  });

  it('should allow an owner to add and remove 2 owners', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol, { from: deployer });
    await permissionedInstance.addOwners([owner1, owner2], { from: deployer });
    let isOwner1Valid = await permissionedInstance.owners(owner1);
    let isOwner2Valid = await permissionedInstance.owners(owner2);
    assert(isOwner1Valid && isOwner2Valid, 'The owners has have not been added successfully');

    await permissionedInstance.removeOwners([owner1, owner2], { from: deployer });
    isOwner1Valid = await permissionedInstance.owners(owner1);
    isOwner2Valid = await permissionedInstance.owners(owner1);
    assert(!(isOwner1Valid || isOwner2Valid), 'The owners have not been removed successfully');
  });

  it('should allow an owner to add and remove an editor', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol, { from: deployer });
    await permissionedInstance.addEditors([editor], { from: deployer });
    let isEditorValid = await permissionedInstance.editors(editor);
    assert(isEditorValid, 'The editor has not been added successfully');

    await permissionedInstance.removeEditors([editor], { from: deployer });
    isEditorValid = await permissionedInstance.editors(editor);
    assert(!isEditorValid, 'The editor has not been removed successfully');
  });

  it('should allow an owner to add and remove a reader', async () => {
    let permissionedInstance = await Fr8Permissioned.new(protocol, { from: deployer });
    await permissionedInstance.addReaders([reader], { from: deployer });
    let isReaderValid = await permissionedInstance.readers(reader);
    assert(isReaderValid, 'The reader has not been added successfully');

    await permissionedInstance.removeReaders([reader], { from: deployer });
    isReaderValid = await permissionedInstance.readers(reader);
    assert(!isReaderValid, 'The reader has not been removed successfully');
  });
});
