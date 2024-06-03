// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract CharityCampaignDAO  {
    struct Proposal {
        address proposer;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        bool allowed;
        uint256 timestamp;

        mapping(address => bool) voters; // Added mapping to track voters
    }

    struct Tranche{
        bool state;
        uint256 percentage  ; 
    }

    string public title;
    string public description;
    address public targetUser;
    uint256 public targetAmount;
    uint256 public totalDonations;
    uint256 public totalVotingPower;
    uint256 public refundThreshold;
    uint public finalBalance ; 
    address public owner;
    uint public duration  = 120;
    uint startTimeStamp  ; 

    uint256 public proposalDelay = 120;
        uint256 public trancheDelay = 120;

    bool public allowWithdraw ;
    uint public lastTimeStamp;    


    IERC20 public tokenAddress; // The associated token contract


    mapping(address => uint256) public donations;
    mapping(address => bool) public isDonor;

    address[] public  donors ;
    mapping(uint256 => Proposal) public proposals;
    uint256 public numProposals;
    Tranche[] public tranches ;


    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 tokensIssued
    );
    event RefundProcessed(address indexed donor, uint256 amount);
    event ProposalCreated(uint256 proposalId, address proposer);
    event ProposalVoted(uint256 proposalId, address voter, bool inSupport);
    event ProposalExecuted(uint256 proposalId, bool allowed);
    event ProposalScheduled(uint256 indexed proposalId, bytes32 indexed timelockId);


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
        startTimeStamp = block.timestamp;
        allowWithdraw = true ; 
        tranches.push(Tranche(false ,20 ));
        tranches.push(Tranche(false ,30 ));
        tranches.push(Tranche(false ,50 ));

    }
   
    function addDonor(address _donor) internal {
        if(!isDonor[_donor]){
      donors.push(_donor);
        isDonor[_donor] = true;
        }
  
    }

    function donate() external payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        // Calculate the amount of tokens to issue to the donor
        uint256 tokensToIssue = calculateTokens(msg.value);

        // Issue tokens to the donor
        tokenAddress.transfer(msg.sender, tokensToIssue);

        // Update donation and total donation amounts
        
        donations[msg.sender] += msg.value;
        addDonor(msg.sender) ; 
        totalDonations += msg.value;
        totalVotingPower += tokensToIssue ; 

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

    // function requestRefund() external {
    //     require(totalDonations < targetAmount, "Target amount reached");
    //     require(donations[msg.sender] > 0, "No donations to refund");
    //     require(donations[msg.sender] >= refundThreshold, "Refund threshold not met");

    //     uint256 amountToRefund = donations[msg.sender];
    //     donations[msg.sender] = 0;
    //     totalDonations -= amountToRefund;

    //     payable(msg.sender).transfer(amountToRefund);

    //     emit RefundProcessed(msg.sender, amountToRefund);
    // }

    function createProposal() internal returns (uint256) {
        uint256 proposalId = numProposals++;
        Proposal storage proposal = proposals[proposalId];
        proposal.proposer = address(this);
        proposal.allowed = true; // Default to not allowing funds withdrawal
        proposal.timestamp = block.timestamp + proposalDelay;
        emit ProposalCreated(proposalId, msg.sender);




        return proposalId;
    }

    function voteOnProposal(bool inSupport) external {
        Proposal storage proposal = proposals[numProposals-1];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.proposer != msg.sender, "Cannot vote on own proposal");
        require(tokenAddress.balanceOf(msg.sender)>0, "Insufficient tokens to vote");
        require(!proposal.voters[msg.sender], "Already voted");

        if (inSupport) {
            proposal.votesFor += tokenAddress.balanceOf(msg.sender);
        } else {
            proposal.votesAgainst += tokenAddress.balanceOf(msg.sender);
        }
        proposal.voters[msg.sender] = true;

        emit ProposalVoted(numProposals-1, msg.sender, inSupport);
    }

    function executeProposal() external  {
        Proposal storage proposal = proposals[numProposals-1];

        if(!proposal.executed){

        

        if ((totalVotingPower<=(proposal.votesFor + proposal.votesAgainst)*2) && (proposal.votesFor > proposal.votesAgainst)) {

            
            proposal.allowed = false;
            allowWithdraw =  false ;
            uint256 balance = address(this).balance ;
             for (uint256 i = 0; i < donors.length; i++) {
            address donorAddress = donors[i];
            if (donations[donorAddress] > 0 ) {
                uint256 amountToRefund = (balance * tokenAddress.balanceOf(donorAddress)) / totalVotingPower;
          
                // totalVotingPower -= tokenAddress.balanceOf(donorAddress);
                 payable(donorAddress).transfer(amountToRefund);
                emit RefundProcessed(donorAddress, amountToRefund);
            }
        }
   

        }else{
            allowWithdraw =  true ; 


        }

        proposal.executed = true;

        emit ProposalExecuted(numProposals-1, proposal.allowed);
        }
    }

    function withdrawFunds() external {
        require(block.timestamp>(startTimeStamp+duration) , "Ongoing Campaign : you can't withdraw");

        if (!tranches[0].state ){
         require(allowWithdraw, "Funds withdrawal not allowed");
        require(msg.sender == owner, "Only the owner can withdraw funds");

        finalBalance = address(this).balance ; 
        uint amountToTransfer = (finalBalance* tranches[0].percentage)/100 ;

        tranches[0].state = true ; 
        lastTimeStamp = block.timestamp;
        payable(msg.sender).transfer(amountToTransfer);
        createProposal();

        }
        else if(!tranches[1].state ){
        require(block.timestamp>(lastTimeStamp+trancheDelay) , "Wait tranche not unlocked : you can't withdraw");

        this.executeProposal();
 
        if(allowWithdraw){
   require(msg.sender == owner, "Only the owner can withdraw funds");
        tranches[1].state = true ; 
        lastTimeStamp = block.timestamp;
        createProposal();
        uint amountToTransfer = (finalBalance* tranches[1].percentage)/100 ;

        payable(msg.sender).transfer(amountToTransfer);
        }
     


        }
        else if(!tranches[2].state){

        require(block.timestamp>(lastTimeStamp+trancheDelay) , "Wait tranche not unlocked : you can't withdraw");

        this.executeProposal();


        if(allowWithdraw){
        require(msg.sender == owner, "Only the owner can withdraw funds");
        tranches[2].state = true ; 
        uint amountToTransfer = (finalBalance* tranches[2].percentage)/100 ;

        payable(msg.sender).transfer(amountToTransfer);
        }
        }

        // require(allowWithdraw, "Funds withdrawal not allowed");
        // require(totalDonations >= targetAmount, "Target amount not reached");

    }

}






