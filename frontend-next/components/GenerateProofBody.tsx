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
import { sbContractAddr } from "../contract-addresses";
import backEnd from "../backend/OmData";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";
import { ConnectWalletButton } from "./ConnectWalletButton";

const depth = 20;
const admin = "0xd770134156f9aB742fDB4561A684187f733A9586";
// const signal = "proposal_1";
// const signalBytes32 = ethers.utils.formatBytes32String(signal);
const groupId = 7579;
let zeroValue = 0;
const { generateProof, packToSolidityProof } = semaphoreProof;

export const GenerateProofBody = ({
  group,
  setProof,
  setNullifierHash,
  setExternalNullifier,
  setRoot,
  signal,
}: any) => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
  const [encryptedIdTrapdoor, setEncryptedIdTrapdoor] = useState();
  const [idTrapdoor, setIdTrapdoor] = useState();
  const [creating, setCreating] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [omSbTokenContract, setOmSbTokenContract] = useState<any>();

  useEffect(() => {
    connectWallet();
  }, []);

  const [offChainVerification, setOffChainVerification] = useState<any>(false);
  const [generatingProof, setGeneratingProof] = useState<boolean>(false);

  const handleGenerateProof = async (e: any) => {
    e.preventDefault();

    setGeneratingProof(true);

    async function _activate(activate: any): Promise<void> {
      await activate(injected);
    }

    await _activate(activate);

    // 1. Decrypt ID
    const idHash = await omSbTokenContract.identityData(account);
    // const idHash=100;
    console.log("id Hash called");
    const decryptedMessage = await (window as any).ethereum.request({
      method: "eth_decrypt",
      params: [idHash, account],
    });

    const retrievedIdentity = new Identity(decryptedMessage);
    const newIdentityCommitment = retrievedIdentity.generateCommitment();
    console.log(group);
    // 2. Generate Proof
    // const members = await backEnd.getMembersAddedByGroup(Number(group) || 1);
    // console.log(members);

    // creating new group and add members to the group

    const newGroup = new Group();
    // for (let i = 0 as any; i < members.length; i++) {
    //   console.log(`--------Member ${i}`);
    //   console.log((members[i] as any).identityCommitment);
    //   let bigIntMember = ((members[i] as any).identityCommitment);
    //   newGroup.addMember(bigIntMember);
    // }
    newGroup.addMember(newIdentityCommitment);

    const root = newGroup.root;

    console.log("Identity Commitment");
    console.log(newIdentityCommitment.toString());
    console.log("Root");
    console.log(root.toString());

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

    setNullifierHash(nullifierHash);
    setExternalNullifier(externalNullifier);
    setProof(solidityProof);
    setRoot(root);

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

  async function connectWallet() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
    const sbContractAddress = "0xF765822f3843a1d2c093B461318466e9fb60D2bA";
    const sbTokenContract = new ethers.Contract(
      sbContractAddress,
      OmSbToken.abi,
      signer
    );

    console.log(signer);
    console.log(sbTokenContract);
    setSigner(signer);
    setOmSbTokenContract(sbTokenContract);
  }

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
