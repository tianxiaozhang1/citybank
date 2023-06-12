// import React from 'react'
import styles from '../style';

// import { VisaCardOne, VisaCardTwo  } from './index';

import React, { PureComponent } from 'react';

import { SideBar } from '../components'

import { MoonIcon } from '@heroicons/react/24/solid'

const Dashboard = () => {

    let boxClassnameOne = "banking-dashboard-one bg-white justify-center";
    let boxClassnameTwo = "dashboard-two bg-white shadow-lg";
    // let boxClassnameTwoX = "banking-dashboard-twoX bg-slate-50";

    let accountsLeft = "banking-accounts-grid-left text-xl"
    let accountsRight = "banking-accounts-grid-right text-xl text-left"

    let pageTitle = "text-4xl font-bold letters-fix -mt-2 text-rouLan"

    let col1of2 = "basis-1/2 text-xl"
    
    // let sideCategory = "flex items-center px-4 py-2 my-2 text-rouLan rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-white font-bold text-xl shadow-md"
    // let sideItem = "flex items-center px-3 my-2 text-slate-500 border-red-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-4 bg-white font-medium text-lg shadow-md"

  return (

        <div className={`mt-2`}>
            
            <div className={`flex md:flex-row flex-col`}>

                <SideBar />

            <div>

                    <div className='    '>

                        <div className={`${boxClassnameOne} flex-row`}>

                            <div className='flex-col ml-6'>
                                <h1 className={`${pageTitle} banking-text`}>Your Accounts</h1>
                                {/* <p className='my-2'></p> */}
                                
                                <div class='banking-accounts-grid mt-4 mb-2'>
                                    <div className='banking-accounts-grid-left text-3xl font-semibold my-4'>Banking</div>
                                    <div className='banking-accounts-grid-right'></div>
                                </div>
                                <div class='banking-accounts-grid ml-6'>
                                    <div className={accountsLeft}>CITY EVERY DAY CHEQUING ACCOUNT - 2320 6325266</div>
                                    <div className={accountsRight}>$102,560.32</div>
                                </div>
                                <div class='banking-accounts-grid ml-6'>
                                    <div className={accountsLeft}>CITY SAVINGS ACCOUNT - 4230 1343262</div>
                                    <div className={accountsRight}>$202,120.18</div>
                                </div>
                                <div class='banking-accounts-grid font-bold my-2'>
                                    <div className={accountsLeft}>Banking Total</div>
                                    <div className={`${accountsRight} indent-1`}>$304,680.50</div>
                                </div>
                                <div class='banking-accounts-grid'>
                                    <div className='banking-accounts-grid-left text-3xl font-semibold my-4'>Credit Cards, Loans & Mortgages</div>
                                    <div className='banking-accounts-grid-right'></div>
                                </div>
                                <div class='banking-accounts-grid ml-6 mt-2'>
                                    <div className={accountsLeft}>CITY CASH BACK VISA CARD - 3220 2800 5786 5632</div>
                                    <div className={accountsRight}>$1,230.00</div>
                                </div>
                                <div class='banking-accounts-grid ml-6'>
                                    <div className={accountsLeft}>CITY HOME MORTGAGE - 204832855</div>
                                    <div className={accountsRight}>$1,012,000.00</div>
                                </div>
                                <div class='banking-accounts-grid font-bold my-2'>
                                    <div className={accountsLeft}>Credit Total</div>
                                    <div className={`${accountsRight} indent-1`}>$1,013,230.00</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={`${styles.flexCenter} -mt-2`}>

                        <div className={`flex-row`}>
                            <div className={`${boxClassnameTwo} flex-row`}>
                                <div className='flex-col text-slate-600'>
                                    <div className='flex-col '>
                                        <h1 className={`${pageTitle}`}>Your Mortgage</h1>
                                        <p className='mb-4'></p>

                                        <div class='flex'>
                                            <div className={col1of2}>Loan Number</div>
                                            <div className={col1of2}>204832855</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Property Address</div>
                                            <div className={col1of2}>221B Baker Street, Toronto, ON NW1 6XE</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Outstanding Principal</div>
                                            <div className={col1of2}>$202,120.36</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Monthly Payment</div>
                                            <div className={col1of2}>$2,120.00</div>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Make Payment</button>
                                            <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Manage</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row`}>
                                <div className='flex-col text-slate-600'>
                                    <div className='flex-col '>
                                        <h1 className={`${pageTitle}`}>Your Home Insurance</h1>
                                        <p className='mb-4'></p>
                                        <div class='flex'>
                                            <div className={col1of2}>Insurance Number</div>
                                            <div className={col1of2}>304650832</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Monthly Premium</div>
                                            <div className={col1of2}>$220.00</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Next Payment Due</div>
                                            <div className={col1of2}>July 1, 2023</div>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Info</button>
                                            <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Claim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`flex-row`}>
                            <div className={`${boxClassnameTwo} flex-row`}>
                                <div className='flex-col text-slate-600'>
                                    <div className='flex-col '>
                                        <h1 className={`${pageTitle}`}>Your Investment</h1>
                                        <p className='mb-4'></p>

                                        <div class='flex'>
                                        <div className={col1of2}>Portfolio ID</div>
                                        <div className={col1of2}>124842805</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Interest Rate</div>
                                            <div className={col1of2}>5%</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Starting Amount</div>
                                            <div className={col1of2}>$20,000.00</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Monthly Installment</div>
                                            <div className={`${col1of2}`}>$300.00</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Starting Date</div>
                                            <div className={`${col1of2}`}>June 1, 2022</div>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Check Portfolio</button>
                                            <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Manage</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row`}>
                                <div className='flex-col text-slate-600'>
                                    <div className='flex-col '>
                                        <h1 className={`${pageTitle}`}>Your Car Insurance</h1>
                                        <p className='mb-4'></p>

                                        <div class='flex'>
                                            <div className={col1of2}>Insurance Number</div>
                                            <div className={col1of2}>503802818</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Monthly Premium</div>
                                            <div className={col1of2}>$360.00</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Next Payment Due</div>
                                            <div className={col1of2}>July 1, 2023</div>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Make Payment</button>
                                            <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Claim</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                    </div>
                    <div className='-mt-1'>
                        <div className={` ${boxClassnameOne}  text-center late-night-gradient`}>
                            <div className='flex'>
                                <MoonIcon className="h-16 w-16 -ml-1 mb-2 text-xiangYe basis-1/6 mt-2"/>
                                <h1 className={`basis-4/6 text-6xl font-bold letters-fix text-xiangYe mb-4 mt-8`}>Beyond 9 to 5.</h1>
                                <div className='basis-1/6'></div>
                            </div>
                            <h1 className={`${pageTitle} text-slate-100 mb-10 mt-2`}>Bank when you like.<br/>Every location is open late and on weekends. </h1>
                        </div>
                    </div>

                </div>

                

            </div>

            

        </div>

  )
}

export default Dashboard
