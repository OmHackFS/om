import { ethers } from "ethers";
import React from "react";
import { useState } from "react";
import { GenerateProofBody } from "./GenerateProofBody";

export const MultiStepForm = () => {
  const [formStep, setFormStep] = useState(0);

  const handleClickNext = (e: any) => {
    e.preventDefault();

    const nextStep = formStep + 1 > 2 ? 0 : formStep + 1;
    setFormStep(nextStep);
  };

  const handleClickBack = (e: any) => {
    e.preventDefault();

    const nextStep = formStep - 1 < 0 ? 2 : formStep - 1;
    setFormStep(nextStep);
  };

  const handleClickGenerateProof = (e: any) => {
    e.preventDefault();
  };

  function sendProposal(){
    const accounts = "Get Account"
    const account = ""
    const contractAddress = "0x9aeece36a264e03c6906d543a1d9ca4fed1418e0"
    const contractABI = "";

    const contract = new ethers.Contract(contractABI,contractAddress,account);

  }

  return (
    <div>
      <body>
        <div className="mt-8">
          <h2
            className="
          mb-4
          text-2xl
          font-bold
          text-center text-gray-800
          lg:text-3xl
          md:mb-6
        "
          >
            Verifying Membership
          </h2>

          <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
            Through the Zero Knowladge Verification your Identity will stay
            Private
          </p>
        </div>
        <div className="text-gray-600">
          <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto">
            <div className="flex flex-col w-full text-center">
              <div className=" bg-white ">
                <div className="mx-auto max-w-screen-2xl md:px-8">
                  <form className="max-w-screen-md mx-auto">
                    <section>
                      <div className="flex flex-wrap mx-auto mb-5">
                        <a
                          className={`${
                            formStep === 0
                              ? "text-indigo-500 bg-gray-100 border-indigo-500"
                              : ""
                          }
                            inline-flex
                            items-center
                            justify-center
                            w-1/2
                            py-3
                            font-medium
                            leading-none
                            tracking-wider
                            
                            border-b-2 
                            rounded-t
                            sm:px-6 sm:w-auto sm:justify-start
                            title-font
                            `}
                        >
                          1. Generate Proof
                        </a>

                        <a
                          className={`${
                            formStep === 1
                              ? "text-indigo-500 bg-gray-100 border-indigo-500"
                              : ""
                          }
                            inline-flex
                            items-center
                            justify-center
                            w-1/2
                            py-3
                            font-medium
                            leading-none
                            tracking-wider
                            
                            border-b-2 
                            rounded-t
                            sm:px-6 sm:w-auto sm:justify-start
                            title-font
                            `}
                        >
                          2. Select Wallet
                        </a>
                        <a
                          className={`${
                            formStep === 2
                              ? "text-indigo-500 bg-gray-100 border-indigo-500"
                              : ""
                          }
                            inline-flex
                            items-center
                            justify-center
                            w-1/2
                            py-3
                            font-medium
                            leading-none
                            tracking-wider
                            
                            border-b-2 
                            rounded-t
                            sm:px-6 sm:w-auto sm:justify-start
                            title-font
                            `}
                        >
                          3. Send Transaction
                        </a>
                      </div>

                      </section>
                      <button onClick={sendProposal}>Send Proposal Tx</button>

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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Back
                      </button>
                      <button
                        className="
                      px-6
                      py-2
                      text-sm text-white
                      bg-indigo-500
                      rounded-lg
                      outline-none
                      hover:bg-indigo-600
                      ring-indigo-300
                    "
                        onClick={handleClickNext}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};
