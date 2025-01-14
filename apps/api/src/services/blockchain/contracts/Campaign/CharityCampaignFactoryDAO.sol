// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./CharityCampaignDAO.sol";
import "./GovToken.sol";
import "../Association/AssociationFactory.sol";

contract CharityCampaignFactoryDAO {
event CampaignCreated(address campaignAddress, address tokenAddress);

    AssociationFactory public associationFactory;
    constructor(address _associationFactory) {
        associationFactory = AssociationFactory(_associationFactory);
    }

    function createCampaign(
        string memory _name,
        string memory _description,
        address _targetUser,
        uint256 _targetAmount,
        uint256 _refundThreshold , 
         uint256 _tokenSupply,
        string memory _tokenName,
        string memory _tokenSymbol // Add the token name and abbreviation parameters
    ) external  {

        bool isAdmin  ;
        address associationAddress ; 


( isAdmin  , associationAddress) =associationFactory.isAssociationAdmin(msg.sender);
        // Deploy the token contract
require(isAdmin , "You are not an association admin");
       GovToken newToken = new GovToken(_tokenSupply, _tokenName, _tokenSymbol);

       
        
        // Deploy the campaign contract, passing the token contract address
        CharityCampaignDAO newCampaign = new CharityCampaignDAO(
            _name,
            _description,
            _targetUser,
            _targetAmount,
            _refundThreshold,
            associationAddress,
           address( newToken ) , 
           address (associationFactory)
        );


               newToken.transfer(address(newCampaign), _tokenSupply);
            

        // Transfer ownership of the token contract to the campaign contract
        newToken.transferOwnership(address(newCampaign));

        emit CampaignCreated(address(newCampaign), address(newToken));
    }
}