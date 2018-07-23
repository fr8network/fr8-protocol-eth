pragma solidity ^0.4.24;

/**
 * @title LockedToDataHash v0.0.1
 * @dev The LockedToDataHash contract stores a 256 bit hash of the off-chain object
 * it represents.
 */

contract LockedToDataHash {
  bytes32 public dataHash;

  /**
   * @dev Event emitted after any calls that modify permissions
   */
  event DatahashUpdated(address _sender, bytes32 _dataHash);

  /**
   * @dev Updates the data hash.
   * @param _dataHash New hash.
   */
  function setDataHash(bytes32 _dataHash) public {
    dataHash = _dataHash;
    emit DatahashUpdated(msg.sender, _dataHash);
  }
}
