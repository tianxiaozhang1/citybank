import React, {useState, useEffect, useContext} from 'react'

import styles from '../style';

import { Footer, NavBar, LogoBar } from "../components";

import jwt_decode from "jwt-decode";
import { AcademicCapIcon } from '@heroicons/react/24/solid'

const NewAccount = () => {

  let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)   
  let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [dateofbirth, setDateofBirth] = useState('');

  const [address, setAddress] = useState('');
  const [address2, setAddressTwo] = useState('');
  const [postalcode, setPostalCode] = useState('');

  const [balance, setBalance] = useState('');
  const [currency, setCurrency] = useState('');

  const register = async (event) => {
      event.preventDefault()

      const userFormData = new FormData();  
      userFormData.append('username', username)
      userFormData.append('password', password)
      userFormData.append('password2', passwordTwo)
      userFormData.append('first_name', firstname)
      userFormData.append('last_name', lastname)
      userFormData.append('email', email)

      const customerFormData = new FormData();
      customerFormData.append("date_of_birth", dateofbirth)
      customerFormData.append("address", address) 
      customerFormData.append("phone_number", phonenumber)
      customerFormData.append("customer_since", "2023-03-23T15:30:42.903123Z")

      let response = await fetch('http://127.0.0.1:8000/users/', {
          method:'POST',
          body: userFormData,
      })

      .then((response) => response)
      .then((data) => console.log(data))
      .catch(err => console.log(err));
      
      let customerResponse = await fetch('http://127.0.0.1:8000/customers/', {
          method:'GET',
      })  

      let customerData = await customerResponse.json()
      let customerNum = customerData.length

      let newCustomerID = (customerData[customerNum-1]).user
      let newAPIID = newCustomerID-108

      customerFormData.append('user', newCustomerID)

      const accountFormData = new FormData();
      accountFormData.append("userid", newCustomerID)
      accountFormData.append("owner", newAPIID)
      accountFormData.append("account_type", "chequing")
      accountFormData.append("account_number", "0"+(newCustomerID.toString()))
      accountFormData.append("account_name", "ACCOUNT_"+(newCustomerID.toString()))
      accountFormData.append("balance", balance)
      accountFormData.append("branch", 1)

      setUser(null)
      localStorage.removeItem('authTokens')

      let regResponse = await fetch('http://127.0.0.1:8000/token/', {
          method: 'POST',
          body: userFormData
          
      })
      let regData = await regResponse.json()
      
      if (regResponse.status === 200) {
          setAuthTokens(regData)
          setUser(jwt_decode(regData.access))
          localStorage.setItem('authTokens', JSON.stringify(regData))

          console.log("token done")

          let response2 = await fetch('http://127.0.0.1:8000/customers/'+newAPIID+'/', {
              method:'PUT',
              body: customerFormData,
          })

          let accountResponse = await fetch('http://127.0.0.1:8000/accounts/', {
              method:'POST',
              body: accountFormData,
          })

      } else {
          console.log("response.status != 200")
      }


  }

    let boxClassnameOne = "dashboard-one bg-white text-xl";
    let boxClassnameTwo = "dashboard-two bg-white shadow-lg";
    let pageTitle = "text-4xl font-bold letters-fix -mt-2 text-rouLan"
    let inputLabelClass = "block text-slate-500 font-semibold md:text-right mb-1 md:mb-0 pr-4 text-xl"
    let inputBoxClass = "bg-white border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (

    <div>
        <div className="w-full overflow-hidden bg-slate-100">  

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <LogoBar />
            </div>
        </div>

        <div className={`${styles.paddingX} ${styles.flexCenter} newaccount-gradient`}>
            <div className={`${styles.boxWidth}`}>
                <NavBar />
            </div>
        </div>

        <div className={`${styles.paddingX} ${styles.flexCenter} mt-2`}>
                
            <div className={``}>

                    <div className={`${boxClassnameOne}`}>
                        <h2 className={`${pageTitle} text-center`}>Welcome to the City Bank family.</h2>
                        <h2 className={`${styles.flexCenter} text-jiLan text-3xl mt-4 mb-6`}>Tell us about yourself...</h2>
                        
                        <div className='grid grid-cols-2 gap-6 mx-16'>
                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Username</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} type="text" value={username} onChange={event => setUsername(event.target.value)} id="username" name="username" placeholder="janedoe" />
                                </div>
                            </div>
                            <div></div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>First Name</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} name="firstname" id="firstname" type="text" value={firstname} onChange={event => setFirstname(event.target.value)} placeholder="Jane" /></div>
                            </div>
                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Last Name</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} name="lastname" id="lastname" type="text" value={lastname} onChange={event => setLastname(event.target.value)} placeholder="Doe" /></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Password</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={password} onChange={event => setPassword(event.target.value)} id="password" name="password" type="password" placeholder="********" /></div>
                            </div>
                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Re-enter Password</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={passwordTwo} onChange={event => setPasswordTwo(event.target.value)} id="passwordtwo" name="passwordtwo" type="password" placeholder="********" /></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Email</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={email} onChange={event => setEmail(event.target.value)} id="email" name="email" type="text" placeholder="me@email.com" /></div>
                            </div>
                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Phone Number</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={phonenumber} onChange={event => setPhoneNumber(event.target.value)} id="phonenumber" name="phonenumber" type="text" placeholder="416-555-9050" /></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Date of Birth</label></div>

                                <div action="/action_page.php" class="flex items-center md:w-2/3">
                                    <input class={inputBoxClass} type="date" value={dateofbirth} onChange={event => setDateofBirth(event.target.value)} id="dateofbirth" name="dateofbirth" min="1920-01-01" />
                                </div>

                            </div>

                            <div></div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Address</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={address} onChange={event => setAddress(event.target.value)} id="address" name="address" type="text" placeholder="221B Baker Street" /></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Address 2</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={address2} onChange={event => setAddressTwo(event.target.value)} id="address2" name="address2" type="text" placeholder="Apartment 1901" /></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Postal Code</label></div>
                                <div class="md:w-2/3"><input class={inputBoxClass} value={postalcode} onChange={event => setPostalCode(event.target.value)} id="postalcode" name="postalcode" type="text" placeholder="A1A 1A1" /></div>
                            </div>

                            <div></div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Bank Balance</label></div>
                                <div class="md:w-2/3"><select value={balance} onChange={event => setBalance(event.target.value)} id="balance" name="balance" type="number" class={inputBoxClass}>
                                                          <option value="25000">25,000</option>
                                                          <option value="50000">50,000</option>
                                                          <option value="100000">100,000</option>
                                                          <option value="500000">500,000</option>
                                                      </select></div>
                            </div>

                            <div class="flex items-center">
                                <div class="md:w-1/3"><label class={inputLabelClass}>Currency</label></div>
                                <div class="md:w-2/3"><select value={currency} onChange={event => setCurrency(event.target.value)} id="currency" name="currency" type="text" class={inputBoxClass}>
                                                          <option value="cad">CAD</option>
                                                          <option value="usd">USD</option>
                                                          <option value="euro">EURO</option>
                                                          <option value="rmb">RMB</option>
                                                      </select></div>
                            </div>

                            

                        </div>

                        <h2 className={`${styles.flexCenter} text-jiLan text-xl mb-0 mt-10`}>
                            <button className='rounded-md bg-tianShuiBi px-6 py-4 text-md font-semibold
                                               leading-6 cursor-pointer text-white shadow-sm hover:bg-biCheng
                                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                               type="submit" onClick={register}>Sign up</button>
                        </h2>

                    </div>
            </div>

        </div>

        <div className={`${styles.flexCenter} flex-row mb-2 mx-2`}>
            <div className={`${boxClassnameTwo} flex-row university-ready-gradient`}>
                
                <div className='flex-col text-slate-50'>
                    <div className='flex-col text-slate-50 '>
                        <AcademicCapIcon className="h-16 w-16 mt-4 mb-2"/>
                        <h1 className={`text-4xl font-bold letters-fix mb-3 my-2`}>Get College Ready</h1>
                        <h1 className={`text-2xl font-semibold letters-fix mb-6`}>Resources to help you plan and pay for college</h1>
                        
                    </div>
                </div>
            </div>

            <div className={`${boxClassnameTwo} flex-row bank-tools-gradient`}>
                <div className='flex-col'>
                    <div className='flex-col text-slate-50'>
                        <h1 className={`text-3xl font-bold letters-fix mt-2 mb-2`}>Get tools. Get tips. Get peace of mind.</h1>
                        <h1 className={`text-xl font-semibold letters-fix mt-0 mb-2`}>Discover digital tools to help you budget, save, manage credit, and more.</h1>
                        <h1 className={`text-right -mr-4`}><button class="bg-white text-shiFa justify-end text-2xl font-bold py-4 px-6 rounded-full mt-5 -mb-2">Access the toolkit</button></h1>
                    </div>
                </div>
            </div>
        </div>


        <div className={`newaccount-gradient ${styles.paddingX} ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Footer />
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default NewAccount
