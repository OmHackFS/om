import { proposals } from "../mocks/proposals";
import { Link } from "react-router-dom";

export const ProposalList = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-7">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Proposals</h1>
          <p className="mt-2 text-sm text-gray-700">
            This is a List of Proposals Within a Dao
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/dao_proposal_input">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Proposal
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
        {proposals.map((proposal) => (
          <Link to={`/dao_proposal_info/${proposal.id}`}>
            <div className="max-w-sm overflow-hidden shadow-lg rounded-[3.5rem]">
              <div className="flex justify-center p-4 mt-4">
                <img
                  className="h-52 w-84 rounded-[3.5rem]"
                  src={proposal.image}
                  alt=""
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{proposal.name}</div>
                <p className="text-gray-700 text-base">
                  {proposal.description}
                </p>
              </div>
              <div className="px-6 flex flex-row"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
