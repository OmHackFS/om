//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";

contract Om is SemaphoreCore, SemaphoreGroups {
    event VoteCast(uint256 indexed groupId, bytes32 signal);
    event ProposalCreated(uint256 indexed groupId, bytes32 eventName);

    uint8 public treeDepth;
    IVerifier public verifier;

    constructor(uint8 _treeDepth, IVerifier _verifier) {
        treeDepth = _treeDepth;
        verifier = _verifier;
    }

    function createProposal(bytes32 proposalName) public {
        uint256 groupId = hashProposalName(proposalName);

        _createGroup(groupId, treeDepth, 0);

        emit ProposalCreated(groupId, proposalName);
    }

    function addMember(uint256 groupId, uint256 identityCommitment) public {
        _addMember(groupId, identityCommitment);
    }

    function castVote(
        bytes32 review,
        uint256 nullifierHash,
        uint256 groupId,
        uint256[8] calldata proof
    ) public {
        uint256 root = groups[groupId].root;

        _verifyProof(review, root, nullifierHash, groupId, proof, verifier);

        _saveNullifierHash(nullifierHash);

        emit VoteCast(groupId, review);
    }

    function hashProposalName(bytes32 eventId) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(eventId))) >> 8;
    }
}
