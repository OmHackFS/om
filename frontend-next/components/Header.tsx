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
import { CreateIdentityButton } from "./CreateIdentityButton";
import { sbContractAddr } from "../contract-addresses/index";
import OmSbToken from "../artifacts/contracts/OmSbToken.sol/OmSbToken.json";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { Provider } from "../utils/provider";
import { injected } from "../utils/connectors";

export const Header = () => {
  const context = useWeb3React<Provider>();
  const { activate, active, account, library } = context;

  const [showDropdown, setShowDropdown] = useState(false);
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

    console.log("account ", account);

    account &&
      OmSbTokenContract.connect(signer as any)
        .balanceOf(account)
        .then((tokenId: any) => {
          setTokenId(tokenId.toNumber());
        });
    // console.log("sbToken ", sbToken);
  }, [library]);

  const handleToggleDropdown = () => setShowDropdown((show) => !show);

  return (
    <div className="flex-1 px-4 flex justify-between">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label className="sr-only">Search</label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              {/* <!-- Heroicon name: solid/search --> */}
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search-field"
              className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6 gap-4">
        {/* <CreateIdentityButton /> */}
        <p>Address: {signerAddr}</p>
        Soulbound TokenID: {tokenId}
        <button
          type="button"
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">View notifications</span>
          {/* <!-- Heroicon name: outline/bell --> */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        {/* <!-- Profile dropdown --> */}
        <div className="ml-3 relative">
          <div>
            <button
              type="button"
              onClick={handleToggleDropdown}
              className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>

          {/* <!--
                    Dropdown menu, show/hide based on menu state.
      
                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  --> */}
          {showDropdown ? (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
              >
                Your Profile
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-1"
              >
                Settings
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Sign out
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
