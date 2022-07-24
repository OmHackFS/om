import { useMemo, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import Semaphore from "../pages/utils/Semaphore.json";
import * as ethUtil from "ethereumjs-util";
import * as sigUtil from "@metamask/eth-sig-util";
import { ethers, Signer } from "ethers";
import omToken from "./utils/OmContract.json";
import backEnd from "../backend/OmData";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

export const SendTransactionAddProposal = ({
  group,
  title,
  startDate,
  endDate,
  description,
  fundRequest,
  fileInput,
  linkInput,
  pictureUrl,
  proof,
  nullifierHash,
  externalNullifier,
  root,
  bytes32signal,
}: any) => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
  const [encryptedIdData, setEncryptedIdData] = useState();
  const [idData, setIdData] = useState();
  const [message, setMessage] = useState();
  const [creating, setCreating] = useState(false);
  const [proposalUri, setProposalUri] = useState<string | null>(null);
  const [contract, setContract] = useState<any>();

  useEffect((): void => {
    // if (!library) {
    //   setSigner(undefined);
    //   return;
    connectWallet();
  }, []);

  const handleCreateProposal = async (e: any) => {
    e.preventDefault();
    setCreating(true);

    const newProposalUri = await backEnd.addProposal({
      group,
      title,
      startDate: (startDate && startDate.getTime()) || Date.now(),
      endDate: (endDate && endDate.getTime()) || Date.now() + 86400000 * 3,
      description,
      fundRequest,
      linkInput,
      file: fileInput,
      pictureUrl,
      account,
    });

    const proposalTitle = title;
    const proposalDescription = description;
    const proposalRoot = root;
    const proposalStartDate = (startDate && startDate.getTime()) || Date.now();
    const proposalEndDate =
      (endDate && endDate.getTime()) || Date.now() + 86400000 * 3;
    const proposalUri = fileInput;
    const proposalGroupId = group;
    const proposalSignal = bytes32signal;
    const proposalNullifier = nullifierHash;
    const proposalExternalNullifier = externalNullifier;
    const proposalProof = proof;

    const createProposalTx = await contract.createProposal(
      proposalTitle,
      proposalDescription,
      proposalRoot,
      proposalStartDate,
      proposalEndDate,
      newProposalUri,
      proposalGroupId,
      proposalSignal,
      proposalNullifier,
      proposalExternalNullifier,
      proposalProof,
      { gasLimit: 1500000 }
    );
    const tx = await createProposalTx.wait();
    console.log(tx);

    setCreating(false);
    setProposalUri(newProposalUri);
  };

  function addMember() {}

  async function connectWallet() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();

    const omContractAddress = "0x560aBf82Eb1D8C86968f4314ff6a7770088f0728";

    const omContract = new ethers.Contract(
      omContractAddress,
      omToken.abi,
      signer
    );
    console.log(omContract);
    console.log(signer);
    setContract(omContract);
    setSigner(signer);
  }

  return (
    <>
      <div className="flex flex-col">
        {!proposalUri ? (
          <button
            onClick={handleCreateProposal}
            className="inline-flex mt-5 px-12 py-4
        text-sm text-white
        bg-indigo-500
        rounded-lg
        outline-none
        hover:bg-indigo-600
        ring-indigo-300 inline-flex"
          >
            {creating ? (
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
            {creating ? "Creating " : "Create "} Proposal
            {creating ? "..." : ""}
          </button>
        ) : null}
        {proposalUri ? (
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
            Proposal successfully created
            <p>Proposal URI: {proposalUri}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};
