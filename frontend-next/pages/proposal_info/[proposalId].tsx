import React, { useMemo } from "react";
import { Header } from "../../components/Header";
import { SubHeader } from "../../components/SubHeader";
import { DaoData } from "../../components/DaoData";
import { ProposalInfo } from "../../components/ProposalInfo";
import { useRouter } from "next/router";
import omBackEnd from "../../backend/OmData";

export default function ProposalInfoPage() {
  const router = useRouter();
  const { proposalId } = router.query;

  console.log("proposalId ", proposalId);

  const proposal = useMemo(() => {
    omBackEnd.getProposalById(proposalId).then((data) => {
      return (data && data.length > 0 && data[0]) || {};
    });
  }, [proposalId]);

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
          <div className="py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <ProposalInfo proposalId={proposalId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
