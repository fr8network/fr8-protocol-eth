pragma solidity ^0.4.24;

/***
 * @title Fr8Inspection
 * @dev 0.0.1
 * @notice A basic Fr8Document Smart Contract
 */

import "./Fr8Permissioned.sol";
import "./LockedToDataHash.sol";

contract Fr8Inspection is Fr8Permissioned, LockedToDataHash {
  mapping (address => uint) public approvals;

  function setDataHash(bytes32 _datahash) public onlyEditor;

  function approve() public onlyEditor;
  function reject() public onlyEditor;
}