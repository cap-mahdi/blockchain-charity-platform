// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Association/AssociationFactory.sol";

contract PlateformContract {
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
    address[] public admins;
    AssociationFactory private associationFactory;

    constructor() {
        admins.push(msg.sender);
    }

    function  setAssociationFactory(address _associationFactory) onlyAdmin public  {
        associationFactory = AssociationFactory(_associationFactory);
    }   

    function addAdmin(address _admin) onlyAdmin public {
        admins.push(_admin);
    }

    function refuseDemand(uint256 _index) onlyAdmin public {
        demands[_index].status = Status.Refused;
    }

    function acceptDemand(uint256 _index) onlyAdmin public {
        Demand memory demandToRemove = demands[_index];
        demands[_index] = demands[demands.length - 1];
        demands.pop();

        Association memory association = demandToRemove.association;
        associationFactory.deployAssociationContract(
            association.name,
            association.description,
            association.email,
            association.phoneNumber,
            association.country,
            association.streetAddress,
            association.city,
            association.state,
            association.postalCode,
            association.creationDate,
            association.size
        );
    }

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


    modifier onlyAdmin {
        bool isAdmin = false;
        for (uint i = 0; i < admins.length; i++) {
            if (admins[i] == msg.sender) {
                isAdmin = true;
                break;
            }
        }

        require(isAdmin, "Only admins can call this function");
        _;
    }
}
