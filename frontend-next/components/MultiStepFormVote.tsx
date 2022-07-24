import React from "react";
import { useState } from "react";
import { GenerateProofForVote } from "./GenerateProofForVote";
import { SelectWalletBody } from "./SelectWalletBody";
import { SendTransactionBody } from "./SendTransactionBody";
import { SendTransactionAddData } from "./SendTransactionAddData";
import { ethers } from "ethers";
import { SendTransactionVote } from "./SendTransactionVote";

export const MultiStepFormVote = ({
  voteSelected,
  proposalId,
  onClose,
}: any) => {
  const [formStep, setFormStep] = useState(0);
  const [proof, setProof] = useState();
  const [nullifierHash, setNullifierHash] = useState();
  const [externalNullifier, setExternalNullifier] = useState();
  const [root, setRoot] = useState();
  const signal = "proposals";
  const bytes32signal = ethers.utils.formatBytes32String(signal);

  const handleClickNext = (e: any) => {
    e.preventDefault();

    const nextStep = formStep + 1;

    if (nextStep > 2) {
      onClose();
      return;
    }

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

  const onGenerateProof = () => {};

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
            {formStep === 0 ? "Verifying Membership" : null}
            {formStep === 1 ? "Selecting Wallet" : null}
            {formStep === 2 ? "Casting Vote" : null}
          </h2>

          <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
            Through the Zero Knowledge Verification your Identity will stay
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
                          onClick={() => setFormStep(0)}
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
                          onClick={() => setFormStep(1)}
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
                          onClick={() => setFormStep(2)}
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

                      <div className="h-72 flex items-center justify-center">
                        {formStep === 0 ? (
                          <GenerateProofForVote
                            // group={group}
                            setProof={setProof}
                            setNullifierHash={setNullifierHash}
                            setExternalNullifier={setExternalNullifier}
                            signal={signal}
                            setRoot={setRoot}
                            proposalId={proposalId}
                          />
                        ) : null}
                        {formStep === 1 ? <SelectWalletBody /> : null}
                        {formStep === 2 ? (
                          <SendTransactionVote
                            proof={proof}
                            nullifierHash={nullifierHash}
                            externalNullifier={externalNullifier}
                            root={root}
                            bytes32signal={bytes32signal}
                            voteSelected={voteSelected}
                            proposalId={proposalId}
                          />
                        ) : null}
                      </div>
                    </section>

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
                        className="
                        inline-flex
                        items-center
                      px-6
                      py-2
                      text-sm text-white
                      bg-indigo-500
                      rounded-lg
                      outline-none
                      hover:bg-indigo-600
                      ring-indigo-300
                      gap-x-1
                    "
                        onClick={handleClickNext}
                      >
                        {formStep === 2 ? "Finish" : "Next"}
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
