import React from 'react'

const LogoBar = () => (
    <div>
        <div className='flex flex-row text-jiLan mt-2 mb-2'>

            <h1 className='flex-1 cursor-pointer text-[36px] font-Aldrich font-bold'>CITY BANK</h1>
            {/* <ul className='flex-childlist-none flex flex-col justify-end items-center flex-1'> */}
                
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                ATM/Branch
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                About Us
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                Help
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center'>
                中文
            </p>

            {/* </ul> */}

        </div>
        

    </div>
)

export default LogoBar
