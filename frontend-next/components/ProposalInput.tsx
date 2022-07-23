import { useState } from "react";
import { ProofModalProposal } from "./ProofModalProposal";
import { DatePicker } from "./DatePicker";
import backEnd from "../backend/OmData";

export const ProposalInput = () => {
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<any>();
  const [startDateInput, setStartDateInput] = useState<any>();
  const [endDateInput, setEndDateInput] = useState<any>();
  const [descriptionInput, setDescriptionInput] = useState<any>();
  const [fundsRequestedInput, setFundsRequestedInput] = useState<any>();
  const [linkInput, setLinkInput] = useState<any>();
  const [fileInput, setFileInput] = useState<any>();
  const [subGroup, setSubGroup] = useState();

  const [groupInput, setGroupInput] = useState<any>();
  const [proposalUriInput, setProposalUriInput] = useState<any>();

  const handleSubmit = async () => {
    const proposal = {
      title: titleInput,
      startDate: startDateInput, // Widget isn't working, this is always null
      endDate: endDateInput, // Widget isn't working, this is always null
      description: descriptionInput,
      fundsRequested: fundsRequestedInput,
      link: linkInput,
      file: fileInput,
    };

    const proposalUri = await backEnd.addProposal(proposal);
    console.log("Proposal added: ", proposalUri);
    setProposalUriInput(proposalUri);
  };

  const handleShowProposalModal = () => setShowProposalModal(true);
  const handleHideProposalModal = () => setShowProposalModal(false);

  const handleSubGroupChange = (e: any) => {
    setSubGroup(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Proposal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add all the informations you need for the Proposal
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Proposal Title
                  </label>
                  <input
                    type="text"
                    name="titleInput"
                    id="titleInput"
                    value={titleInput}
                    autoComplete="proposal"
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md pt-2 pb-2 text-10xl"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <DatePicker
                    id="startDateInput"
                    name="startDateInput"
                    value={startDateInput}
                    labelText="Start Date"
                    onSelect={setStartDateInput}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <DatePicker
                    id="endDateInput"
                    name="endDateInput"
                    value={endDateInput}
                    labelText="End Date"
                    onSelect={setEndDateInput}
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="descriptionInput"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Proposal Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="descriptionInput"
                      name="descriptionInput"
                      value={descriptionInput}
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-32 border border-gray-300 rounded-md p-2 text-10xl"
                      placeholder="Proposal Description"
                      defaultValue={""}
                      onChange={(e) => setDescriptionInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Link(Optional)
                  </label>
                  <input
                    type="text"
                    name="linkInput"
                    id="linkInput"
                    value={linkInput}
                    autoComplete="linkInput"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-10xl border-gray-300 rounded-md"
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="fundsRequestedInput"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Funds Requested
                  </label>
                  <input
                    type="text"
                    name="fundsRequestedInput"
                    id="fundsRequestedInput"
                    value={fundsRequestedInput}
                    autoComplete="fundsRequestedInput"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-10xl border-gray-300 rounded-md"
                    onChange={(e) => setFundsRequestedInput(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    id="fileInput"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0])
                        setFileInput(e.target.files[0]);
                    }}
                  />
                </div>
                {/* File upload widget below needs some work to get it working. Created one above temporarily. */}
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload a File
                  </label>
                  <div className="w-full mt-1 flex justify-center p-20 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center w-full h-64 flex flex-col justify-center items-center">
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
                          htmlFor="fileForUpload"
                          className="w-full relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="fileInput"
                            name="fileInput"
                            type="file"
                            onChange={(e) => setFileInput(e.target.value)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs pl-1 text-gray-500 pt-4">
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Proposal Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Decide which group you would like to make proposal to
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="space-y-6" action="#" method="POST">
              <fieldset>
                <legend className="contents text-base font-medium text-gray-900">
                  Select Group.
                </legend>
                <p className="text-sm text-gray-500">
                  If private, select from which Group you would like to propose
                  from.
                </p>
                <div
                  className="mt-4 space-y-4"
                  onChange={(e) => handleSubGroupChange(e)}
                >
                  <div className="flex items-center">
                    <input
                      value="1"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-everything"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 1
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="2"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-email"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 2
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="3"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 3
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="4"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-everything"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 4
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="5"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-email"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 5
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value="6"
                      name="sub-group"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Group 6
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
          Propose
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
          Submit Proposal
        </button>
      </div>
      {showProposalModal ? (
        <ProofModalProposal
          fileInput={fileInput}
          onClose={handleHideProposalModal}
          group={subGroup}
          title={titleInput}
          startDate={startDateInput}
          endDate={endDateInput}
          description={descriptionInput}
          fundRequest={fundsRequestedInput}
          linkInput={linkInput}
          proposalUri={proposalUriInput}
        />
      ) : null}
    </div>
  );
};
