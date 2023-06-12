import React from 'react';

import { PhoneIcon } from '@heroicons/react/24/solid';

const SideBar = () => {

    let sideCategory = "flex items-center px-4 py-2 my-2 text-rouLan rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-white font-bold text-xl shadow-md"
    let sideItem = "flex items-center px-3 my-2 text-slate-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-4 bg-white font-medium text-lg shadow-md"

    let contactUs = "items-center px-4 py-4 my-2 text-slate-500 rounded-lg bg-white font-semibold text-2xl shadow-md cursor-pointer border-solid"
    return (
        <div className='flex-col banking-navbar mr-1.5' aria-label="Sidebar">
            <div class="h-full text-lg dark:bg-gray-800">

                <div href="#" className={sideCategory}>Accounts</div>
                <div href="#" className={sideItem}>View Accounts</div>
                <div href="#" className={sideItem}>Statements & Documents</div>
                <div href="#" className={sideItem}>Order Foreign Currency</div>
                <div href="#" className={sideItem}>Small Business Accounts</div>
                <div href="#" className={sideItem}>Communications</div>
                <div href="#" className={sideItem}>Session History</div>

                <div href="#" className={sideCategory}>Pay Bills</div>
                <div href="#" className={sideCategory}>Transfers</div>
                <div href="#" className={sideCategory}>Interac e-Transfer®</div>
                <div href="#" className={sideCategory}>City Global Transfer</div>
                <div href="#" className={sideCategory}>Add Accounts & Services</div>
                <div href="#" className={sideCategory}>Profile & Settings</div>

                <div href="#" className={sideCategory}>Order Cheques</div>
                <div href="#" className={sideCategory}>Make a Stop Payment</div>
                <div href="#" className={sideCategory}>Change Delivery Method</div>
                <div href="#" className={sideCategory}>Apply for Products</div>

                <div href="#" className={contactUs}><div className='flex'><PhoneIcon className="h-8 w-8 mr-3 mt-4 font-thin text-rouLan" /><div>Questions?<br/>Answers.<div className='text-rouLan font-bold'>Talk to us.</div></div></div></div>
                
            </div>
        </div>
  )
}

export default SideBar
