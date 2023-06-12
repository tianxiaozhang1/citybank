import React, { useState, useEffect } from 'react'

import styles from '../style';
import { Footer, NavBar, LogoBar, SideBar } from "../components";
import jwt_decode from "jwt-decode";
import Chart from 'react-apexcharts'
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'

let equitySeries = [{
    data: [150, 160, 120, 140, 180, 235, 220, 249, 260, 236, 291, 325]
    }]
let equityOptions= {
    
    colors:['#4C8045'],

    yaxis: {
        labels: {
            style: {
                colors: ['#106898'],
                fontSize: '18px',
                fontFamily: 'Poppins, Arial, sans-serif',
                fontWeight: 500,
            }
       }
    },
    xaxis: {
        labels: {
            style: {
                colors: ['#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898', '#106898'],
                fontSize: '18px',
                fontFamily: 'Poppins, Arial, sans-serif',
                fontWeight: 500,
            }
       },
       categories: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    },

    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 6,
        dashArray: 0,      
    },
    chart: {
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
            // offsetX: 0,
            // offsetY: 0,
            // tools: {
            // download: false,
            // selection: false,
            // zoom: false,
            // zoomin: false,
            // zoomout: false,
            // pan: false,
            // reset: false | '<img src="/static/icons/reset.png" width="20">',
            // customIcons: []
            // }
        }
    },

  };

let assetSeries = [18083, 42236, 52897, 15905];

let chartOptions = {
        dataLabels: {
            enabled: false,
            formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                return w.config.series[seriesIndex].name + ":  " + value
              },
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
            },
        },
        stroke: {
            show: false,    
        },
        series: [44, 55, 13, 33],
        colors:['#D23918', '#E18A3B', '#3271AE', '#84A729'],
        legend: {
            show: false
          },
        plotOptions: {
        pie: {
            size: 10
        }
        }
      }

const InvestmentPage = () => {

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

            // setProfilePic(userData.profilepic)
            // const sURL = userData.website;

            //Strip http:// of URL
            // setWebsiteURL(sURL.slice(sURL.indexOf("//")+2, sURL.length))

        }
        // else if(userResponse.statusText === 'Unauthorized'){
        //     logoutUser()
        // }
        else {
            console.log("userResponse.status", userResponse.status)
        }
    }

    let boxClassnameOne = "banking-dashboard-one bg-white justify-center";
    let boxClassnameTwo = "dashboard-two bg-white";
    let pageTitle = "text-4xl font-bold letters-fix -mt-2 text-rouLan"
    let GreyLine = <hr className="my-4 -ml-2 mr-16 h-0.5 border-t-0 bg-slate-200 opacity-100 dark:opacity-50" />
    let DownArrow = <ChevronDoubleDownIcon className="flex-1 justify-end h-6 w-6 mt-1.5 basis-1/5 text-slate-500"/>
    let col1of2 = "basis-1/2 text-xl"

    return (
        <div className='bg-slate-100'>
            <div className="w-full overflow-hidden">  

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <LogoBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} investment-gradient`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-2`}>
                
            
                <div className={`flex`}>

                    <SideBar />

                    <div>
                            

                        <div className={`${styles.flexCenter} flex-row`}>

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
                                            <div className={col1of2}>Total Equity</div>
                                            <div className={col1of2}>$52,896.98</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Monthly Installment</div>
                                            <div className={col1of2}>$300.00</div>
                                        </div>
                                        <div class='flex'>
                                            <div className={col1of2}>Starting Date</div>
                                            <div className={col1of2}>June 1, 2022</div>
                                        </div>
                                        
                                    </div>
                                        
                                </div>
                            </div>

                            <div className={`dashboard-two flex-row bg-queMei`}>

                                <div className='flex-col ml-0 mt-6 text-slate-50 '>

                                    <h1 className={`text-3xl font-bold letters-fix mt-0 mb-2`}><b className='text-4xl font-Aldrich'>5</b>&nbsp;timeless tips on managing market ups and downs.</h1>

                                    <h1 className={`text-right mt-10 mr-0 mb-2`}><button class="bg-slate-100 text-shiFa hover:bg-blue-700 justify-end text-3xl font-bold py-4 px-6 rounded-full ">Read More</button></h1>

                                </div>

                            </div>

                        </div>

                            <div className='-mt-1'>
                                <div className={`${boxClassnameOne} flex-row`}>
                                    <h1 className={`${pageTitle} ml-8 mt-0 mb-2`}>Total Equity</h1>
                                    
                                    <div className='flex'>

                                        <div>
                                            <div className='flex'>
                                                <div>
                                                    <p className='ml-8 text-rouLan mt-2 font-bold text-3xl'>$52,896.98</p>
                                                    <p className='ml-8 text-slate-400 mt-2 font-semibold text-lg'>Combined in CAD</p>
                                                </div>

                                                <div className='ml-8 mt-8 flex'>

                                                    <div className='text-right font-bold'>
                                                        <p className='text-slate-400'>Today's P&L</p>
                                                        <p className='text-shiFa'>+145.34 (+1.23%)</p>
                                                    </div>

                                                    <div className='text-right font-bold ml-6'>
                                                        <p className='text-slate-400'>Open P&L</p>
                                                        <p className='text-shiFa'>+102.58 (+0.96%)</p>
                                                    </div>

                                                    <div className='text-right font-bold ml-6'>
                                                        <p className='text-slate-400'>P&L since inception</p>
                                                        <p className='text-shiFa'>+121.92 (+1.03%)</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='mr-4'>
                                                <Chart className='ml-4 mr-2 mt-2 -mb-4 text-xl' options={equityOptions} series={equitySeries} type="line" width={670} height={360} />

                                                <div className='flex justify-center'>
                                                    <button className="bg-slate-100 text-rouLan text-xl font-bold px-4 mr-2 rounded-2xl ">15D</button>
                                                    <button class="bg-slate-100 text-rouLan text-xl font-bold px-4 mr-2 rounded-2xl">1M</button>
                                                    <button class="bg-slate-100 text-rouLan text-xl font-bold px-4 mr-2 rounded-2xl">3M</button>
                                                    <button class="bg-slate-100 text-rouLan text-xl font-bold px-4 mr-2 rounded-2xl">6M</button>
                                                    <button class="bg-rouLan text-slate-50 text-xl font-bold px-4 mr-2 rounded-2xl">1Y</button>
                                                    <button class="bg-slate-100 text-rouLan text-xl font-bold px-4 mr-2 rounded-2xl">Max</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='ml-2 mr-4'>

                                            <button class="bg-rouLan text-slate-100 text-md font-bold px-4 py-2">Account Holdings</button>
                                            <button class="bg-slate-200 text-rouLan text-md font-semibold px-4 py-2 mb-1">Watchlist</button>

                                            <button class="bg-shiFa text-slate-100 text-md font-bold px-4 py-1">Position Value</button>
                                            <button class="bg-slate-200 text-shiFa text-md font-semibold px-4 py-1 mb-1">Symbol Price</button>
                                            
                                            <div className='mr-1'>
                                                <div className='flex text-lg mt-2 ml-1'>
                                                    <div className='basis-3/4 flex text-rouLan font-bold text-2xl'>AAPL<div className='ml-2 text-slate-400 font-normal text-sm mt-2.5 '>Apple Inc.</div></div>
                                                    <div className='basis-1/4 font-semibold text-rouLan mr-1 mt-1 text-xl'>$5367.48</div>
                                                </div>
                                                <div className='flex text-lg mt-0.5 ml-1'>
                                                    <div className='basis-3/4 text-xl font-bold mr-4 text-slate-400 '>25 shares</div>
                                                    <div className='basis-1/4 justify-end text-xl font-semibold bg-shiFa text-slate-100 px-2 rounded-xl mr-1'>$531.45</div>
                                                </div>

                                                <div className='flex text-lg mt-2 ml-1'>
                                                    <div className='basis-3/4 flex text-rouLan font-bold text-2xl'>NFLX<div className='ml-2 text-slate-400 font-normal text-sm mt-2.5 '>Netflix, Inc.</div></div>
                                                    <div className='basis-1/4 font-semibold text-rouLan mr-1 mt-1 text-xl'>$4522.16</div>
                                                </div>
                                                <div className='flex text-lg mt-0.5 ml-1'>
                                                    <div className='basis-3/4 text-xl font-bold mr-4 text-slate-400 '>50 shares</div>
                                                    <div className='basis-1/4 justify-end text-xl font-semibold bg-shiFa text-slate-100 px-2 rounded-xl mr-1'>$420.02</div>
                                                </div>

                                                <div className='flex text-lg mt-2 ml-1'>
                                                    <div className='basis-3/4 flex text-rouLan font-bold text-2xl'>MSFT<div className='ml-2 text-slate-400 font-normal text-sm mt-2.5 '>Microsoft Corp.</div></div>
                                                    <div className='basis-1/4 font-semibold text-rouLan mr-1 mt-1 text-xl'>$3317.84</div>
                                                </div>
                                                <div className='flex text-lg mt-0.5 ml-1'>
                                                    <div className='basis-3/4 text-xl font-bold mr-4 text-slate-400 '>25 shares</div>
                                                    <div className='basis-1/4 justify-end text-xl font-semibold bg-shiFa text-slate-100 px-2 rounded-xl mr-1'>$326.79</div>
                                                </div>

                                                <div className='flex text-lg mt-2 ml-1'>
                                                    <div className='basis-3/4 flex text-rouLan font-bold text-2xl'>PAH3.DE<div className='ml-2 text-slate-400 font-normal text-sm mt-2.5 '>Porsche A.</div></div>
                                                    <div className='basis-1/4 font-semibold text-rouLan mr-1 mt-1 text-xl'>$620.18</div>
                                                </div>
                                                <div className='flex text-lg mt-0.5 ml-1'>
                                                    <div className='basis-3/4 text-xl font-bold mr-4 text-slate-400 '>25 shares</div>
                                                    <div className='basis-1/4 justify-end text-xl font-semibold bg-shiFa text-slate-100 px-2 rounded-xl mr-1'>$56.46</div>
                                                </div>

                                                <div className='flex text-lg mt-2 ml-1'>
                                                    <div className='basis-3/4 flex text-rouLan font-bold text-2xl'>TGT<div className='ml-2 text-slate-400 font-normal text-sm mt-2.5 '>Target Corp.</div></div>
                                                    <div className='basis-1/4 font-semibold text-rouLan mr-1 mt-1 text-xl'>$1522.16</div>
                                                </div>
                                                <div className='flex text-lg mt-0.5 ml-1'>
                                                    <div className='basis-3/4 text-xl font-bold mr-4 text-slate-400 '>50 shares</div>
                                                    <div className='basis-1/4 justify-end text-xl font-semibold bg-woZhu text-slate-100 px-2 rounded-xl mr-1'>$126.99</div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className={`${boxClassnameOne}`}>
                                <div className='flex'>

                                    <div className='ml-8 basis-2/3'>
                                        <h1 className={`${pageTitle} mt-2 mb-6`}>Canadian Account Overview</h1>

                                        <div className='basis-2/3 text-2xl text-slate-600'>
                                            <div className='flex font-bold mb-2'>
                                                <div className='basis-1/3'>Asset Class</div>
                                                <div className='basis-1/3 mr-8'>Today's Value</div>
                                                <div className='basis-1/3 mr-10'>&nbsp;In Total</div>
                                            </div>
                                            <div className='flex py-2 my-2 -ml-4 mr-8 bg-luoShenZhu text-white'>
                                                <div className='basis-1/3 font-semibold'>&nbsp;&nbsp;&nbsp;&nbsp;Cash</div>
                                                <div className='basis-1/3 ml-6'>$18,082.96</div>
                                                <div className='basis-1/3 ml-8'>14.00%</div>
                                            </div>
                                            <div className='flex py-2 my-2 -ml-4 mr-8 bg-kuJin text-white'>
                                                <div className='basis-1/3 font-semibold'>&nbsp;&nbsp;&nbsp;&nbsp;Fixed Income</div>
                                                <div className='basis-1/3 ml-6'>$42,236.32</div>
                                                <div className='basis-1/3 ml-8'>32.71%</div>
                                            </div>
                                            <div className='flex py-2 my-2 -ml-4 mr-8 bg-qingMing text-white'>
                                                <div className='basis-1/3 font-semibold'>&nbsp;&nbsp;&nbsp;&nbsp;Equity</div>
                                                <div className='basis-1/3 ml-6'>$52,896.98</div>
                                                <div className='basis-1/3 ml-8'>40.97%</div>
                                            </div>
                                            <div className='flex py-2 my-2 -ml-4 mr-8 bg-shuiLongYin text-white'>
                                                <div className='basis-1/3 font-semibold'>&nbsp;&nbsp;&nbsp;&nbsp;Other</div>
                                                <div className='basis-1/3 ml-6'>$15905.16</div>
                                                <div className='basis-1/3 ml-8'>12.32%</div>
                                            </div>
                                            <div className='flex py-1 my-2 mb-6'>
                                                <div className='basis-1/3 font-semibold'>&nbsp;&nbsp;Total</div>
                                                <div className='basis-1/3 -ml-4'>$129,121.42</div>
                                                <div className='basis-1/3 ml-2'>100.00%</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='basis-1/3 mt-6 -ml-6 -mr-2'>
                                        <Chart className='ml-2 mt-16 text-sm' options={chartOptions} series={assetSeries} type="pie" width={320} height={320} />

                                    </div>

                                </div>
                                
                                <div className='flex mx-8'>

                                </div>

                            </div>
                             
                            <div className={`${boxClassnameOne} flex-row`}>
                                <div className='flex-col mt-6 mb-8 mx-12 text-slate-100 text-left'>
                                    <h1 className={`${pageTitle} text-center mt-0 mb-8`}>Questions? Answers.</h1>
                                    
                                    <div className='ml-12'>
                                    <div className='ml-12 text-2xl font-normal letters-fix text-slate-600'>
                                        
                                        <div className='flex'><h1 className={`basis-4/5`}>My Investments are down. Should I sell?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>How do I withdraw money from my RRSP?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>How can I modify automatic contributions?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>What can I do to protect my savings?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>How do I choose the right GIC for me?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>Can I hold a mutual fund in my registered plan?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>What is a First Home Savings Account?</h1>{DownArrow}</div>
                                        {GreyLine}
                                        <div className='flex'><h1 className={`basis-4/5`}>Are there plan administration fees associated with an RRSP?</h1>{DownArrow}</div>
                                        {/* {GreyLine} */}
                                        {/* <button class="bg-rouLan text-white hover:bg-blue-700 text-center text-1xl font-semibold justify-center py-2 px-6 mt-12 -mb-8 rounded-full ">More Answers</button> */}

                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <div className={`investment-gradient ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
            </div>
        </div>
    )
}

export default InvestmentPage
