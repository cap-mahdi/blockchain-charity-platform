// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Association.sol";

contract AssociationFactory {
    // Event to be emitted when a new AssociationContract is deployed
    event AssociationContractDeployed(address indexed associationContract, address indexed creator);

    // Function to deploy a new AssociationContract
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
    ) external returns (address) {
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

        emit AssociationContractDeployed(address(newContract), msg.sender);

        return address(newContract);
    }
}
