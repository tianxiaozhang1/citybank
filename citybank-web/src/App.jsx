import React from "react";
import styles from './style';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import HomePage from './pages/HomePage';
import BankingPage from './pages/BankingPage';
import NewAccountPage from './pages/NewAccountPage';
import MortgagePage from './pages/MortgagePage';
import InvestmentPage from './pages/InvestmentPage';
import InsurancePage from './pages/InsurancePage';
import ChinesePage from './pages/ChinesePage';

const App = () => {

        const mainPageContent = {
            pageTitle: "City Bank"
        };

        const bankingPageContent = {
            pageTitle: "City Banking"
        };

    return (
        <RecoilRoot>

            <Router>
                <Routes>
                    <Route path="/" exact element={<HomePage />}></Route>
                    <Route path="/signup" exact element={<NewAccountPage />}></Route>
                    <Route path="/banking" exact element={<BankingPage />}></Route>
                    <Route path="/mortgage" exact element={<MortgagePage />}></Route>
                    <Route path="/investment" exact element={<InvestmentPage />}></Route>
                    <Route path="/insurance" exact element={<InsurancePage />}></Route>
                    <Route path="/chinese" exact element={<ChinesePage />}></Route>
                </Routes>   
            </Router>

        </RecoilRoot>

    )
};

export default App
