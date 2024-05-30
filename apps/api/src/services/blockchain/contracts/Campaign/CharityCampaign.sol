// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CharityCampaign {
    string public name;
    string public description;
    address public targetUser;
    uint256 public targetAmount;
    uint256 public totalDonations;
    uint256 public refundThreshold;
    address public owner;

    IERC20 public token; // The associated token contract

    mapping(address => uint256) public donations;

    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 tokensIssued
    );
    event RefundProcessed(address indexed donor, uint256 amount);

    constructor(
        string memory _name,
        string memory _description,
        address _targetUser,
        uint256 _targetAmount,
        uint256 _refundThreshold,
        address _owner,
        address _tokenAddress // Address of the associated token contract
    ) {
        name = _name;
        description = _description;
        targetUser = _targetUser;
        targetAmount = _targetAmount;
        refundThreshold = _refundThreshold;
        owner = _owner;
        token = IERC20(_tokenAddress); 
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        // Calculate the amount of tokens to issue to the donor
        uint256 tokensToIssue  =calculateTokens(msg.value);

        // Issue tokens to the donor
        token.transfer(msg.sender, tokensToIssue);

        // Update donation and total donation amounts
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value, tokensToIssue);
    }

    function calculateTokens(uint256 _donationAmount)
        internal
        view
        returns (uint256)
    {
        require(targetAmount > 0, "Target amount must be greater than zero");

        // Calculate the ratio of tokens to issue based on the donation amount and target amount
        // Use SafeMath to prevent integer overflow
        uint256 tokensToIssue = (_donationAmount * token.totalSupply()) /
            targetAmount;

        return tokensToIssue;
    }

    function requestRefund() external {
        require(totalDonations < targetAmount, "Target amount reached");
        require(donations[msg.sender] > 0, "No donations to refund");

        uint256 amountToRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        totalDonations -= amountToRefund;

        payable(msg.sender).transfer(amountToRefund);

        emit RefundProcessed(msg.sender, amountToRefund);
    }

    function withdrawFunds() external {
        require(totalDonations >= targetAmount, "Target amount not reached");
        require(msg.sender == owner, "Only the owner can withdraw funds");

        payable(targetUser).transfer(address(this).balance);
    }
}
