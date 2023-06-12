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
                    {/* <Route path="/old" exact element={<OldHomePage />}></Route> */}
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



// <div className="w-full overflow-hidden">  

// <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//     <div className={`${styles.boxWidth}`}>
//         <LogoBar />
//     </div>
// </div>

// <div className={`${styles.paddingX} ${styles.flexCenter} bg-rouLan`}>
//     <div className={`${styles.boxWidth}`}>
//         <NavBar />
//     </div>
// </div>

// <div className={`bg-slate-50 ${styles.flexCenter}`}>
//     <div className={`${styles.heroWidth}`}>
//         <Hero />
//     </div>
// </div>

// <div className={`bg-slate-50 ${styles.paddingX} ${styles.flexStart}`}>
//     <div className={`${styles.boxWidth} mb-6`}>
//         <MainNav />
//     </div>
// </div>

// <div className={` bg-rouLan ${styles.paddingX} ${styles.flexStart}`}>
//     <div className={`${styles.boxWidth}`}>
//         <Footer />
//     </div>
// </div>
// </div>