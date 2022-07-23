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

// console.log(nftStorage.NFTStorage)
// import * as ipfsCar from 'ipfs-car/pack';
// import {IPFS} from 'ipfs';
// import * as fs from 'fs';

import { sbContractAddr } from "../contracts";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

export const CreateIdentityScreen = () => {
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

    // console.log("sbToken ", sbToken);
  }, [library]);

  const handleCreateIdentity = async (e: any) => {
    e.preventDefault();

    setCreating(true);
    const newId = new Identity();
    const IdTrapdoor = newId.getTrapdoor();
    const IdNullifer = newId.getNullifier();
    const IdCommitment = newId.generateCommitment();

    const encryptionPublicKey = await (window as any).ethereum
      .request({
        method: "eth_getEncryptionPublicKey",
        params: [account],
      })
      .catch((e: any) => {
        setCreating(false);
      });

    console.log("encryptionPublicKey ", encryptionPublicKey, account);

    if (!encryptionPublicKey) return;

    const newEncryptedId = ethUtil.bufferToHex(
      Buffer.from(
        JSON.stringify(
          sigUtil.encrypt({
            publicKey: encryptionPublicKey,
            data: newId.toString(),
            version: "x25519-xsalsa20-poly1305",
          })
        ),
        "utf8"
      )
    );

    console.log("newEncryptedId ", newEncryptedId);

    const mintedTokenTx = await OmSbTokenContract.connect(
      signer as any
    ).safeMint(account, newEncryptedId);

    console.log("minting token...");

    await mintedTokenTx.wait();

    setCreating(false);

    const getTokenTx = await OmSbTokenContract.connect(signer as any).balanceOf(
      account
    );

    console.log("getting token...");

    console.log("mintedToken ", getTokenTx.toString());

    //Update Front End
  };

  console.log("tokenId ", tokenId);

  const hasSbToken = !!tokenId && tokenId !== 0;

  return (
    <div className="flex items-center justify-center flex-1">
      {!hasSbToken && active ? (
        <button
          onClick={handleCreateIdentity}
          className="h-16 w-64 inline-flex
              items-center
            px-6
            py-2
            text-sm text-white
            bg-indigo-500
            rounded-lg
            outline-none
            hover:bg-indigo-600
            ring-indigo-300
            gap-x-2"
        >
          {!creating ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          ) : null}
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
          <p className="flex-1">Create Identity</p>
        </button>
      ) : null}
      {hasSbToken ? (
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
          Soulbound tokenId: {tokenId}
        </div>
      ) : null}
      {!active ? (
        <div className="h-16 items-center inline-flex mt-2 justify-center rounded-md border border-transparent bg-gray-100 px-3 py-2 text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Please connect your wallet
        </div>
      ) : null}
    </div>
  );
};
