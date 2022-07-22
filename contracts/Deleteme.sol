// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "./interfaces/ISemaphore.sol";
import "./interfaces/IVerifier.sol";
import "./base/SemaphoreCore.sol";
import "./base/SemaphoreGroups.sol";

/// @title Semaphore
contract OmContract is SemaphoreCore, SemaphoreGroups {
    //Events
    //Group Created -function exists
    //Member Added - function exists
    //Remove Member - function exists
    //Change group Admin - function exists
    //Proposal Created - create function
    //Vote - create function
    //Data Added - create function
    //Data Downloaded -create function

    /// @dev Gets a tree depth and returns its verifier address.
    mapping(uint8 => IVerifier) public verifiers;

    /// @dev Gets a group id and returns the group admin address.
    mapping(uint256 => address) public groupAdmins;

    struct Verifier {
        address contractAddress;
        uint8 merkleTreeDepth;
    }

    /// @dev Checks if the group admin is the transaction sender.
    /// @param groupId: Id of the group.
    modifier onlyGroupAdmin(uint256 groupId) {
        require(groupAdmins[groupId] == _msgSender(), "Semaphore: caller is not the group admin");
        _;
    }

    /// @dev Checks if there is a verifier for the given tree depth.
    /// @param depth: Depth of the tree.
    modifier onlySupportedDepth(uint8 depth) {
        require(address(verifiers[depth]) != address(0), "Semaphore: tree depth is not supported");
        _;
    }

    /// @dev Initializes the Semaphore verifiers used to verify the user's ZK proofs.
    /// @param _verifiers: List of Semaphore verifiers (address and related Merkle tree depth).
    constructor(Verifier[] memory _verifiers) {
        for (uint8 i = 0; i < _verifiers.length; i++) {
            verifiers[_verifiers[i].merkleTreeDepth] = IVerifier(_verifiers[i].contractAddress);
        }
    }

    /// @dev See {ISemaphore-createGroup}.
    //Add only Contract Owner
    //Add can Propose/Vote Feature
    //

    mapping(uint256 => bool) public canGroupPropose;
    mapping(uint256 => bool) public canGroupAddData; 
    uint256 groupCounter;
    function createGroup(
        uint8 depth,
        uint256 zeroValue,
        address admin,

        bool canPropose,
        bool canAddData

    ) external onlySupportedDepth(depth) {
        groupCounter++;
        _createGroup(groupCounter, depth, zeroValue);
        groupAdmins[groupCounter] = admin;

        canGroupPropose[groupCounter] = canPropose;
        canGroupAddData[groupCounter] = canAddData;
        // emit GroupAdminUpdated(groupCounter, address(0), admin);
    }

    /// @dev See {ISemaphore-updateGroupAdmin}.
    // function updateGroupAdmin(uint256 groupId, address newAdmin) external onlyCoordinator(groupId) {
    //     groupAdmins[groupId] = newAdmin;

    //     // emit GroupAdminUpdated(_groupId, _msgSender(), newAdmin);
    // }


    //Add Mapping member => groups[];
    mapping(uint256 => uint256[]) public groupMembership;

    /// @dev See {ISemaphore-addMember}.
    function addMember(uint256 groupId, uint256 identityCommitment) external onlyCoordinator(groupId) {
        //check if Already a member
        _addMember(groupId, identityCommitment);
        groupMembership[identityCommitment].push(groupId);

    }

    /// @dev See {ISemaphore-removeMember}.
    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) external onlyCoordinator(groupId) {
        _removeMember(groupId, identityCommitment, proofSiblings, proofPathIndices);
        //----How to Remove membership?
        groupMembership[identityCommitment].push(groupId);

    }

    /// @dev See {ISemaphore-verifyProof}.
    // function verifyProof(
    //     uint256 groupId,
    //     bytes32 signal,
    //     uint256 nullifierHash,
    //     uint256 externalNullifier,
    //     uint256[8] calldata proof
    // ) external override {
    //     uint256 root = getRoot(groupId);
    //     uint8 depth = getDepth(groupId);

    //     require(depth != 0, "Semaphore: group does not exist");

    //     IVerifier verifier = verifiers[depth];

    //     _verifyProof(signal, root, nullifierHash, externalNullifier, proof, verifier);

    //     _saveNullifierHash(nullifierHash);

    //     emit ProofVerified(groupId, signal);
    // }
    //Voting Functions
    //Add if creator is part of a group that create Proposals

    struct Proposal {
        address coordinator;
        // string question;
        uint yesCount;
        uint noCount;
        uint StartDate;
        uint EndDate;
        string IpfsURI;
        // mapping (address => VoteStates) voteStates;
    }
    mapping(uint256 => Proposal) public ProposalList;
    uint256 public proposalCounter;



    function createProposal(
        address coordinator,

        uint StartDate,
        uint EndDate,
        string memory proposalURI,


        uint256 groupId,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof

    ) public {
        // require(address(verifiers[depth]) != address(0), "SemaphoreVoting: depth value is not supported");

        uint256 root = getRoot(groupId);
        uint8 depth = getDepth(groupId);

        require(depth != 0, "Semaphore: group does not exist");

        IVerifier verifier = verifiers[depth];

        _verifyProof(signal, root, nullifierHash, externalNullifier, proof, verifier);

        _saveNullifierHash(nullifierHash);


        //2. Create Proposal
        proposalCounter++;

        ProposalList[proposalCounter] = Proposal(coordinator,0,0,StartDate,EndDate,proposalURI);


        //----Adjust Emit
        // emit PollCreated(pollId, coordinator);
    }

 

    // /// @dev See {ISemaphoreVoting-addVoter}.
    // function startPoll(uint256 pollId, uint256 encryptionKey) public override onlyCoordinator(pollId) {
    //     require(polls[pollId].state == PollState.Created, "SemaphoreVoting: poll has already been started");

    //     polls[pollId].state = PollState.Ongoing;

    //     emit PollStarted(pollId, _msgSender(), encryptionKey);
    // }

    /// @dev See {ISemaphoreVoting-castVote}.
    // Add if voter is from a group that can cast a vote
    function castVote(
        bytes32 vote,
        uint256 nullifierHash,
        uint256 pollId,
        uint256[8] calldata proof,

        uint256 groupId

    ) public onlyCoordinator(pollId) {
        //require that Proposal Exists    
        //require if ProposalList[proposalId] > Start Date
        //require if ProposalList[proposalId] > End Date

        //Check if group can vote

        uint256 root = getRoot(groupId);
        uint8 depth = getDepth(groupId);
        require(depth != 0, "Semaphore: group does not exist");

        IVerifier verifier = verifiers[depth];



        //Verify if member is part of a group -- ExternalNullifier needs to be poolID
        // verifyProof(groupId, vote, nullifierHash, pollId, proof);
        _verifyProof(vote, root, nullifierHash, pollId, proof, verifier);

        _saveNullifierHash(nullifierHash);



        if(vote == bytes32("yes")){
            ProposalList[pollId].yesCount++;
        } else if(vote == bytes32("no")) {
            ProposalList[pollId].noCount++;
        }

        //---Adjust Emit
        // emit VoteAdded(pollId, vote);
    }

    //----Data Functions

    uint256 public dataFileCounter;

     struct dataStructure {
        address coordinator;
        // string question;
        uint yesCount;
        uint noCount;
        uint StartDate;
        uint EndDate;
        string IpfsURI;
        // mapping (address => VoteStates) voteStates;
    }


    // function addData(
    //     address coordinator,

    //     uint StartDate,
    //     uint EndDate,
    //     string proposalURI,


    //     uint256 groupId,
    //     bytes32 signal,
    //     uint256 nullifierHash,
    //     uint256 externalNullifier,
    //     uint256[8] calldata proof

    // ) public override {
    //     // require(address(verifiers[depth]) != address(0), "SemaphoreVoting: depth value is not supported");

    //     //1. Verify if user can create proposal

    //     _verifyProof(vote, root, nullifierHash, pollId, proof, verifier);
    //     //2. Create Proposal
    //     dataFileCounter++;
    //     //Add to Data Struct
        
    //     // ProposalList[proposalCounter] = Proposal(coordinator,0,0,StartDate,EndDate,proposalURI)


    //     // _createGroup(pollId, depth, 0);

    //     // Poll memory poll;

    //     // poll.coordinator = coordinator;

    //     // polls[pollId] = poll;


    //     //----Adjust Emit
    //     // emit PollCreated(pollId, coordinator);
    // }

 

    // // /// @dev See {ISemaphoreVoting-addVoter}.
    // // function startPoll(uint256 pollId, uint256 encryptionKey) public override onlyCoordinator(pollId) {
    // //     require(polls[pollId].state == PollState.Created, "SemaphoreVoting: poll has already been started");

    // //     polls[pollId].state = PollState.Ongoing;

    // //     emit PollStarted(pollId, _msgSender(), encryptionKey);
    // // }

    // /// @dev See {ISemaphoreVoting-castVote}.
    // // Add if voter is from a group that can cast a vote
    // function downloadData(
    //     bool vote,
    //     uint256 nullifierHash,
    //     uint256 pollId,
    //     uint256[8] calldata proof,

    //     uint256 groupId

    // ) public override onlyCoordinator(pollId) {
    //     //require that Proposal Exists    
    //     //require if ProposalList[proposalId] > Start Date
    //     //require if ProposalList[proposalId] > End Date

    //     //Check if group can vote

    //     uint256 root = getRoot(pollId);
    //     uint8 depth = getDepth(pollId);
    //     IVerifier verifier = verifiers[depth];



    //     //Verify if member is part of a group -- ExternalNullifier needs to be poolID
    //     // verifyProof(vote, root, nullifierHash, pollId, proof, verifier);
    //     // verifyProof(groupId, vote, nullifierHash, pollId, proof);


    //     if(vote){
    //         //if vote = true, add Yes Vote
    //     } else {
    //         //else if vote == false , add No Vote
    //     }

    //     //---Adjust Emit
    //     // emit VoteAdded(pollId, vote);
    // }

      modifier onlyCoordinator(uint256 pollId) {
        require(  ProposalList[pollId].coordinator == _msgSender(), "SemaphoreVoting: caller is not the poll coordinator");
        _;
    }






}