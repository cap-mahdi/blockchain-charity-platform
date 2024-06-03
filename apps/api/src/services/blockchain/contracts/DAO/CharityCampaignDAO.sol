// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract CharityCampaignDAO {
    struct Proposal {
        address proposer;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        bool allowed;
        mapping(address => bool) voters; // Added mapping to track voters
    }

    string public title;
    string public description;
    address public targetUser;
    uint256 public targetAmount;
    uint256 public totalDonations;
    uint256 public refundThreshold;
    address public owner;

    IERC20 public tokenAddress; // The associated token contract

    mapping(address => uint256) public donations;
    mapping(uint256 => Proposal) public proposals;
    uint256 public numProposals;

    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 tokensIssued
    );
    event RefundProcessed(address indexed donor, uint256 amount);
    event ProposalCreated(uint256 proposalId, address proposer);
    event ProposalVoted(uint256 proposalId, address voter, bool inSupport);
    event ProposalExecuted(uint256 proposalId, bool allowed);

    constructor(
        string memory _title,
        string memory _description,
        address _targetUser,
        uint256 _targetAmount,
        uint256 _refundThreshold,
        address _owner,
        address _tokenAddress // Address of the associated token contract
    ) {
        title = _title;
        description = _description;
        targetUser = _targetUser;
        targetAmount = _targetAmount;
        refundThreshold = _refundThreshold;
        owner = _owner;
        tokenAddress = IERC20(_tokenAddress);
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        // Calculate the amount of tokens to issue to the donor
        uint256 tokensToIssue = calculateTokens(msg.value);

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
        require(donations[msg.sender] >= refundThreshold, "Refund threshold not met");

        uint256 amountToRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        totalDonations -= amountToRefund;

        payable(msg.sender).transfer(amountToRefund);

        emit RefundProcessed(msg.sender, amountToRefund);
    }

    function createProposal() external returns (uint256) {
        uint256 proposalId = numProposals++;
        Proposal storage proposal = proposals[proposalId];
        proposal.proposer = msg.sender;
        proposal.allowed = false; // Default to not allowing funds withdrawal
        emit ProposalCreated(proposalId, msg.sender);
        return proposalId;
    }

    function voteOnProposal(uint256 proposalId, bool inSupport) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.proposer != msg.sender, "Cannot vote on own proposal");
        require(proposal.votesFor + proposal.votesAgainst < tokenAddress.balanceOf(msg.sender), "Insufficient tokens to vote");
        require(!proposal.voters[msg.sender], "Already voted");

        if (inSupport) {
            proposal.votesFor += tokenAddress.balanceOf(msg.sender);
        } else {
            proposal.votesAgainst += tokenAddress.balanceOf(msg.sender);
        }
        proposal.voters[msg.sender] = true;

        emit ProposalVoted(proposalId, msg.sender, inSupport);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.allowed = true;
        }

        proposal.executed = true;

        emit ProposalExecuted(proposalId, proposal.allowed);
    }

    function withdrawFunds() external {
        Proposal storage proposal = proposals[numProposals - 1]; // Latest proposal
        require(proposal.allowed, "Funds withdrawal not allowed");
        require(totalDonations >= targetAmount, "Target amount not reached");
        require(msg.sender == owner, "Only the owner can withdraw funds");

        payable(targetUser).transfer(address(this).balance);
    }
}





























