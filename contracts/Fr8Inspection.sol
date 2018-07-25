pragma solidity ^0.4.24;

/***
 * @title Fr8Inspection
 * @dev v0.0.1
 * @notice A basic Fr8Document Smart Contract
 */

import "./Fr8Permissioned.sol";
import "./LockedToDataHash.sol";

contract Fr8Inspection is Fr8Permissioned, LockedToDataHash {
  /**
   * @notice approvals mapping contains results of inspection
   * @dev 2 => Approved; 1 => Rejected
   */
  mapping (address => uint8) public approvals;

  /**
   * @notice The Fr8Inspection constructor sender account to the owners mapping.
   * @param _protocolAddress Fr8 Protocol Address.
   */
  constructor(address _protocolAddress) Fr8Permissioned(_protocolAddress) public payable {
    protocolAddress = _protocolAddress;
  }

  /**
   * @notice Used by an inspector to mark an inspection as passing.
   */
  function approve() public onlyEditor {
    approvals[msg.sender] = 2;
  }

  /**
   * @notice Used by an inspector to mark an inspection as failed.
   */
  function reject() public onlyEditor {
    approvals[msg.sender] = 1;
  }

  /**
   * @notice Updates data hash of off-chain data. Overrides super to add modifiers.
   * @param _dataHash 256 bit hash of flattened off-chain pallet data.
   */
  function setDataHash(bytes32 _dataHash) public onlyEditor {
    super.setDataHash(_dataHash);
  }
}
