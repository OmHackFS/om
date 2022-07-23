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
import Router from "next/router";
import type { NextPage } from "next";
import { ConnectWalletScreen } from "../components/ConnectWalletScreen";
import { CreateIdentityScreen } from "../components/CreateIdentityScreen";
import { sbContractAddr } from "../contracts";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

const Home: NextPage = () => {
  const [formStep, setFormStep] = useState(0);
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;
  const [signer, setSigner] = useState<Signer>();
  const [signerAddr, setSignerAddr] = useState<string | null>(null);
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

  const hasSbToken = !!tokenId && tokenId !== 0;

  console.log("hasSbToken ", hasSbToken);

  const handleClickNext = (e: any) => {
    e.preventDefault();

    const nextStep = formStep + 1 > 2 ? 0 : formStep + 1;

    if (!hasSbToken && nextStep === 2) return;

    setFormStep(nextStep);

    if (nextStep === 2) {
      Router.push("/home");
    }
  };

  const handleClickBack = (e: any) => {
    e.preventDefault();

    const nextStep = formStep - 1 < 0 ? 2 : formStep - 1;
    setFormStep(nextStep);
  };

  return (
    <div className="p-8 h-screen w-screen flex flex-col ">
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          <li className="md:flex-1">
            <a
              href="#"
              className={`${
                formStep === 0 ? "border-indigo-600" : ""
              } group pl-4 py-2 flex flex-col border-l-4 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
              onClick={() => setFormStep(0)}
            >
              <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                Step 1
              </span>
              <span className="text-sm font-medium">Connect wallet</span>
            </a>
          </li>

          <li className="md:flex-1">
            <a
              href="#"
              className={`${
                formStep === 1 ? "border-indigo-600" : ""
              } group pl-4 py-2 flex flex-col border-l-4 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
              aria-current="step"
              onClick={() => setFormStep(1)}
            >
              <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                Step 2
              </span>
              <span className="text-sm font-medium">Create identity</span>
            </a>
          </li>

          <li className="md:flex-1">
            <a
              href="#"
              className={`${formStep === 2 ? "border-indigo-600" : ""} ${
                hasSbToken
                  ? "hover:border-indigo-800"
                  : "opacity-50 cursor-not-allowed"
              } group pl-4 py-2 flex flex-col border-l-4  md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
              aria-current="step"
              onClick={() => {
                hasSbToken && setFormStep(2);
              }}
            >
              <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                Step 3
              </span>
              <span className="text-sm font-medium">Visit homepage</span>
            </a>
          </li>
        </ol>
      </nav>
      {formStep === 0 ? (
        <ConnectWalletScreen onConnect={handleClickNext} />
      ) : null}
      {formStep === 1 ? (
        <CreateIdentityScreen onMintSBToken={handleClickNext} />
      ) : null}
      {formStep === 2 ? (
        <div className="flex items-center justify-center flex-1 text-2xl">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 "
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
          <p>Redirecting to homepage...</p>
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <button
          className="
                      inline-flex
                      items-center
                      px-6
                      py-2
                      text-sm text-gray-800
                      rounded-lg
                      shadow
                      outline-none
                      gap-x-1
                      hover:bg-gray-100
                    "
          onClick={handleClickBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
        <button
          className={`${
            hasSbToken
              ? "hover:border-indigo-800"
              : "opacity-50 cursor-not-allowed"
          } inline-flex items-center
            px-6
            py-2
            text-sm text-white
            bg-indigo-500
            rounded-lg
            outline-none
            hover:bg-indigo-600
            ring-indigo-300
            gap-x-1
                    `}
          onClick={handleClickNext}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
