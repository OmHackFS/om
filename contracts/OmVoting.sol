// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//voting contract with NO semaphore

contract OmVoting {
    enum VoteStates {Absent, Yes, No}

    struct Proposal {
        address creator;
        string question;
        uint yesCount;
        uint noCount;
        uint StartDate;
        uint EndDate;
        string IpfsURI;
        mapping (address => VoteStates) voteStates;
    }

    Proposal[] public proposals;

    function proposalCount() external view returns(uint) {
      return proposals.length;
    }

    event ProposalCreated(
        address creator,
        string question,
        uint StartDate,
        uint EndDate,
        string IpfsURI
    );

    event VoteCast(uint, address indexed);

    mapping(address => bool) members;

    constructor(address[] memory _members) {
        for(uint i = 0; i < _members.length; i++) {
            members[_members[i]] = true;
        }
        members[msg.sender] = true;
    }

    function newProposal(string calldata _question, string calldata _ipfsURI,uint _startDate, uint _endDate) external {
        require(members[msg.sender]);
        Proposal storage proposal = proposals.push();

        proposal.creator = msg.sender;
        proposal.question = _question;
        proposal.StartDate = _startDate;
        proposal.EndDate = _endDate;
        proposal.IpfsURI = _ipfsURI;

emit ProposalCreated(msg.sender, _question, _startDate, _endDate, _ipfsURI);

    }

    function castVote(uint _proposalId, bool _supports) external {
        require(members[msg.sender]);
        Proposal storage proposal = proposals[_proposalId];

        // clear out previous vote
        if(proposal.voteStates[msg.sender] == VoteStates.Yes) {
            proposal.yesCount--;
        }
        if(proposal.voteStates[msg.sender] == VoteStates.No) {
            proposal.noCount--;
        }

        // add new vote
        if(_supports) {
            proposal.yesCount++;
        }
        else {
            proposal.noCount++;
        }

        // we're tracking whether or not someone has already voted
        // and we're keeping track as well of what they voted
        proposal.voteStates[msg.sender] = _supports ? VoteStates.Yes : VoteStates.No;

        emit VoteCast(_proposalId, msg.sender);
    }
}