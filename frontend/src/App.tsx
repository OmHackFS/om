import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wallet } from './components/Wallet';
import { MainPage } from './components/MainPage';
import { SidebarNavigation } from './components/SidebarNavigation';

export function App(): ReactElement {
  return (
    <div className="App">
      <SidebarNavigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
