// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Association.sol";

contract AssociationFactory {

    event AssociationContractDeployed(address indexed associationContract, address indexed creator);

    address public plateformAddress;

    enum Status {
        Active,
        InActive
    }
    mapping(address => Status) public associations;
    

    constructor(address _plateformCAddress) {
        plateformAddress = _plateformCAddress;
    }

    function deployAssociationContract(
        string memory _name,
        string memory _description,
        string memory _email,
        string memory _phoneNumber,
        string memory _country,
        string memory _streetAddress,
        string memory _city,
        string memory _state,
        string memory _postalCode,
        uint256 _creationDate,
        uint256 _size
    ) external onlyAdmin returns (address) {
        AssociationContract newContract = new AssociationContract(
            _name,
            _description,
            _email,
            _phoneNumber,
            _country,
            _streetAddress,
            _city,
            _state,
            _postalCode,
            _creationDate,
            _size
        );
        associations[address(newContract)] = Status.Active;

        emit AssociationContractDeployed(address(newContract), msg.sender);

        return address(newContract);
    }

    function setPlateformAddress(address _plateformAddress) external onlyAdmin {
        plateformAddress = _plateformAddress;
    }

    function changeAssociationStatus(address _associationAddress, Status _status) external onlyAdmin {
        associations[_associationAddress] = _status;
    }

    modifier onlyAdmin {
        require(plateformAddress == msg.sender, "Only admin can call this function");
        _;
    }
}
