// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC20 , Ownable  {
     constructor( uint256 initialSupply, string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender)  payable{
        _mint(msg.sender, initialSupply); 
    }
   
      
}
