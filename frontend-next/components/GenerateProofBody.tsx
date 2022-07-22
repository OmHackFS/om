import { useState } from "react";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
const semaphoreProof = require("@semaphore-protocol/proof");
const { verifyProof } = require("@semaphore-protocol/proof")
import ethUtil from "ethereumjs-util";
import sigUtil from "@metamask/eth-sig-util";
import { ethers } from "ethers";
const omContractAbi = require("./utils/OmContract.json").abi

const depth = 20;
const admin = "0xd770134156f9aB742fDB4561A684187f733A9586";
const signal = "proposal_1";
const signalBytes32 = ethers.utils.formatBytes32String(signal);
const groupId = 7579;
let zeroValue = 0;
const { generateProof, packToSolidityProof } = semaphoreProof;

export const GenerateProofBody = () => {
  const [identity, setIdentity] = useState<any>();
  const [trapdoor, setTrapdoor] = useState<bigint>();
  const [nullifier, setNullifier] = useState<bigint>();
  const [identityCommitment, setIdentityCommitment] = useState<bigint>();

  const [group1, setGroup1] = useState<any>();
  const [group2, setGroup2] = useState<any>();

  const [group1Proof, setGroup1Proof] = useState("");
  const [group1Status, setGroup1Status] = useState("");

  const [group1ExternalNullifier, setGroup1ExternalNullifier] = useState("");
  const [group1NullifierHash, setGroup1NullifierHash] = useState<any>();
  const [group1SolidityProof, setGroup1SolidityProof] = useState("");

  const [offChainVerification,setOffChainVerification] =useState<any>();

  const handleClickGenerateProof = async (e: any) => {
    e.preventDefault();


    const idCommitment = identity.generateCommitment();
    const newGroup = new Group();
    newGroup.addMember(idCommitment);

    await setGroup1(newGroup);
    console.log(newGroup);
    await setGroup1Status("Created!");
    // const externalNullifier = parseInt(Math.random()*(1000000));
    const externalNullifier = 2;


    const fullProof = await generateProof(
      identity as any,
      newGroup as any,
      externalNullifier,
      signal,
      {
        zkeyFilePath:
          "http://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey",
        wasmFilePath:
          "http://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm",
      }
    );

    const { nullifierHash } = fullProof.publicSignals
    const solidityProof = packToSolidityProof(fullProof.proof);
    console.log("Proof");
    console.log(fullProof.proof)
    console.log("solidityProof");
    console.log(solidityProof)

    setGroup1Proof(fullProof as any);
    setGroup1NullifierHash(nullifierHash);
    setGroup1SolidityProof(solidityProof as any);
    setGroup1ExternalNullifier(externalNullifier as any);
  };

  const handleDecryptId = async (e:any) => {
    e.preventDefault();
    const accounts = await (window as any).ethereum.request({
      method:'eth_requestAccounts',
    });

    const account = accounts[0];
    const signer =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()
    const contractAddress = "0x2F67c135Dac3F28f4f65Ee57913CAb0A5cd00D14";
    const sbContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"identityData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"_identityData","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  
    const contract = new ethers.Contract(contractAddress,sbContractAbi,signer);
    const idHash = await contract.identityData(1);
    console.log(idHash);

    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [idHash, account],
    });

    const jsonMessage = JSON.parse(decryptedMessage);
    console.log(jsonMessage)
    
    console.log(jsonMessage.newId);

    const idClass = new Identity(jsonMessage.newId);
    const newTrapdoor = idClass.getTrapdoor();
    const newNullifier = idClass.getNullifier();
    const newIdentityCommitment = idClass.generateCommitment();

    // setIdentity(newIdentity);
    setTrapdoor(newTrapdoor);
    setNullifier(newNullifier);
    setIdentityCommitment(newIdentityCommitment);


    setIdentity(idClass);
    console.log(idClass)



  }

  const handleVerifyProofOffChain = async (e:any) =>{
      e.preventDefault();
      console.log("Verification Called")

   

      const externalNullifier = group1.root;
      const signal = "Hello Zk"

      const fullProof = await generateProof(
        identity as any,
        group1 as any,
        externalNullifier,
        signal,
        {
          zkeyFilePath:
            "http://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey",
          wasmFilePath:
            "http://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm",
        }
      );

   
    const verificationKey = await fetch("http://localhost:3001/semaphore.json").then(function(res) {
      return res.json();
    });
    console.log("data fetched");
    console.log(verificationKey);

    // console.log("group1Proof");
    // console.log(group1Proof);

    const res = await verifyProof(verificationKey, fullProof) // true or false.
    const response = res.toString();
    console.log("Waiting Response")
    setOffChainVerification(response);

    console.log(response);

  }

  const handleVerifyProofOnChain = async (e:any) =>{
    e.preventDefault();
    console.log("On Chain Verification Called")

 

    const externalNullifier = group1.root;


    const omContractAddress="0xB726794A462d89b7B082249BF202F12b385470B3";
   
    const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();
    const omContract = new ethers.Contract(omContractAddress,omContractAbi,signer);
    // const signer2 =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()

    // const addMember = await omContract.addMember(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});


  const checkMembership = await omContract.verifyProof(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});
  const tx = await checkMembership.wait();



  console.log(tx);

  }

  const handleCreateProposalOnChain = async (e:any) =>{
  e.preventDefault();
  console.log("On Chain Verification Called")



  // const externalNullifier = group1.root;


  const omContractAddress="0xB726794A462d89b7B082249BF202F12b385470B3";
 
  const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();
  const omContract = new ethers.Contract(omContractAddress,omContractAbi,signer);
  // const signer2 =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()

  const coordinator = "0xd770134156f9aB742fDB4561A684187f733A9586";
  const title = "Second Proposal Alpha title";
  const description = "Second Proposal description"
  const startDate = 1000;
  const endDate = 2000;
  const proposalURI = "Second Proposal Alpha Test";
  const groupId = 1;
  const signalInBytes = signalBytes32;
  const nullifierHash= group1NullifierHash;
  const externalNullifier = group1ExternalNullifier;
  const solidityProof = group1SolidityProof;
// const checkMembership = await omContract.createProposal(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});
// const tx = await checkMembership.wait();

const addProposal = await omContract.createProposal(
  coordinator,
  title,
  description,
  startDate,
  endDate,
  proposalURI,
  groupId,
  signalInBytes,
  nullifierHash,
  externalNullifier,
  solidityProof,{gasLimit: 1500000});
const tx = await addProposal.wait();


console.log(tx);

  }

  const handleVoteOnChain = async (e:any) =>{
  e.preventDefault();
  console.log("On Chain Verification Called")



  // const externalNullifier = group1.root;


  const omContractAddress="0xB726794A462d89b7B082249BF202F12b385470B3";
  const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();
  const omContract = new ethers.Contract(omContractAddress,omContractAbi,signer);
  // const signer2 =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()


  const groupId = 1;
  const vote = false;
  const signalInBytes = signalBytes32;
  const nullifierHash= group1NullifierHash;
  const externalNullifier = group1ExternalNullifier;
  const solidityProof = group1SolidityProof;
  const signalVote = ethers.utils.formatBytes32String("yes");

// const checkMembership = await omContract.createProposal(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});
// const tx = await checkMembership.wait();

const castVote = await omContract.castVote(
  groupId,
  vote,
  nullifierHash,
  externalNullifier,
  signalInBytes,
  solidityProof,
  {gasLimit: 1500000});
  
const tx = await castVote.wait();


// groupId (uint256)
//   groupId (uint256)
// vote (bool)
//   vote (bool)
// nullifierHash (uint256)
//   nullifierHash (uint256)
// externalNullifierProposalId (uint256)
//   externalNullifierProposalId (uint256)
// signal (bytes32)
//   signal (bytes32)
// proof (uint256[8])


console.log(tx);

  }

  const handleAddDataOnChain = async (e:any) =>{
    e.preventDefault();
    console.log("On Chain Verification Called")
  
  
  
    // const externalNullifier = group1.root;
  
  
    const omContractAddress="0xB726794A462d89b7B082249BF202F12b385470B3";
  
    const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();
    const omContract = new ethers.Contract(omContractAddress,omContractAbi,signer);
    // const signer2 =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()
  
    const coordinator = "0xd770134156f9aB742fDB4561A684187f733A9586";
    const startDate = 1000;
    const endDate = 2000;
    const dataIpfsURI = "Data Alpha Test";
    const groupId = 1;
    const signalInBytes = signalBytes32;
    const nullifierHash= group1NullifierHash;
    const externalNullifier = group1ExternalNullifier;
    const solidityProof = group1SolidityProof;
  // const checkMembership = await omContract.createProposal(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});
  // const tx = await checkMembership.wait();
  
  const addData = await omContract.addData(dataIpfsURI,groupId,signalInBytes,nullifierHash,externalNullifier, solidityProof,{gasLimit: 1500000});
  const tx = await addData.wait();
  


  console.log(tx);

  }

  const handleReadDataOnChain = async (e:any) =>{
    e.preventDefault();
    console.log("On Chain Verification Called")
  
  
  
    // const externalNullifier = group1.root;
  
  
    const omContractAddress="0xB726794A462d89b7B082249BF202F12b385470B3";
  
    const signer=(new ethers.providers.Web3Provider((window as any).ethereum)).getSigner();
    const omContract = new ethers.Contract(omContractAddress,omContractAbi,signer);
    // const signer2 =  (new ethers.providers.Web3Provider((window as any).ethereum)).getSigner()
  
    const coordinator = "0xd770134156f9aB742fDB4561A684187f733A9586";
    const startDate = 1000;
    const endDate = 2000;
    const proposalURI = "Proposal Alpha Test";
    const groupId = 1;
    const signalInBytes = signalBytes32;
    const nullifierHash= group1NullifierHash;
    const externalNullifier = group1ExternalNullifier;
    const solidityProof = group1SolidityProof;
  // const checkMembership = await omContract.createProposal(1,signalBytes32,group1NullifierHash,group1ExternalNullifier,group1SolidityProof,{gasLimit: 1500000});
  // const tx = await checkMembership.wait();
  
  const readData = await omContract.accessData(groupId,signalInBytes,nullifierHash,externalNullifier,solidityProof,{gasLimit: 1500000});
  const tx = await readData.wait();
  
  
  console.log(tx);

  }

  

  return (
    <div className="flex flex-col mb-1">
      <div className="max-w-lg overflow-x-auto mb-5">
        <div>Trapdoor: </div>
        <p>{trapdoor?.toString()}</p>
        <div className="pt-2">Nullifier: </div>
        <p>{nullifier?.toString()}</p>
        <div className="pt-2">Identity Commitment: </div>
        <p className="pt-2 mb-5">{identityCommitment?.toString()}</p>
      </div>
      <button
        className="px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleDecryptId}
      >
        Decrypt Id
      </button>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleClickGenerateProof}
      >
        Generate Proof
      </button>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleVerifyProofOffChain}
      >
        Off Chain Verification
      </button>
      <p>{offChainVerification}</p>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleVerifyProofOnChain}
      >
        On Chain Verification
      </button>

      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleCreateProposalOnChain}
      >
        Create Proposal Transaction
      </button>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleVoteOnChain}
      >
         Vote Transaction
      </button>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleAddDataOnChain}
      >
        Add Data Transaction
      </button>
      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={handleReadDataOnChain}
      >
        Download Data Transaction
      </button>
    </div>
  );
};
