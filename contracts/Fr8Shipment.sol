pragma solidity ^0.4.24;

/**
 * @title Fr8Shipment v0.0.1
 * @dev The Fr8Shipment Contract ----------------------
 */

import "./Fr8Permissioned.sol";
import "./LockedToDataHash.sol";
import "./HoldsSensorData.sol";

contract Fr8Shipment is Fr8Permissioned, LockedToDataHash, HoldsSensorData {
  bool public hasBeenActivated;
  bool public hasBeenTerminated;
  bytes32 public paymentReceiptsHash;
  bytes32 public notificationReceiptsHash;

  /**
   * @dev The Fr8Permissioned constructor sender account to the owners mapping.
   * @param _protocolAddress Fr8 Protocol Address.
   */
  constructor(address _protocolAddress) Fr8Permissioned(_protocolAddress) public payable {
    protocolAddress = _protocolAddress;
    owners[msg.sender] = true;
  }

  /**
   * @dev Event emitted after any calls that modify permissions.
   */
  event ShipmentActivated(address _sender);

  /**
   * @dev Event emitted after any calls that modify permissions.
   */
  event ShipmentTerminated(address _sender);

  /**
   * @dev Event emitted after the paymentReceiptsHash has been updated.
   */
  event PaymentReceiptsHashUpdated(address _sender, bytes32 _dataHash);

  /**
   * @dev Event emitted after the notificationReceiptsHash has been updated.
   */
  event NotificationReceiptsHashUpdated(address _sender, bytes32 _dataHash);


  /**
   * @dev Throws if shipment has not been activated.
   */
  modifier isActive() {
    require(hasBeenActivated);
    _;
  }

  /**
   * @dev Adds uploaders to the sensorDataUploaders mapping. Overrides super to add modifiers.
   * @param _uploaders Array of addresses to add to the sensorDataUploaders mapping.
   */
  function addSensorDataUploaders(address[] _uploaders) public onlyEditor isActive {
    super.addSensorDataUploaders(_uploaders);
  }

  /**
   * @dev Removes uploaders from the sensorDataUploaders mapping. Overrides super to add modifiers.
   * @param _uploaders Array of addresses to remove from the sensorDataUploaders mapping.
   */
  function removeSensorDataUploaders(address[] _uploaders) public onlyEditor isActive {
    super.removeSensorDataUploaders(_uploaders);
  }

  /**
   * @dev Marks shipment as active.
   * TODO: Check token balance of shipment.
   */
  function activate() public onlyEditor {
    hasBeenActivated = true;
    emit ShipmentActivated(msg.sender);
  }

  /**
   * @dev Marks shipment as terminated.
   */
  function terminate() public onlyEditor isActive {
    hasBeenTerminated = true;
    emit ShipmentTerminated(msg.sender);
  }

  /**
   * @dev Updates hash of payment receipts.
   * @param _dataHash 256 bit hash of flattened payment receipt data.
   */
  function setPaymentReceiptsHash(bytes32 _datahash) public onlyProtocol isActive {
    paymentReceiptsHash = _datahash;
    emit PaymentReceiptsHashUpdated(msg.sender, _datahash);
  }

  /**
   * @dev Updates hash of notification receipts.
   * @param _dataHash 256 bit hash of flattened notification receipt data.
   */
  function setNotificationReceiptsHash(bytes32 _datahash) public onlyProtocol isActive {
    notificationReceiptsHash = _datahash;
    emit NotificationReceiptsHashUpdated(msg.sender, _datahash);
  }

  /**
   * @dev Updates data hash of off-chain data. Overrides super to add modifiers.
   * @param _dataHash 256 bit hash of flattened off-chain shipmetn data.
   */
  function setDataHash(bytes32 _datahash) public onlyEditor isActive {
    super.setDataHash(_datahash);
  }
}
