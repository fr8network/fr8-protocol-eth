pragma solidity ^0.4.24;

/**
 * @title Fr8Pallet
 * @dev v0.0.1
 * @notice A basic Fr8Pallet Smart Contract
 */

import "./Fr8Permissioned.sol";
import "./LockedToDataHash.sol";
import "./HoldsSensorData.sol";

contract Fr8Pallet is Fr8Permissioned, LockedToDataHash, HoldsSensorData {
  /**
   * @notice The Fr8Permissioned constructor sender account to the owners mapping.
   * @param _protocolAddress Fr8 Protocol Address.
   */
  constructor(address _protocolAddress) Fr8Permissioned(_protocolAddress) public payable {
    protocolAddress = _protocolAddress;
  }

  /**
   * @notice Adds uploaders to the sensorDataUploaders mapping. Overrides super to add modifiers.
   * @param _uploaders Array of addresses to add to the sensorDataUploaders mapping.
   */
  function addSensorDataUploaders(address[] _uploaders) public onlyEditor {
    super.addSensorDataUploaders(_uploaders);
  }

  /**
   * @notice Removes uploaders from the sensorDataUploaders mapping. Overrides super to add modifiers.
   * @param _uploaders Array of addresses to remove from the sensorDataUploaders mapping.
   */
  function removeSensorDataUploaders(address[] _uploaders) public onlyEditor {
    super.removeSensorDataUploaders(_uploaders);
  }

  /**
   * @notice Updates data hash of off-chain data. Overrides super to add modifiers.
   * @param _dataHash 256 bit hash of flattened off-chain pallet data.
   */
  function setDataHash(bytes32 _dataHash) public onlyEditor {
    super.setDataHash(_dataHash);
  }
}
