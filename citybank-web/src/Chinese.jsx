import styles from './style';

import { Footer, NavBar, Hero, MainNav, LogoBar } from "./components";

const App = () => {
    return (
        <div className="w-full overflow-hidden">  

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <LogoBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} bg-rouLan`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBar />
                </div>
            </div>

            <div className={`bg-slate-50 ${styles.flexCenter}`}>
                <div className={`${styles.heroWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`bg-slate-50 ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth} mb-6`}>
                    <MainNav />
                </div>
            </div>

            <div className={` bg-rouLan ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    )
};

export default App
