// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorStorage.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";


contract CharityCampaignDAO  is Governor, GovernorSettings, GovernorCountingSimple, GovernorStorage, GovernorVotes, GovernorVotesQuorumFraction {
    string  public  title;
    string public description;
    address public targetUser;
    uint256 public targetAmount;
    uint256 public totalDonations;
    uint256 public refundThreshold;
    address public owner;

     IERC20 public tokenAddress; // The associated token contract

    mapping(address => uint256) public donations;

    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 tokensIssued
    );
    event RefundProcessed(address indexed donor, uint256 amount);

    constructor(
        string memory _title,
        string memory _description,
        address _targetUser,
        uint256 _targetAmount,
        uint256 _refundThreshold,
        address _owner,
        IVotes _tokenAddress // Address of the associated token contract
        
    )   Governor(_title)
        GovernorSettings(7200 /* 1 day */, 50400 /* 1 week */, 0)
        GovernorVotes(_tokenAddress)
        GovernorVotesQuorumFraction(50)
      {
        title = _title;
        description = _description;
        targetUser = _targetUser;
        targetAmount = _targetAmount;
        refundThreshold = _refundThreshold;
        owner = _owner;
        tokenAddress = IERC20(address(_tokenAddress)); 
    }

  function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory proposalDescription, address proposer)
        internal
        override(Governor, GovernorStorage)
        returns (uint256)
    {
        return super._propose(targets, values, calldatas, proposalDescription, proposer);
    }

    function _queueOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor )
        returns (uint48)
    {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor)
    {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor)
        returns (uint256)
    {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor )
        returns (address)
    {
        return super._executor();
    }


































///////CHARITY CAMPAIGN DETAILS FUNCTIONS
    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        // Calculate the amount of tokens to issue to the donor
        uint256 tokensToIssue  =calculateTokens(msg.value);

        // Issue tokens to the donor
        tokenAddress.transfer(msg.sender, tokensToIssue);

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
        uint256 tokensToIssue = (_donationAmount * tokenAddress.totalSupply()) /
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
