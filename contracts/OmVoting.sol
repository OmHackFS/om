// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//voting contract with NO semaphore

contract OmVoting {
  event DaoCreated(uint256 indexed groupId, string daoName);
  event ProposalCreated(
    uint256 indexed groupId,
    uint256 proposalId,
    string question,
    string IpfsURI
  );
  event VoteCast(uint256 indexed groupId, uint256 proposalId, bool support);

  // enum VoteStates {Absent, Yes, No}

  uint256 nextGroupId = 1;

  struct Group {
    address admin;
    uint256 members;
    uint256 nextProposal;
    uint256 votesToPass;
  }

  struct Proposal {
    address creator;
    string question;
    uint256 yesCount;
    uint256 noCount;
    uint256 StartDate;
    uint256 EndDate;
    string IpfsURI;
    // mapping (address => VoteStates) voteStates;
  }

  // groupId => Group struct
  mapping(uint256 => Group) public daoGroups;
  // groupId => member address => is in group
  mapping(uint256 => mapping(address => bool)) public membersPerGroup;
  // groupId => proposalId => Propsal struct
  mapping(uint256 => mapping(uint256 => Proposal)) public proposalsPerGroup;

  constructor() {}

  // don't think we need this right now??
  // function proposalCount() external view returns(uint) {
  //   return proposals.length;
  // }

  function createDao(string memory daoName, address[] memory _members) public {
    uint256 groupId = nextGroupId;
    nextGroupId++;

    Group memory group;
    group.admin = msg.sender;
    group.nextProposal = 1;

    daoGroups[groupId] = group;

    for (uint256 i = 0; i < _members.length; i++) {
      membersPerGroup[groupId][_members[i]] = true;
    }
    membersPerGroup[groupId][msg.sender] = true;

    emit DaoCreated(groupId, daoName);
  }

  function newProposal(
    uint256 groupId,
    string calldata _question,
    string calldata _ipfsURI
  ) external {
    require(
      membersPerGroup[groupId][msg.sender],
      "Address is not a member of this group"
    );

    uint256 proposalId = daoGroups[groupId].nextProposal;

    Proposal memory proposal;
    proposal.creator = msg.sender;
    proposal.question = _question;
    proposal.StartDate = block.timestamp;
    proposal.EndDate = block.timestamp + 7 days;
    proposal.IpfsURI = _ipfsURI;

    proposalsPerGroup[groupId][proposalId] = proposal;

    daoGroups[groupId].nextProposal++;

    emit ProposalCreated(groupId, proposalId, _question, _ipfsURI);
  }

  function castVote(
    uint256 groupId,
    uint256 proposalId,
    bool support
  ) external {
    require(
      membersPerGroup[groupId][msg.sender],
      "Address is not a member of this group"
    );
    Proposal storage proposal = proposalsPerGroup[groupId][proposalId];

    // leaving out the vote tracking for now bc semaphore will prevent double-spend

    // clear out previous vote
    // if(proposal.voteStates[msg.sender] == VoteStates.Yes) {
    //     proposal.yesCount--;
    // }
    // if(proposal.voteStates[msg.sender] == VoteStates.No) {
    //     proposal.noCount--;
    // }

    // add new vote
    if (support) {
      proposal.yesCount++;
    } else {
      proposal.noCount++;
    }

    // we're tracking whether or not someone has already voted
    // and we're keeping track as well of what they voted
    // proposal.voteStates[msg.sender] = _supports ? VoteStates.Yes : VoteStates.No;

    emit VoteCast(groupId, proposalId, support);
  }
}
