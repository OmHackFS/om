import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wallet } from "../components/Wallet";
import { MainPage } from "../components/MainPage";
import { SidebarNavigation } from "../components/SidebarNavigation";
import { DaoDataPage } from "../components/DaoDataPage";
import { ProposalsPage } from "../components/ProposalPage";
import { ProposalsInputPage } from "../components/ProposalInputPage";
import { ProposalInfoPage } from "../components/ProposalInfoPage";
import { DataInputPage } from "../components/DataInputPage";
import { ProofModal } from "../components/ProofModal";
import { ExperimentPage } from "../components/ExperimentPage";

export function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarNavigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dao_data" element={<DaoDataPage />} />
          <Route path="/dao_proposal" element={<ProposalsPage />} />
          <Route path="/dao_proposal_input" element={<ProposalsInputPage />} />
          <Route path="/dao_proposal_info/:proposalId" element={<ProposalInfoPage />} />
          <Route path="/dao_data_input" element={<DataInputPage />} />
          <Route path="/modal" element={<ProofModal />} />
          <Route path="/experiment" element={<ExperimentPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
