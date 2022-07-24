//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@semaphore-protocol/contracts/interfaces/IVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreCore.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";
pragma solidity ^0.8.4;

contract Om is SemaphoreCore, SemaphoreGroups {
  event OmMemberAdded(uint256 groupId, uint256 memberID); //Ok
  event OmGroupCreated(uint256 groupId, address admin); //Ok
  event ProofVerified(uint256 indexed groupId, bytes32 signal);

  event OmMemberRemoved(uint256 indexed groupId, uint256 indexed memberID);
  event VoteCast(uint256 indexed groupId, uint256 proposalId, bool vote);
  event ProposalCreated(
    uint256 indexed groupId,
    uint256 proposalCounter,
    Proposal proposalData
  );
  event DataAdded(
    uint256 indexed groupId,
    uint256 dataId,
    dataStructure dataInfos
  );

  /// @dev Gets a tree depth and returns its verifier address.
  mapping(uint8 => IVerifier) public verifiers;

  /// @dev Gets a group id and returns the group admin address.
  mapping(uint256 => address) public groupAdmins;

  mapping(uint256 => bool) public canGroupPropose;
  mapping(uint256 => bool) public canGroupAddData;
  mapping(uint256 => dataStructure) public dataList;
  mapping(uint256 => Proposal) public ProposalList;

  struct Verifier {
    address contractAddress;
    uint8 merkleTreeDepth;
  }

  struct dataStructure {
    string title;
    address dataOwner;
    uint256 addedDate;
    string dataURI;
    string fileURI;
    uint256 groupId;
    uint256 dataType;
  }

  struct Proposal {
    string title;
    string description;
    uint256 yesCount;
    uint256 noCount;
    uint256 StartDate;
    uint256 EndDate;
    string IpfsURI;
  }

  uint256 public dataFileCounter;
  address public owner;
  uint256 public groupCounter;
  uint256 public proposalCounter;

  modifier onlySupportedDepth(uint8 depth) {
    require(
      address(verifiers[depth]) != address(0),
      "Tree depth is not supported"
    );
    _;
  }

  constructor(Verifier[] memory _verifiers) {
    for (uint8 i = 0; i < _verifiers.length; i++) {
      verifiers[_verifiers[i].merkleTreeDepth] = IVerifier(
        _verifiers[i].contractAddress
      );
    }
    owner = msg.sender;
    createGroup(20, 0, msg.sender, true, true);
  }

  function createGroup(
    uint8 depth,
    uint256 zeroValue,
    address admin,
    bool canPropose,
    bool canAddData
  ) public onlySupportedDepth(depth) {
    groupCounter++;
    _createGroup(groupCounter, depth, zeroValue);
    groupAdmins[groupCounter] = admin;

    canGroupPropose[groupCounter] = canPropose;
    canGroupAddData[groupCounter] = canAddData;

    emit OmGroupCreated(groupCounter, admin);
  }

  mapping(uint256 => uint256[]) public groupMembership;

  function addMember(uint256 groupId, uint256 identityCommitment) external {
    //check if Already a member
    _addMember(groupId, identityCommitment);
    groupMembership[identityCommitment].push(groupId);

    emit OmMemberAdded(groupId, identityCommitment);
  }

  function removeMember(
    uint256 groupId,
    uint256 identityCommitment,
    uint256[] calldata proofSiblings,
    uint8[] calldata proofPathIndices
  ) external {
    _removeMember(groupId, identityCommitment, proofSiblings, proofPathIndices);
    //----How to Remove membership?
    groupMembership[identityCommitment].push(groupId);

    emit OmMemberRemoved(groupId, identityCommitment);
  }

  function verifyProof(
    uint256 groupId,
    bytes32 signal,
    uint256 root,
    uint256 nullifierHash,
    uint256 externalNullifier,
    uint256[8] calldata proof
  ) external {
    // uint256 root = getRoot(groupId);
    uint8 depth = getDepth(groupId);

    require(depth != 0, "Group does not exist");

    IVerifier verifier = verifiers[depth];

    _verifyProof(
      signal,
      root,
      nullifierHash,
      externalNullifier,
      proof,
      verifier
    );

    _saveNullifierHash(nullifierHash);

    emit ProofVerified(groupId, signal);
  }

  //----------Voting

  function createProposal(
    string memory title,
    string memory description,
    uint256 root,
    uint256 startDate,
    uint256 endDate,
    string memory proposalURI,
    uint256 groupId,
    bytes32 signal,
    uint256 nullifierHash,
    uint256 externalNullifier,
    uint256[8] calldata proof
  ) public {
    // uint256 root = getRoot(groupId);
    uint8 depth = getDepth(groupId);

    require(depth != 0, "Group does not exist");
    require(canGroupPropose[groupId], "Group cannot Vote");

    IVerifier verifier = verifiers[depth];

    _verifyProof(
      signal,
      root,
      nullifierHash,
      externalNullifier,
      proof,
      verifier
    );

    _saveNullifierHash(nullifierHash);

    //2. Create Proposal
    proposalCounter++;

    ProposalList[proposalCounter] = Proposal(
      title,
      description,
      0,
      0,
      startDate,
      endDate,
      proposalURI
    );

    emit ProposalCreated(
      groupId,
      proposalCounter,
      ProposalList[proposalCounter]
    );
  }

  function castVote(
    uint256 groupId,
    uint256 root,
    bool vote,
    uint256 nullifierHash,
    uint256 externalNullifierProposalId,
    bytes32 signal,
    uint256[8] calldata proof
  ) public {
    //require that Proposal Exists
    //require if ProposalList[proposalId] > Start Date
    //require if ProposalList[proposalId] > End Date

    //Check if group can vote

    uint8 depth = getDepth(groupId);
    require(depth != 0, "Group does not exist");
    require(canGroupPropose[groupId], "Group cannot Vote");

    IVerifier verifier = verifiers[depth];

    //Verify if member is part of a group -- ExternalNullifier needs to be poolID
    // verifyProof(groupId, vote, nullifierHash, pollId, proof);
    _verifyProof(
      signal,
      root,
      nullifierHash,
      externalNullifierProposalId,
      proof,
      verifier
    );
    // _verifyProof(signal, root, nullifierHash, externalNullifier, proof, verifier);

    _saveNullifierHash(nullifierHash);
    //Add a require that this group can vote

    if (vote) {
      ProposalList[externalNullifierProposalId].yesCount++;
    } else {
      ProposalList[externalNullifierProposalId].noCount++;
    }

    //---Adjust Emit
    emit VoteCast(groupId, externalNullifierProposalId, vote);
  }

  //----Data Functions

  function addData(
    string memory title,
    string memory dataURI,
    string memory fileURI,
    uint256 dataType,
    uint256 groupId,
    uint256 root,
    bytes32 signal,
    uint256 nullifierHash,
    uint256 externalNullifier,
    uint256[8] calldata proof
  ) public {
    uint8 depth = getDepth(groupId);
    require(depth != 0, "Group does not exist");
    require(canGroupAddData[groupId], "Group cannot add Data");

    IVerifier verifier = verifiers[depth];

    require(
      address(verifiers[depth]) != address(0),
      "Depth value is not supported"
    );

    _verifyProof(
      signal,
      root,
      nullifierHash,
      externalNullifier,
      proof,
      verifier
    );
    dataFileCounter++;
    //Add to Data Struct

    dataList[dataFileCounter] = dataStructure(
      title,
      msg.sender,
      block.timestamp,
      dataURI,
      fileURI,
      groupId,
      dataType
    );

    emit DataAdded(groupId, dataFileCounter, dataList[dataFileCounter]);
  }

  function accessData(
    uint256 groupId,
    uint256 root,
    bytes32 signal,
    uint256 nullifierHash,
    uint256 externalNullifier,
    uint256[8] calldata proof
  ) external returns (bool) {
    uint8 depth = getDepth(groupId);

    require(depth != 0, "OmContract: group does not exist");

    IVerifier verifier = verifiers[depth];

    _verifyProof(
      signal,
      root,
      nullifierHash,
      externalNullifier,
      proof,
      verifier
    );

    _saveNullifierHash(nullifierHash);

    emit ProofVerified(groupId, signal);

    return true;
  }

  function getProposalData(uint256 proposalId)
    public
    view
    returns (Proposal memory ProposalData)
  {
    return ProposalList[proposalId];
  }
}
