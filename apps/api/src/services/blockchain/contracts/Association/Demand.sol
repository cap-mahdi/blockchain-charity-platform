// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Demand {
    struct Association {
        string name;
        string description;
        string email;
        string phoneNumber;
        string country;
        string streetAddress;
        string city;
        string state;
        string postalCode;
        uint256 creationDate;
        uint256 size;
        string domain;
    }

    enum Status {
        Pending,
        Refused
    }

    struct Demand {
        Association association;
        address owner;
        Status status;
    }

    Demand[] public demands;

    function addDemand(
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
        string memory _domain
    ) public {
        Association memory newAssociation = Association({
            name: _name,
            description: _description,
            email: _email,
            phoneNumber: _phoneNumber,
            country: _country,
            streetAddress: _streetAddress,
            city: _city,
            state: _state,
            postalCode: _postalCode,
            creationDate: _creationDate,
            size: _size,
            domain: _domain
        });

        Demand memory newDemand = Demand({
            association: newAssociation,
            owner: msg.sender,
            status: Status.Pending
        });

        demands.push(newDemand);
    }

    function getAllDemands() public view returns (Demand[] memory) {
        return demands;
    }
}
