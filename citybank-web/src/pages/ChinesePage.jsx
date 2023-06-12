import styles from '../style';

import { Footer, NavBarChinese, LogoBarChinese } from "../components";

import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";

import { CurrencyEuroIcon,  CreditCardIcon, CurrencyDollarIcon,
            HomeIcon, ReceiptPercentIcon, ChartBarIcon, CalculatorIcon, TruckIcon, } from '@heroicons/react/24/solid'

const ChinesePage = () => {

    let { login } = useParams();
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)   
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const navigate = useNavigate()

    useEffect(() => {
        if (login === "register") {
            setLoginStatus(false)
        } else if (login === "edit") {
            setEditPage(true)
        }
    }, [])

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    const loginUser = async (e) => {
        e.preventDefault()

        const formData = new FormData();  
        formData.append('username', username)
        formData.append('password', password)

        let response = await fetch('http://127.0.0.1:8000/token/', {
            method: 'POST',
            body: formData
            
        })
        let data = await response.json()
        

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
            
            console.log("data", data)

            navigate('/banking')
            
        } else {
            console.log("response.status != 200")
        }
    }

    let boxClassnameTwo = "home-half-width bg-slate-50";
    let boxClassnameFourBig = "home-three-quarters-width bg-slate-50";
    let boxClassnameFour = "home-quarter-width bg-slate-50";
    let pageTitle = "text-4xl font-bold letters-fix"
    let helpItem = "text-3xl font-semibold letters-fix"

    return (
        <div className="w-full overflow-hidden bg-slate-100 chinese-text">  

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <LogoBarChinese />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} home-main-gradient chinese-text`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBarChinese />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-3`}>

                <div className={`${boxClassnameFourBig} flex-row smart-pay-gradient`}>
                    
                    <h1 className={`text-6xl mt-8 ml-6 text-slate-100 font-thin`}><div className='mb-2 '>城市银行<b className='font-bold text-gradient'>智能支付。</b></div>放心付款。放心生活。</h1>

                    <h1 className={`text-right mr-6`}><button class="bg-slate-200 hover:bg-blue-700 text-sky-600 justify-end text-3xl font-bold mt-12 py-4 px-6 rounded-full ">更多信息</button></h1>
                </div>
                
                
                    <div className={`${boxClassnameFour} items-center justify-center px-6 py-8 w-full bg-white rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700`}>

                            <div >
                                <p className='mt-2 text-lg font-semibold text-rouLan'>早上好。</p>
                                <h1 class="text-xl font-semibold leading-tight tracking-tight text-gray-500 md:text-2xl mb-4 dark:text-white">
                                    请登录账号
                                </h1>
                                <form class="space-y-0 md:space-y-2" action="#">
                                    <div>
                                        
                                        <input type="username" name="username" id="username" onChange={event => setUsername(event.target.value)} class="bg-white border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="用户名" required="" />
                                    </div>
                                    <div>
                                        
                                        <input type="password" name="password" id="password" placeholder="密码" onChange={event => setPassword(event.target.value)} class="bg-white border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label for="remember" class="text-gray-500 dark:text-gray-300 -ml-1">记住我的用户名</label>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <button type="submit" value="Login" onClick={loginUser} class="w-full text-white bg-rouLan hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">登录</button>
                                    <p className="text-md font-semibold text-gray-500 dark:text-gray-400 space-y-6">忘记密码？</p>
                                    <p className="text-md font-light text-gray-500 dark:text-gray-400 mb-6">
                                        还没有账号？<a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">请注册</a>
                                    </p>
                                </form>
                            </div>
                    </div>

            </div>

            <h2 className={`${styles.flexCenter, styles.heading3} text-slate-500 chinese-text font-semibold`}>无论随时随地，为您效劳。</h2>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            
                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem  } text-cuiWei pt-4 pl-6`}><CurrencyDollarIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>存款与投资</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-rouLan pt-4 pl-6`}><CreditCardIcon className="h-16 w-16 -ml-1 mb-2"/><span className=''>选择合适的信用卡</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-yuYangRan pt-4 pl-6`}><TruckIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>关于贷款服务</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-tangLiHe pt-4 pl-6`}><ChartBarIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>什么是通货膨胀？</span></h1>
                    </div>
                </div>

            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            
                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-juYi pt-4 pl-6`}><CalculatorIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>今日利率</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-zhuCao pt-4 pl-6`}><CurrencyEuroIcon className="h-16 w-16 -ml-1 mb-2"/><span className=''>外汇与汇率</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-youTanRui pt-4 pl-6`}><HomeIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>我的按揭还款</span></h1>
                    </div>
                </div>

                <div className={`${boxClassnameFour} flex-row`}>
                    <div className='flex-col'>
                        <h1 className={`${helpItem} text-tianShuiBi pt-4 pl-6`}><ReceiptPercentIcon className="h-16 w-16 -ml-1 mb-2" /><span className=''>我的退休存款</span></h1>
                    </div>
                </div>

            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-4`}>

                <div className={`${boxClassnameTwo} flex-row bonus-gradient`}>

                    <div className='flex-col ml-5 mt-12 text-slate-100'>

                        <h1 className={`text-4xl font-bold letters-fix mt-2`}><b className='text-6xl'>$500</b>&nbsp;开户奖励。</h1>
                        <h1 className={`text-4xl font-bold letters-fix`}>欢迎光临。</h1>

                        <h1 className={`text-right mr-6`}><button class="bg-slate-100 hover:bg-blue-700 text-shiFa justify-end text-3xl font-bold py-4 px-6 rounded-full ">立即开始</button></h1>

                    </div>

                </div>

                <div className={`${boxClassnameTwo} flex-row healthy-gradient`}>

                    <div className='flex-col ml-8'>
                        <h1 className={`${pageTitle} text-slate-100 pt-4 pl-6 -ml-2`}>城市银行理财工具，<br/>让您的财富更加健康。</h1>
                        <div className='grid grid-cols-5 pt-6 pl-6'>
                            <div className='healthy-bar-1 healthy-gradient-1'></div>
                            <div className='healthy-bar-2 healthy-gradient-2'></div>
                            <div className='healthy-bar-3 healthy-gradient-3'></div>
                            <div className='healthy-bar-4 healthy-gradient-2'></div>
                            <div className='healthy-bar-5 healthy-gradient-4'></div>
                        </div>
                    </div>

                </div>

            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} my-4`}>

                <div className={`${boxClassnameTwo} flex-row cashback-gradient`}>

                    <div className='flex-col ml-5 mt-8 text-slate-100'>

                        <h1 className={`text-5xl font-bold letters-fix mt-2`}>无限返现。</h1>
                        <h1 className={`text-4xl font-bold letters-fix`}>现金。随时到账。随时消费。</h1>
                        
                        <h1 className={`text-right mr-6`}><button class="bg-slate-100 hover:bg-blue-700 text-indigo-500 justify-end text-3xl font-bold mt-10 py-4 px-6 rounded-full ">更多信息</button></h1>

                    </div>

                </div>

                <div className={`${boxClassnameTwo} flex-row no-fees-gradient`}>

                    <div className='flex-col ml-5 mt-6 text-slate-100'>

                        <h1 className={`text-5xl font-bold letters-fix mt-2`}>任何账户，没有手续费。</h1>
                        <h1 className={`text-5xl font-bold letters-fix`}>费用刺客，相忘于江湖。</h1>

                        <h1 className={`text-right mr-6`}><button class="bg-slate-100 hover:bg-blue-700 text-orange-400 justify-end text-3xl font-bold mt-8 py-4 px-6 rounded-full ">更多信息</button></h1>

                    </div>

                </div>

            </div>
            
            <div className={`home-main-gradient ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    )
};

export default ChinesePage