import React, { useState, useEffect } from 'react'

import styles from '../style';

import { Footer, NavBar, LogoBar, SideBar } from "../components";

import jwt_decode from "jwt-decode";

const MortgagePage = () => {

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)   
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [userData, setUserData] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async() => {

        let userResponse = await fetch('http://127.0.0.1:8000/users/'+user.user_id+'/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        let userData = await userResponse.json()

        let customerResponse = await fetch('http://127.0.0.1:8000/customers/'+userData.customer+'/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })

        let customerData = await customerResponse.json()



        for (let i = 0; i < customerData.accounts.length; i++) {


            let accountResponse = await fetch('http://127.0.0.1:8000/accounts/'+customerData.accounts[i]+'/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })

            let accountData = await accountResponse.json()
            console.log("accountData", accountData)

        }

        console.log("userData", userData)
        console.log("customerData", customerData)
        
        if(userResponse.status === 200){
            setUserData(userData)
        }

        else {
            console.log("userResponse.status", userResponse.status)
        }
    }

    let boxClassnameOne = "dashboard-one bg-white text-xl";
    let boxClassnameTwo = "dashboard-two bg-white shadow-lg";

    let col1of2 = "basis-1/2 text-xl"

    let pageTitle = "text-4xl font-bold letters-fix -mt-2 text-rouLan"

    return (
        <div className='bg-slate-100'>
            <div className="w-full overflow-hidden">  

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <LogoBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} cashback-gradient`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-2`}>
                
            
                <div className={`flex md:flex-row flex-col`}>

                    <SideBar />

                    <div>

                        <div className={`${styles.flexCenter} flex-row -mb-1`}>

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
                                    <div class='flex'>
                                        <div className={col1of2}>Interest Rate</div>
                                        <div className={col1of2}>5%</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Maturity Date</div>
                                        <div className={col1of2}>July 1, 2042</div>
                                    </div>
                                    
                                </div>
                                    
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row`}>
                                
                                <div className='flex-col text-slate-600'>
                                    
                                    <div className='flex-col '>
                                    <h1 className={`${pageTitle}`}>Your Next Payment</h1>
                                    <p className='mb-4'></p>

                                    <div class='flex'>
                                        <div className={col1of2}>Princial</div>
                                        <div className={col1of2}>$832.52</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Interest</div>
                                        <div className={col1of2}>$1,120.00</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Escrow</div>
                                        <div className={col1of2}>$167.48</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Previous</div>
                                        <div className={col1of2}>$0</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Fees</div>
                                        <div className={col1of2}>$0</div>
                                    </div>
                                    <div class='flex font-bold'>
                                        <div className={col1of2}>Total</div>
                                        <div className={col1of2}>$2,120.00</div>
                                    </div>
                                    <div class='flex font-bold'>
                                        <div className={col1of2}>Due Date</div>
                                        <div className={col1of2}>July 10, 2023</div>
                                    </div>
                                    
                                </div>
                                    
                                </div>

                            </div>

                        </div>

                        <div className={`${boxClassnameOne} mb-2`}>
                            <h1 className={`${pageTitle}`}>Recent Activity</h1>
                            <div className="flex flex-row">
                                <div className="basis-1/4">Date</div>
                                <div className="basis-2/4"></div>
                                <div className="basis-1/4">Charges</div>
                                <div className="basis-1/4">Payments</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">June 6, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">May 1, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">April 2, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">March 5, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">February 3, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">January 4, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$2,120.00</div>
                            </div>
                        </div>


                        <div className={`${boxClassnameOne}`}>
                            <h1 className={`${pageTitle}`}>Past Payment Breakdown</h1>
                            <div className="flex flex-row">
                                <div className="basis-1/3"></div>
                                <div className="basis-1/3">Paid Last Month</div>
                                <div className="basis-1/3">Paid Year to Date</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/3">Principal</div>
                                <div className="basis-1/3">$832.52</div>
                                <div className="basis-1/3">$4,332.56</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/3">Interest</div>
                                <div className="basis-1/3">$1,120.00</div>
                                <div className="basis-1/3">$7,032.12</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/3">Escrow</div>
                                <div className="basis-1/3">$167.48</div>
                                <div className="basis-1/3">$1,355.32</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/3">Fees</div>
                                <div className="basis-1/3">$0</div>
                                <div className="basis-1/3">$0</div>
                            </div>
                            <div className="flex flex-row font-bold">
                                <div className="basis-1/3">Total</div>
                                <div className="basis-1/3">$2,120.00</div>
                                <div className="basis-1/3">$12,720.00</div>
                            </div>
                        </div>

                        <div className={`${styles.flexCenter} flex-row mb-2`}>
                            <div className={`${boxClassnameTwo} flex-row vacation-home-gradient`}>
                                
                                <div className='flex-col text-slate-50'>
                                    <div className='flex-col '>
                                        <h1 className={`text-5xl font-bold letters-fix text-white mt-2`}>Get Your Vacation Home Faster</h1>
                                        <h1 className={`text-right -mr-4`}><button class="bg-white text-sky-500 justify-end text-2xl font-bold py-4 px-6 rounded-full mt-5 my-1">Learn More</button></h1>
                                    </div>
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row energy-savings-gradient`}>
                                <div className='flex-col'>
                                    <div className='flex-col '>
                                        <h1 className={`text-2xl font-semibold letters-fix text-slate-100 mb-8 mt-2`}>Learn about<div className='text-4xl font-bold text-white'>Home energy savings</div></h1>
                                        <p className='mb-4 text-2xl text-slate-50'>Save money and help our environment with home upgrades and energy-efficient habits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.flexCenter} flex-row -mt-3 mb-2`}>
                            <div className={`${boxClassnameTwo} flex-row refinance-myth-gradient`}>
                                
                                <div className='flex-col text-slate-50'>
                                    <div className='flex-col '>
                                        <h1 className={`text-4xl font-bold letters-fix mt-0 mb-2`}><b className='text-4xl font-Aldrich'>5</b>&nbsp;common myths about refinancing your mortgage</h1>
                                        <h1 className={`text-right -mr-4`}><button class="bg-white text-slate-600 justify-end text-2xl font-bold py-4 px-6 rounded-full mt-0 my-2">Learn More</button></h1>
                                    </div>
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row rate-change-gradient`}>
                                <div className='flex-col'>
                                    <div className='flex-col'>
                                        <h1 className={`text-8xl font-black letters-fix text-slate-100 -mt-3 -ml-2 flex rate-change-text-gradient`}>
                                            <div className='text-slate-400'>%</div>
                                            <div className='text-slate-200'>%</div>
                                            <div className='text-slate-800'>%</div>
                                            <div className='text-slate-200'>%</div>
                                            <div className='text-slate-400'>%</div>
                                        </h1>
                                        <h1 className={`text-4xl text-center font-bold letters-fix text-shanFan mb-3 -mt-1`}>Understanding Interest Rate Changes</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className={`cashback-gradient ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
            </div>
        </div>
    )
}

export default MortgagePage
