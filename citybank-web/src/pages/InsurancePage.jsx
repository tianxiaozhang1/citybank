import React, { useState, useEffect } from 'react'

import styles from '../style';

import { Footer, NavBar, LogoBar,  SideBar } from "../components";

import jwt_decode from "jwt-decode";

const InsurancePage = () => {

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
    let boxClassnameTwo = "dashboard-two bg-white ";

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

            <div className={`${styles.paddingX} ${styles.flexCenter} insurance-gradient`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-2`}>
                
            
                <div className={`flex md:flex-row flex-col`}>

                    <SideBar />
                    <div>

                        <div className={`${styles.flexCenter} flex-row -mb-1.5`}>

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
                                        <div className={col1of2}>Property Address</div>
                                        <div className={col1of2}>221B Baker Street, Toronto, ON NW1 6XE</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Home Value</div>
                                        <div className={col1of2}>$2,002,120</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Year Built</div>
                                        <div className={col1of2}>1936</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Square Footage</div>
                                        <div className={col1of2}>2,820</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Construction</div>
                                        <div className={col1of2}>Frame</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Policy Type</div>
                                        <div className={col1of2}>HO-3</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Number of Residents</div>
                                        <div className={col1of2}>5</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Monthly Premium</div>
                                        <div className={col1of2}>$276.20</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Policy Starts</div>
                                        <div className={col1of2}>June 1, 2022</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Policy Ends</div>
                                        <div className={col1of2}>June 1, 2024</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Bundle Discount</div>
                                        <div className={col1of2}>Yes</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Discount Amount</div>
                                        <div className={col1of2}>$56.20</div>
                                    </div>

                                    <div className='text-center'>
                                        <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Info</button>
                                        <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Claim</button>
                                    </div>
                                    
                                </div>
                                    
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row`}>
                                
                                <div className='flex-col text-slate-600'>
                                    
                                    <div className='flex-col '>
                                    <h1 className={`${pageTitle}`}>Your Auto Insurance</h1>
                                    <p className='mb-4'></p>

                                    <div class='flex'>
                                        <div className={col1of2}>Insurance Number</div>
                                        <div className={col1of2}>503802818</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Make</div>
                                        <div className={col1of2}>Audi</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Model</div>
                                        <div className={col1of2}>A8</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Year</div>
                                        <div className={col1of2}>2022</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Mileage</div>
                                        <div className={col1of2}>2,120km</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Driving Distance</div>
                                        <div className={col1of2}>200km/day</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Driver's License</div>
                                        <div className={col1of2}>15 years</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Accidents</div>
                                        <div className={col1of2}>0</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Age</div>
                                        <div className={col1of2}>35</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Policy Starts</div>
                                        <div className={col1of2}>June 1, 2022</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Home Address</div>
                                        <div className={col1of2}>221B Baker Street, Toronto, ON NW1 6XE</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Monthly Premium</div>
                                        <div className={col1of2}>$360.00</div>
                                    </div>
                                    <div class='flex'>
                                        <div className={col1of2}>Bundle Discount</div>
                                        <div className={col1of2}>Yes</div>
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" value="Pay" class="mt-8 mr-4 w-1/2 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Make Payment</button>
                                        <button type="submit" value="Mortgage" class="mt-8 -mb-8 ml-4 w-1/3 text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-2 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Claim</button>
                                    </div>
                                    
                                </div>
                                    
                                </div>

                            </div>

                        </div>

                        <div className={`${styles.flexCenter} flex-row -mb-1.5`}>

                            <div className={`${boxClassnameTwo} flex-row`}>
                                <h1 className={`${pageTitle} text-center mb-2`}>Need Assistance?</h1>
                                <h1 className={`text-3xl font-bold letters-fix -mt-2 text-rouLan text-center mb-2`}>Our 24-Hour Toll-Free Lines:</h1>
                                
                                <div className='text-3xl text-center font-normal letters-fix text-slate-500'>
                                    <div className='text-center font-semibold'>From the U.S. & Canada: <p className='font-bold'>&nbsp;1-800-808-8000</p></div>
                                    <div className='text-center font-semibold'>Collect from anywhere else: <p className='font-bold'>&nbsp;1-416-808-8000</p></div>
                                </div>
                            </div>

                            <div className={`${boxClassnameTwo} flex-row business-insurance-gradient`}>
                                
                                <div className='flex-col text-slate-50'>
                                    
                                    <div className='flex-col '>
                                    <h1 className={`text-2xl font-bold letters-fix text-slate-100`}>Introducing<br/><p className='text-6xl text-white'>CITY Insurance<br/>for Business</p></h1>
                                    <p className='mb-4'></p>

                                    <h1 className={`text-right -mr-4`}><button class="bg-white text-kuJin justify-end text-2xl font-bold py-4 px-6 rounded-full mt-5 -mb-1">Coverage Options</button></h1>
                                    
                                </div>
                                    
                                </div>

                            </div>

                        </div>

                        <div className={`${boxClassnameOne}`}>
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
                                <div className="basis-1/4">$220.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">June 1, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$360.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">May 4, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$220.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">May 2, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$360.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">April 3, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$220.00</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="basis-1/4">April 2, 2023</div>
                                <div className="basis-2/4">Payment Received - Thank you</div>
                                <div className="basis-1/4">0.00</div>
                                <div className="basis-1/4">$360.00</div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className={`insurance-gradient ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
            </div>
        </div>
  )
}

export default InsurancePage
