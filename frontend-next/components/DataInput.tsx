import { ProofModalAddData } from "./ProofModalAddData";
import { useState } from "react";

export const DataInput = () => {
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [dataTitleInput, setDataTitleInput] = useState<any>();
  const [dataSubTitleInput,setDataSubTitleInput] = useState<any>();
  const [dataDescriptionInput,setDataDescriptionInput] = useState<any>();
  const [dataSizeInput, setDataSizeInput] = useState<any>();
  const [authorNameInput,setAuthorNameInput] = useState<any>();
  const [authorContactInput,setAuthorContactInput] = useState<any>();

  const [group,setGroup] = useState<any>();

  const handleShowProposalModal = () => setShowProposalModal(true);
    return (
      <div className="space-y-6">
       
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Proposal Information</h3>
              <p className="mt-1 text-sm text-gray-500">Add all the informations you need for the Proposal</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">

                 <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Data Title
                    </label>
                    <input
                      type="text"
                      name="proposal-title"
                      id="proposal-title"
                      autoComplete="proposal"
                      onChange={(e) => setDataTitleInput(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pt-5"
                    />
                   </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Data Size
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      onChange={(e) => setDataSizeInput(e.target.value)}
                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
  
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Data Version
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"

                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  
  
                
                  <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Data Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="proposal-description"
                      name="proposal-description"
                      rows={3}
                      className="text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md pt-20 pb-20 align-center"
                      placeholder="Proposal Information"
                      onChange={(e) => setDataDescriptionInput(e.target.value)}

                      defaultValue={''}
                    />
                  </div>
                </div>
  
             
                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Author Name
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      onChange={(e) => setAuthorNameInput(e.target.value)}

                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Author Contact
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      onChange={(e) => setAuthorContactInput(e.target.value)}
                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Upload a File</label>
                  <div className="w-full mt-1 flex justify-center p-20 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center w-full">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 w-full">
                        <label
                          htmlFor="file-upload"
                          className="w-full relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload Files</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
  
      
  
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Proposal Details</h3>
              <p className="mt-1 text-sm text-gray-500">Decide which communications you'd like to receive and how.</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <fieldset>
                  <legend className="contents text-base font-medium text-gray-900">Select Group.</legend>
                  <p className="text-sm text-gray-500">If private, select from which Sub-Group you would like to propose from.</p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                        Group 1
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                        Group 2
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                        Group 3
                      </label>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
  
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleShowProposalModal}
          >
            Add Data
          </button>
        </div>
        {showProposalModal ? <ProofModalAddData /> : null}
      </div>
    )
  }