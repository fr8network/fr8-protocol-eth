pragma solidity ^0.4.24;

/**
 * @title LockedToDataHash
 * @dev v0.0.1
 * @notice The LockedToDataHash contract stores a 256 bit hash of the off-chain object
 *      it represents.
 */

contract LockedToDataHash {
  bytes32 public dataHash;

  /**
   * @notice Event emitted after the data has has been updated.
   */
  event DataHashUpdated(address _sender, bytes32 _dataHash);

  /**
   * @notice Updates the data hash property.
   * @param _dataHash New hash.
   */
  function setDataHash(bytes32 _dataHash) public {
    dataHash = _dataHash;
    emit DataHashUpdated(msg.sender, _dataHash);
  }
}
