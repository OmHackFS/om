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
import backEnd from "../backend/OmData";

// console.log(nftStorage.NFTStorage)
// import * as ipfsCar from 'ipfs-car/pack';
// import {IPFS} from 'ipfs';
// import * as fs from 'fs';

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

const sbContractAddr = "0xDAA40151080Be453A9918dc9CcE4BC3160f892CE";

export const SendTransactionBody = ({
  group,
  title,
  startDate,
  endDate,
  description,
  fundRequest,
  fileInput,
  linkInput,
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
  }, [library]);

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
    });

    setCreating(false);
    setProposalUri(newProposalUri);
    console.log("proposalUri ", proposalUri);
  };

  const handleEncryptData = async (e: any) => {
    e.preventDefault();

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account1 = accounts[0];

    const newId = new Identity();
    const IdTrapdoor = newId.getTrapdoor();
    const IdNullifer = newId.getNullifier();
    const IdCommitment = newId.generateCommitment();

    const idData = {
      newId: newId.toString(),
      IdTrapdoor: IdTrapdoor.toString(),
      IdNullifer: IdNullifer.toString(),
      IdCommitment: IdCommitment.toString(),
    };

    const stringIdData = JSON.stringify(idData);

    const encryptionPublicKey = await (window as any).ethereum.request({
      method: "eth_getEncryptionPublicKey",
      params: [account1],
    });

    const newEncryptedIdData = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: encryptionPublicKey,
            data: stringIdData,
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    setEncryptedIdData(newEncryptedIdData as any);
    console.log("Encrypted Data Hash");
    console.log(newEncryptedIdData);
    console.log("Encrypted Data Id");
    console.log(stringIdData);
  };

  //   const storeNftStorageToken = async () => {
  //     console.log("nftStorage ");

  //     const NFT_STORAGE_TOKEN =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzZDg1OTczYUU3ZTI1RTdlMTNEZEUwZDhmQzIwMzgwQTQ0NDc4NUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzU4Mzg2OTU5MywibmFtZSI6IkhhY2tGUyJ9.ldx5AlCgYy2cGrgXOpTPVd2xA68SHcU4_of9MsNmEIw";
  //     const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  //     const IPFSdata = new Blob([encryptedIdTrapdoor as any]);
  //     const cid = await client.storeBlob(IPFSdata);

  //     const dataFromIPFS = await fetch(`https://ipfs.io/ipfs/${cid}`);

  //     console.log("IPFS Address");
  //     console.log(cid);
  //     console.log(idTrapdoor);
  //     console.log(encryptedIdTrapdoor);

  //     console.log("Data Fetched from IPFS");
  //     console.log(dataFromIPFS);
  //   }

  async function connectWallet() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    setSigner(address);
  }
  console.log("context ", context);
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
            Create Proposal
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
