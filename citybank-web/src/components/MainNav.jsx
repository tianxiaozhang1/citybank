import React from 'react'
import styles from '../style';

import { CurrencyEuroIcon, BanknotesIcon, AcademicCapIcon, CreditCardIcon, CurrencyDollarIcon,
         HomeIcon, ReceiptPercentIcon, ChartBarIcon, CalculatorIcon, TruckIcon, BookOpenIcon,
        HomeModernIcon, GlobeAmericasIcon, BuildingLibraryIcon, UserPlusIcon, PencilSquareIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid'

import { BulletPoint } from '../icons';

const MainNav = () => {

    let boxClassnameOne = "main-nav-card bg-slate-50 border-slate-200 border-2 border-indigo-600";
    let boxClassnameTwo = "flex-row main-nav-card bg-slate-50 border-2";

  return (


    
    <div className='main-nav' class='main-nav-wrapper'>
        <br/>
        <div className='main-nav-content-box'>
            <div className={boxClassnameOne}>
                <BanknotesIcon className="h-16 w-16 text-guanLv" />
                <h2>$300 checking bonus on us</h2>
                <p>Open an eligible checking account with qualifying direct deposits.</p>
            </div>

            <div className={boxClassnameOne}>
                <BookOpenIcon className="h-16 w-16 text-guanLv" />
                <h2>Financial resources</h2>
                <p>Access our financial resource hub to help you manage your money and plan for your future.</p>
            </div>

            <div className={boxClassnameOne}>
                <AcademicCapIcon className="h-16 w-16 text-guanLv" />
                <h2>Get College Ready</h2>
                <p>Connect with a banker to make sure you have the accounts you need before you go to college.</p>
            </div>

        </div>

        <h2 className={`${styles.flexCenter, styles.heading3} text-jiLan mt-3`}>What can we do for you today?</h2>

        <div className='second-nav-content-box align-center ml-16 mr-16 text-lanCaiHe text-lg'>
            <p className='flex'><CurrencyDollarIcon className="h-16 w-16" /><span className='py-4 ml-2'>Saving and Investing</span></p>
            <p className='flex'><CreditCardIcon className="h-16 w-16"/><span className='py-4 ml-2'>Compare Credit Cards</span></p>
            <p className='flex'><TruckIcon className="h-16 w-16" /><span className='py-4 ml-2'>Learn About Loans</span></p>
            <p className='flex'><ChartBarIcon className="h-16 w-16" /><span className='py-4 ml-2'>What is Inflation?</span></p>
        </div>
        <div className='second-nav-content-box align-center ml-16 mr-16 text-lanCaiHe text-lg'>
            <p className='flex'><CalculatorIcon className="h-16 w-16" /><span className='py-4 ml-2'>Today's Rates</span></p>
            <p className='flex'><CurrencyEuroIcon className="h-16 w-16"/><span className='py-4 ml-2'>Foreign Exchange</span></p>
            <p className='flex'><HomeIcon className="h-16 w-16" /><span className='py-4 ml-2'>My Mortgage Payments</span></p>
            <p className='flex'><ReceiptPercentIcon className="h-16 w-16" /><span className='py-4 ml-2'>Boost My RRSP Savings</span></p>
        </div>

        <br/>
        <div className='main-nav-content-box align-center ml-16 mr-16 text-lanCaiHe text-lg'>
            
            <div className={boxClassnameTwo}>
                
                <span className='flex mr-1'><HomeModernIcon className="h-6 w-6 text-red-400" /><p className='font-bold text-left ml-2'>Buying a Home</p></span><br/>
                
                <div>
                    <p className='flex'><BulletPoint />I'm buying my first home</p>
                    <p className='flex'><BulletPoint />I'm selling my home and moving</p>
                    <p className='flex'><BulletPoint />I'm buying another property</p>
                    <p className='flex'><BulletPoint />I want to renew my mortgage</p>
                </div>
            </div>

            <div className='flex-row main-nav-card bg-slate-50 border-orange-200 border-2'>
                {/* <p className='font-bold ml-5'>New to Canada</p><br/> */}
                <span className='flex mr-1'><GlobeAmericasIcon className="h-6 w-6 text-orange-400" /><p className='font-bold text-left ml-2'>New to Canada</p></span><br/>
                <div>
                    <p className='flex'><BulletPoint />I am a resident</p>
                    <p className='flex'><BulletPoint />I am a foreign worker</p>
                    <p className='flex'><BulletPoint />I am a student</p>
                    <p className='flex'><BulletPoint />I have a business</p>
                </div>
            </div>

            <div className='flex-row main-nav-card bg-slate-50 border-emerald-200 border-2'>
                {/* <p className='font-bold ml-5'>Going to School</p><br/> */}
                <span className='flex mr-1'><BuildingLibraryIcon className="h-6 w-6 text-emerald-400" /><p className='font-bold text-left ml-2'>Going to School</p></span><br/>
                <div>
                    <p className='flex'><BulletPoint />Find the Right Student Account</p>
                    <p className='flex'><BulletPoint />Enjoy Rewards & Benefits</p>
                    <p className='flex'><BulletPoint />Build Your Career</p>
                    <p className='flex'><BulletPoint />Doing Some Good</p>
                </div>
            </div>
            
            <div className='flex-row main-nav-card bg-lanCaiHe-500 border-sky-200 border-2' >
                {/* <p className='font-bold ml-5'>Resources for Seniors</p><br/> */}
                <span className='flex mr-1'><UserPlusIcon className="h-6 w-6 text-sky-400" /><p className='font-bold text-left ml-2'>Resources for Seniors</p></span><br/>
                <div>
                    <p className='flex'><BulletPoint />Getting started with digital banking</p>
                    <p className='flex'><BulletPoint />How to protect your money</p>
                    <p className='flex'><BulletPoint />Planning for the future</p>
                </div>
            </div>

            <div className='flex-row main-nav-card bg-slate-50 border-violet-200 border-2'>
                {/* <p className='font-bold ml-5'>Retirement Planning</p><br/> */}
                <span className='flex mr-1'><PencilSquareIcon className="h-6 w-6 text-violet-400" /><p className='font-bold text-left ml-2'>Retirement Planning</p></span><br/>
                <div>
                    <p className='flex'><BulletPoint />I'm Saving and Planning</p>
                    <p className='flex'><BulletPoint />I'm Getting Close</p>
                    <p className='flex'><BulletPoint />I'm Already Retired</p>
                </div>
            </div>

            <div className='flex-row main-nav-card bg-slate-50 border-rose-200 border-2'>
                {/* <p className='font-bold ml-5'>Online & Mobile Banking Tutorials</p><br/> */}
                <span className='flex mr-1'><ComputerDesktopIcon className="h-6 w-6 text-rose-400" /><p className='font-bold text-left ml-2'>Online & Mobile Banking Tutorials</p></span><br/>
                <div>
                    <p className='flex'><BulletPoint />How to Reset Your Password</p>
                    <p className='flex'><BulletPoint />How to Pay a Bill</p>
                    <p className='flex'><BulletPoint />View All Tutorials</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default MainNav
