//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";

contract Om is SemaphoreCore, SemaphoreGroups {
    event DaoCreated(uint256 indexed groupId, bytes32 daoName);
    event VoteCast(uint256 indexed groupId, uint256 proposalId, bytes32 signal);
    event ProposalCreated(uint256 indexed groupId, bytes32 proposalName);

    uint8 public treeDepth;
    IVerifier public verifier;
    uint256 nextProposal;

    struct Proposal {
        uint256 id;
        uint deadline;
        uint256 votesUp;
        uint256 votesDown;
        bool passed;
    }

    mapping(uint256 => Proposal) public proposals;

    constructor(
        uint8 _treeDepth,
        IVerifier _verifier,
        bytes32 daoName
    ) {
        treeDepth = _treeDepth;
        verifier = _verifier;
        nextProposal = 1;

        uint256 groupId = hashDaoName(daoName);

        _createGroup(groupId, treeDepth, 0);

        emit DaoCreated(groupId, daoName);
    }

    function addMember(uint256 groupId, uint256 identityCommitment) public {
        _addMember(groupId, identityCommitment);
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
        proposal.id = nextProposal;
        proposal.deadline = block.number + 100;

        proposals[nextProposal] = proposal;
        nextProposal++;

        emit ProposalCreated(groupId, proposalName);
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
