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

    struct AssociationInfo {
        address associationAddress;
        Status status;
    }

    mapping(address => Status) public associations;
    address[] public associationsArray;
    uint public associationsCount;

    constructor(address _plateformCAddress) {
        plateformAddress = _plateformCAddress;
    }

    function getAssociationWithStatus(uint _index) public view returns (AssociationInfo memory) {
        address associationAddress = associationsArray[_index];
        return AssociationInfo({
            associationAddress: associationAddress,
            status: associations[associationAddress]
        });
    }

    function getAssociationsWithStatus() public view returns (AssociationInfo[] memory) {
        AssociationInfo[] memory associationInfoArray = new AssociationInfo[](associationsCount);
        for (uint i = 0; i < associationsArray.length; i++) {
            address associationAddress = associationsArray[i];
            associationInfoArray[i] = AssociationInfo({
                associationAddress: associationAddress,
                status: associations[associationAddress]
            });
        }
        return associationInfoArray;
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
        uint256 _size,
        string memory _domain,
        string[] memory _imagesHashes
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
            _size,
            _domain,    
            _imagesHashes
        );
        associations[address(newContract)] = Status.Active;
        associationsArray.push(address(newContract));
        associationsCount++;

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
