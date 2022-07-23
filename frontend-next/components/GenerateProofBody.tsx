import { useMemo, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import * as ethUtil from "ethereumjs-util";
import * as sigUtil from "@metamask/eth-sig-util";
// const { Blob } =  require('nft.storage');
// import * as nftStorage from "nft.storage";
import { ethers, Signer } from "ethers";
import OmSbToken from "../artifacts/contracts/OmSbToken.sol/OmSbToken.json";

const semaphoreProof = require("@semaphore-protocol/proof");
const { verifyProof } = require("@semaphore-protocol/proof");
// const omContractAbi = require("./utils/OmContract.json").abi;
const sbContractAbi =
  require("../artifacts/contracts/OmSbToken.sol/OmSbToken.json").abi;
import { sbContractAddr } from "../contracts";
import backEnd from "../backend/OmData";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

const depth = 20;
const admin = "0xd770134156f9aB742fDB4561A684187f733A9586";
const signal = "proposal_1";
const signalBytes32 = ethers.utils.formatBytes32String(signal);
const groupId = 7579;
let zeroValue = 0;
const { generateProof, packToSolidityProof } = semaphoreProof;

export const GenerateProofBody = ({ group }: any) => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
  const [encryptedIdTrapdoor, setEncryptedIdTrapdoor] = useState();
  const [idTrapdoor, setIdTrapdoor] = useState();
  const [creating, setCreating] = useState(false);
  const [tokenId, setTokenId] = useState();

  const OmSbTokenContract = useMemo(() => {
    return new ethers.Contract(sbContractAddr, OmSbToken.abi, signer);
  }, [signer]);

  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    const signer = library.getSigner();
    setSigner(signer);
    signer.getAddress().then(setSignerAddr);

    account &&
      OmSbTokenContract.connect(signer as any)
        .balanceOf(account)
        .then((tokenId: any) => {
          setTokenId(tokenId.toNumber());
        });
  }, [library]);

  const [identity, setIdentity] = useState<any>();
  const [trapdoor, setTrapdoor] = useState<bigint>();
  const [nullifier, setNullifier] = useState<bigint>();
  const [identityCommitment, setIdentityCommitment] = useState<bigint>();
  const [groupMembers, setGroupMembers] = useState<any>();

  const [group1, setGroup1] = useState<any>();
  const [group2, setGroup2] = useState<any>();

  const [group1Proof, setGroup1Proof] = useState("");
  const [group1Status, setGroup1Status] = useState("");

  const [group1ExternalNullifier, setGroup1ExternalNullifier] = useState("");
  const [group1NullifierHash, setGroup1NullifierHash] = useState<any>();
  const [group1SolidityProof, setGroup1SolidityProof] = useState("");
  const [offChainVerification, setOffChainVerification] = useState<any>(false);
  const [generatingProof, setGeneratingProof] = useState<boolean>(false);

  const handleClickGenerateProof = async (e: any) => {
    e.preventDefault();
    //Before Generating the Proof we need to get All the Group members
    const members = await backEnd.getMembersAddedByGroup(group);
    setGroupMembers(members);
    const newGroup = new Group();
    for (let i = 0 as any; i < members.length; i++) {
      console.log(`--------Member ${i}`);
      // console.log(members[i].identityCommitment);
      // newGroup.addMember(members[i].identityCommitment);
    }

    await setGroup1(newGroup);
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

    const idHash = await OmSbTokenContract.identityData(account);
    console.log("idHash ", idHash);

    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [idHash, account],
    });

    const jsonMessage = JSON.parse(decryptedMessage);
    console.log("jsonMessage ", jsonMessage);

    const retrievedIdentity = new Identity(decryptedMessage);
    const newTrapdoor = retrievedIdentity.getTrapdoor();
    const newNullifier = retrievedIdentity.getNullifier();
    const newIdentityCommitment = retrievedIdentity.generateCommitment();

    setTrapdoor(newTrapdoor);
    setNullifier(newNullifier);
    setIdentityCommitment(newIdentityCommitment);
    setIdentity(retrievedIdentity);
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

  const getMembers = async (e: any) => {
    e.preventDefault();
    const members = await backEnd.getMembersAddedByGroup(1);
    const members2 = await backEnd.getMembersAddedByGroup(2);

    // const jsonMembers = JSON.parse(members);
    console.log(members);
    console.log("Identity Length");
    console.log(members.length);
    // console.log("Member 0")
    // console.log(members[1].identityCommitment);
    // console.log("Identity Commitment")
    // console.log(jsonMembers);
    console.log("Group 2");
    console.log(members2);

    setGroupMembers(members);
  };

  const handleGenerateProof = async (e: any) => {
    e.preventDefault();

    setGeneratingProof(true);

    // 1. Decrypt ID
    const idHash = await OmSbTokenContract.identityData(account);
    console.log("idHash ", idHash);

    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [idHash, account],
    });

    const jsonMessage = JSON.parse(decryptedMessage);
    console.log("jsonMessage ", jsonMessage);

    const retrievedIdentity = new Identity(decryptedMessage);
    const newTrapdoor = retrievedIdentity.getTrapdoor();
    const newNullifier = retrievedIdentity.getNullifier();
    const newIdentityCommitment = retrievedIdentity.generateCommitment();

    // 2. Generate Proof
    const members = await backEnd.getMembersAddedByGroup(Number(group) || 1);
    // setGroupMembers(members);

    // creating new group and add members to the group
    const newGroup = new Group();
    for (let i = 0 as any; i < members.length; i++) {
      console.log(`--------Member ${i}`);
      console.log((members[i] as any).identityCommitment);
      newGroup.addMember((members[i] as any).identityCommitment);
    }

    newGroup.addMember(retrievedIdentity.generateCommitment());

    await setGroup1(newGroup);
    const externalNullifier = Math.floor(Math.random() * 1000000);

    const fullProof = await generateProof(
      retrievedIdentity as any,
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

    // 3. Verification
    console.log("Verification Called");

    const verificationKey = await fetch(
      "http://localhost:3000/semaphore.json"
    ).then(function (res) {
      return res.json();
    });

    const res = await verifyProof(verificationKey, fullProof); // true or false.
    const response = res.toString();
    console.log("Waiting Response");
    setOffChainVerification(response);

    setGeneratingProof(false);
    console.log("response ", response);
  };

  return (
    <div className="flex flex-col mb-1">
      <div className="max-w-lg overflow-x-auto mb-5">
        {!offChainVerification ? (
          <button
            onClick={handleGenerateProof}
            className="mt-5 px-6 py-4
                text-sm text-white
                bg-indigo-500
                rounded-lg
                outline-none
                hover:bg-indigo-600
                ring-indigo-300 inline-flex"
          >
            {generatingProof ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Generate Proof & Verify DAO Membership
          </button>
        ) : null}
        {offChainVerification ? (
          <div className="h-16 items-center inline-flex mt-2 justify-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            DAO membership verified
          </div>
        ) : null}
        {/* <div>Trapdoor: </div>
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
      </button> */}
      </div>
    </div>
  );
};
