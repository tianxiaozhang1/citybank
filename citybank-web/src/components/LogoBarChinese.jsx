import React from 'react'

const LogoBarChinese = () => (
    <div>
        <div className='flex flex-row text-jiLan mt-2 mb-2'>

            <div className='flex-1'><h1 className='flex cursor-pointer text-[36px] chinese-text font-bold'>城市银行&nbsp;<div className='font-Aldrich mt-1'>CITY BANK</div></h1></div>
            {/* <ul className='flex-childlist-none flex flex-col justify-end items-center flex-1'> */}
                
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                自动取款机/网点查询
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                关于我们
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center mr-10'>
                帮助
            </p>
            <p className='flex font-poppins font-normal cursor-pointer text-[16px] items-center'>
                English
            </p>

            {/* </ul> */}

        </div>
        

    </div>
)

export default LogoBarChinese
