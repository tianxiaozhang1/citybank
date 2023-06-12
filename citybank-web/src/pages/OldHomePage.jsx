import styles from '../style';

import { Footer, NavBar, Hero, MainNav, LogoBar } from "../components";

import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {

    let { login } = useParams();
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)   
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    let [loginStatus, setLoginStatus] = useState(true)
    let [editPage, setEditPage] = useState(false)

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

            navigate('/')
            
        } else {
            console.log("response.status != 200")
        }
    }

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

export default HomePage