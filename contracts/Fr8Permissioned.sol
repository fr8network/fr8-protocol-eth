pragma solidity ^0.4.24;

/**
 * @title Fr8Permissioned v0.0.1
 * @dev The Fr8Permissioned contract has an owner address, and provides basic authorization control
 *      functions, this simplifies the implementation of "user permissions".
 */

contract Fr8Permissioned {
  address public protocolAddress;
  mapping (address => bool) public owners;
  mapping (address => bool) public editors;
  mapping (address => bool) public readers;

  /**
   * @dev The Fr8Permissioned constructor sender account to the owners mapping.
   * @param _protocolAddress Fr8 Protocol Address.
   */
  constructor(address _protocolAddress) public {
    protocolAddress = _protocolAddress;
    owners[msg.sender] = true;
  }

  /**
   * @dev Event emitted after any calls that modify permissions.
   */
  event PermissionsChanged(bytes32 _role, bytes32 _action, address[] _addresses);

  /**
   * @dev Throws if called by any account other than the Fr8 Protocol.
   */
  modifier onlyProtocol() {
    require(msg.sender == protocolAddress);
    _;
  }

  /**
   * @dev Throws if called by any account other than an owner.
   */
  modifier onlyOwner() {
    require(owners[msg.sender]);
    _;
  }

  /**
   * @dev Throws if called by any account other than an owner or editor.
   */
  modifier onlyEditor() {
    require(owners[msg.sender] || editors[msg.sender]);
    _;
  }

  /**
   * @dev Allows an owner to add other owners.
   * @param _owners Array of addresses to add to the owners mapping.
   */
  function addOwners(address[] _owners) public onlyOwner {
    for (uint i = 0; i < _owners.length; i++) {
      owners[_owners[i]] = true;
    }
    emit PermissionsChanged("OWNER", "ADDED", _owners);
  }

  /**
   * @dev Allows an owner to add editors.
   * @param _editors Array of addresses to add to the editors mapping.
   */
  function addEditors(address[] _editors) public onlyOwner {
    for (uint i = 0; i < _editors.length; i++) {
      editors[_editors[i]] = true;
    }
    emit PermissionsChanged("EDITOR", "ADDED", _editors);
  }

  /**
   * @dev Allows an owner to add readers.
   * @param _readers Array of addresses to add to the Readers mapping.
   */
  function addReaders(address[] _readers) public onlyOwner {
    for (uint i = 0; i < _readers.length; i++) {
      readers[_readers[i]] = true;
    }
    emit PermissionsChanged("READER", "ADDED", _readers);
  }

  /**
   * @dev Allows an owner to add readers.
   * @param _protocolAddress Fr8 Protocol Address.
   */
  function setProtocolAddress(address _protocolAddress) public onlyOwner {
    protocolAddress = _protocolAddress;
    address[] memory wrappedNewAddress = new address[](1);
    wrappedNewAddress[0] = _protocolAddress;
    emit PermissionsChanged("PROTOCOL", "UPDATED", wrappedNewAddress);
  }

  /**
   * @dev Allows an owner to remove other owners. The sender cannot remove themselves.
   * @param _owners Array of addresses to remove from the owners mapping.
   */
  function removeOwners(address[] _owners) public onlyOwner {
    for (uint i = 0; i < _owners.length; i++) {
      require(_owners[i] != msg.sender);
      owners[_owners[i]] = false;
    }
    assert(owners[msg.sender]);
    emit PermissionsChanged("OWNER", "REMOVED", _owners);
  }

  /**
   * @dev Allows an owner to remove editors.
   * @param _editors Array of addresses to remove from the editors mapping.
   */
  function removeEditors(address[] _editors) public onlyOwner {
    for (uint i = 0; i < _editors.length; i++) {
      editors[_editors[i]] = false;
    }
    emit PermissionsChanged("EDITOR", "REMOVED", _editors);
  }

  /**
   * @dev Allows an owner to remove readers.
   * @param _readers Array of addresses to remove from the readers mapping.
   */
  function removeReaders(address[] _readers) public onlyOwner {
    for (uint i = 0; i < _readers.length; i++) {
      readers[_readers[i]] = false;
    }
    emit PermissionsChanged("READER", "REMOVED", _readers);
  }
}
