import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wallet } from './components/Wallet';
import { MainPage } from './components/MainPage';


export function App(): ReactElement {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
