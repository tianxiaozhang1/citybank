import React, {useState, useEffect, useContext} from 'react'

import styles from '../style';

import { Footer, NavBar, LogoBar, Dashboard } from "../components";

import jwt_decode from "jwt-decode";

const BankingPage = () => {

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

    return (
        <div className='bg-slate-100'>
            <div className="w-full overflow-hidden">  

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <LogoBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} banking-gradient`}>
                <div className={`${styles.boxWidth}`}>
                    <NavBar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <Dashboard />
            </div>

            <div className={`banking-gradient ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
            </div>
        </div>
    )
}

export default BankingPage
