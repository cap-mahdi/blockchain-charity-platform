// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract AssociationContract {
    // State variables to hold the association details
    string public name;
    string public description;
    string public email;
    string public phoneNumber;
    string public country;
    string public streetAddress;
    string public city;
    string public state;
    string public postalCode;
    uint256 public creationDate; // Custom creation date for the association
    uint256 public size;

    // Event to be emitted when the association contract is deployed
    event AssociationContractDeployed(
        string name,
        string description,
        string email,
        string phoneNumber,
        string country,
        string streetAddress,
        string city,
        string state,
        string postalCode,
        uint256 creationDate,
        uint256 size
    );

    // Constructor to initialize the association details
    constructor(
        string memory _name,
        string memory _description,
        string memory _email,
        string memory _phoneNumber,
        string memory _country,
        string memory _streetAddress,
        string memory _city,
        string memory _state,
        string memory _postalCode,
        uint256 _creationDate, // Custom creation date parameter
        uint256 _size
            ) {
        name = _name;
        description = _description;
        email = _email;
        phoneNumber = _phoneNumber;
        country = _country;
        streetAddress = _streetAddress;
        city = _city;
        state = _state;
        postalCode = _postalCode;
        creationDate = _creationDate; // Assign custom creation date
        size = _size;

        emit AssociationContractDeployed(
            _name,
            _description,
            _email,
            _phoneNumber,
            _country,
            _streetAddress,
            _city,
            _state,
            _postalCode,
            _creationDate, // Emit custom creation date
            _size
        );
    }

    // Function to get the association details
    function getAssociationDetails() public view returns (
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
    ) {
        return (
            name,
            description,
            email,
            phoneNumber,
            country,
            streetAddress,
            city,
            state,
            postalCode,
            creationDate,
            size
        );
    }
}
