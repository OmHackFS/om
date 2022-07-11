//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";

contract Om is SemaphoreCore, SemaphoreGroups {
    event DaoCreated(uint256 indexed groupId, bytes32 daoName);
    event MemberAdded(uint256 indexed groupId);
    event MemberRemoved(uint256 indexed groupId);
    event VoteCast(uint256 indexed groupId, uint256 proposalId, bytes32 signal);
    event ProposalCreated(
        uint256 indexed groupId,
        uint256 proposalId,
        bytes32 proposalName
    );

    uint8 public treeDepth;
    IVerifier public verifier;

    struct Group {
        address admin;
        uint256 members;
        uint256 nextProposal;
        Proposal[] proposals;
    }

    struct Proposal {
        uint256 id;
        uint deadline;
        uint256 votesUp;
        uint256 votesDown;
        bool passed;
    }

    mapping(uint256 => Group) public daoGroups;

    constructor(uint8 _treeDepth, IVerifier _verifier) {
        treeDepth = _treeDepth;
        verifier = _verifier;
    }

    function createDao(bytes32 daoName) public {
        uint256 groupId = hashDaoName(daoName);

        _createGroup(groupId, treeDepth, 0);

        Group memory group;
        group.admin = msg.sender;
        group.nextProposal = 1;

        daoGroups[groupId] = group;

        emit DaoCreated(groupId, daoName);
    }

    function addMember(uint256 groupId, uint256 identityCommitment) public {
        require(
            msg.sender == daoGroups[groupId].admin,
            "Only group admin may add members"
        );
        _addMember(groupId, identityCommitment);
        daoGroups[groupId].members++;
    }

    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) public {
        require(
            msg.sender == daoGroups[groupId].admin,
            "Only group admin may remove members"
        );
        _removeMember(
            groupId,
            identityCommitment,
            proofSiblings,
            proofPathIndices
        );
        daoGroups[groupId].members--;
    }

    function createProposal(
        bytes32 proposalName,
        uint256 nullifierHash,
        uint256 groupId,
        uint256[8] calldata proof
    ) public {
        uint256 root = groups[groupId].root;

        _verifyProof(
            proposalName,
            root,
            nullifierHash,
            groupId,
            proof,
            verifier
        );

        // _saveNullifierHash(nullifierHash);

        Proposal memory proposal;
        uint256 proposalId = daoGroups[groupId].nextProposal;
        proposal.id = proposalId;
        proposal.deadline = block.number + 100;
        daoGroups[groupId].proposals.push(proposal);
        daoGroups[groupId].nextProposal++;

        emit ProposalCreated(groupId, proposalId, proposalName);
    }

    function castVote(
        uint256 proposalId,
        bytes32 vote,
        uint256 nullifierHash,
        uint256 groupId,
        uint256[8] calldata proof
    ) public {
        uint256 root = groups[groupId].root;

        _verifyProof(vote, root, nullifierHash, groupId, proof, verifier);

        _saveNullifierHash(nullifierHash);

        // proposals[proposalId].votesUp++;

        emit VoteCast(groupId, proposalId, vote);
    }

    function hashDaoName(bytes32 eventId) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(eventId))) >> 8;
    }
}
