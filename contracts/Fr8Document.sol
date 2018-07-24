pragma solidity ^0.4.24;

/**
 * @title Fr8Document
 * @dev v0.0.1
 * @notice A basic Fr8Document Smart Contract
 */

import "./Fr8Permissioned.sol";
import "./LockedToDataHash.sol";

contract Fr8Document is Fr8Permissioned, LockedToDataHash {
  struct AttachmentPair {
    string attachmentId;
    bytes32 attachmentHash;
  }

  AttachmentPair[] public attachments;

  /**
   * @notice Event emitted after a new attachment has been added to this document.
   */
  event AttachmentAdded(string _attachmentRef, bytes32 _attachmentHash);

  /**
   * @notice Updates data hash of off-chain data. Overrides super to add modifiers.
   * @param _dataHash 256 bit hash of flattened off-chain document data.
   */
  function setDataHash(bytes32 _dataHash) public onlyEditor {
    super.setDataHash(_dataHash);
  }

  /**
   * @notice Adds the hash of an attachment to this document.
   * @param _attachmentRef Off-chain reference to the attachment.
   * @param _attachmentHash 256 bit hash of the attachment.
   */
  function addAttachment(string _attachmentRef, bytes32 _attachmentHash) public onlyEditor {
    attachments.push(AttachmentPair(_attachmentRef, _attachmentHash));
    emit AttachmentAdded(_attachmentRef, _attachmentHash);
  }
}
