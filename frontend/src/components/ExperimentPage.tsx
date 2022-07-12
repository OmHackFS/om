import React from "react";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import {ethers} from "ethers";
import { Identity } from "@semaphore-protocol/identity";


export const ExperimentPage = () => {

  
        interface window {
          ethereum: any;
        }
  

    async function consoleDate(){
        const { ethereum } = window;
        const accounts = await ethereum.request(({ method: 'eth_requestAccounts'}));
        const address = accounts[0];
        
        const identity = new Identity();

        console.log(ethereum);
        console.log(address);
        console.log(identity);

    }


  return (
    <div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            {/* <!-- Heroicon name: outline/menu-alt-2 --> */}
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <Header />
        </div>

        <main>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Main
              </h1>
            </div>
            <SubHeader />
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* <!-- Replace with your content --> */}
              <button
              type="button"
              className="m-20 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={consoleDate}
            >
              Console Log Data
            </button>
            <button
              type="button"
              className="m-20 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Generate Identity
            </button>

              {/* <!-- /End replace --> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
