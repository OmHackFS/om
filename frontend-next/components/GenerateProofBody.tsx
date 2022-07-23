import { useState } from "react";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
const semaphoreProof = require("@semaphore-protocol/proof");
const { verifyProof } = require("@semaphore-protocol/proof");
import ethUtil from "ethereumjs-util";
import sigUtil from "@metamask/eth-sig-util";
import { ethers } from "ethers";
// const omContractAbi = require("./utils/OmContract.json").abi;
const sbContractAbi = require("../artifacts/contracts/OmSbToken.sol/OmSbToken.json").abi;
import  backEnd  from "../backend/OmData"


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
  const [groupMembers,setGroupMembers] = useState<any>();

  const [group1, setGroup1] = useState<any>();
  const [group2, setGroup2] = useState<any>();

  const [group1Proof, setGroup1Proof] = useState("");
  const [group1Status, setGroup1Status] = useState("");

  const [group1ExternalNullifier, setGroup1ExternalNullifier] = useState("");
  const [group1NullifierHash, setGroup1NullifierHash] = useState<any>();
  const [group1SolidityProof, setGroup1SolidityProof] = useState("");

  const [offChainVerification, setOffChainVerification] = useState<any>();

  const handleClickGenerateProof = async (e: any) => {
    e.preventDefault();
    //Before Generating the Proof we need to get All the Group members
    const members = await backEnd.getMembersAddedByGroup(1)
    setGroupMembers(members)
    const newGroup = new Group();
    for(let i=0 as any; i<members.length;i++){
      console.log(`--------Member ${i}`);
      console.log(members[i].identityCommitment);
      newGroup.addMember(members[i].identityCommitment);

    }
  

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

    const { nullifierHash } = fullProof.publicSignals;
    const solidityProof = packToSolidityProof(fullProof.proof);
    console.log("Proof");
    console.log(fullProof.proof);
    console.log("solidityProof");
    console.log(solidityProof);

    setGroup1Proof(fullProof as any);
    setGroup1NullifierHash(nullifierHash);
    setGroup1SolidityProof(solidityProof as any);
    setGroup1ExternalNullifier(externalNullifier as any);
  };

  const handleDecryptId = async (e: any) => {
    e.preventDefault();
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = accounts[0];
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
    const contractAddress = "0xeAA665d9Bb986B6BD0F1DA55Bfce0365d2cAb61F";

    const contract = new ethers.Contract(
      contractAddress,
      sbContractAbi,
      signer
    );
    const idHash = await contract.identityData(account);
    console.log(idHash);

    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [idHash, account],
    });

    const jsonMessage = JSON.parse(decryptedMessage);
    console.log(jsonMessage);

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
    console.log(idClass);
  };

  const handleVerifyProofOffChain = async (e: any) => {
    e.preventDefault();
    console.log("Verification Called");

    const externalNullifier = group1.root;
    const signal = "Hello Zk";

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

    const verificationKey = await fetch(
      "http://localhost:3000/semaphore.json"
    ).then(function (res) {
      return res.json();
    });
    console.log("data fetched");
    console.log(verificationKey);

    // console.log("group1Proof");
    // console.log(group1Proof);

    const res = await verifyProof(verificationKey, fullProof); // true or false.
    const response = res.toString();
    console.log("Waiting Response");
    setOffChainVerification(response);

    console.log(response);
  };

  
  const getMembers = async (e:any) => {
    e.preventDefault();
    const members = await backEnd.getMembersAddedByGroup(1)
    const members2 = await backEnd.getMembersAddedByGroup(2)

    // const jsonMembers = JSON.parse(members);
    console.log(members)
    console.log("Identity Length")
    console.log(members.length);
    // console.log("Member 0")
    // console.log(members[1].identityCommitment);
    // console.log("Identity Commitment")
    // console.log(jsonMembers);
    console.log("Group 2");
    console.log(members2);
  
    setGroupMembers(members)



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

      <button
        className="mt-5 px-6 py-2
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300
            "
        onClick={getMembers}
      >
        Get Members
      </button>
    
    </div>
  );
};
