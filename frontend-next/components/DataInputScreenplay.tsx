import { ProofModal } from "./ProofModal";
import { useState } from "react";
import  backEnd  from "../backend/OmData"

export const DataInputScreenplay = () => {

  // const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  // const handleShowProposalModal = () => setShowProposalModal(true);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [fileForUpload, setFileForUpload] = useState<string>("");


  async function handleSubmit() {
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("imageUri", imageUri);
    data.append("description", description);
    data.append('file', fileForUpload);    
    const response = backEnd.addScreenplay(window, "prover id", "here's the proof", data);
    console.log(response);
    // Clear form fields
    setTitle("");
    setAuthor("");
    setDescription("");
    setImageUri("");
    setFileForUpload("");
  } 
  
    return (
      <div className="space-y-6">
       
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Screenplay Information</h3>
              <p className="mt-1 text-sm text-gray-500">Please provide details about the screenplay</p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">

                 <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autoComplete="title"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pt-5"
                    />
                   </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                     Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      autoComplete="author"
                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>    
                
                  <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md pt-20 pb-20 align-center"
                      placeholder="Screenplay Information"
                      defaultValue={''}
                    />
                  </div>
                </div>  
             
                  <div className="col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUri"
                      id="imageUri"
                      autoComplete="imageUri"
                      className="pt-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>                 

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Upload Screenplay Document</label>
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
                        Sub-Group 1
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
                        Sub-Group 2
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
                        Sub-Group 3
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
            onClick={handleSubmit}
          >
            Add Screenplay
          </button>
        </div>
        {/* {showProposalModal ? <ProofModal /> : null} */}
      </div>
    )
  }