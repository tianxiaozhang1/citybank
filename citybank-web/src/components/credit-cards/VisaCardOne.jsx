import React from 'react'

const VisaCardOne = () => {
  return (
    <div className='credit-card credit-card-front credit-card-gradient text-slate-200'>

                        <div className='flex'>
                            <div className='flex-1'>
                                <div className='credit-card-bank-square'></div>
                                <div className='credit-card-bank'>CITY BANK</div>
                            </div>
                            <div className='credit-card-top-right text-slate-100'>ACTIVE CASH</div>
                            {/* PLATINUM */}
                        </div>

                        <div className='flex flex-column justify-between'>
                            <div className=''>
                                <div className='flex-1 visa-card-chip visa-card-logo-gradient'></div>
                                <div className='flex-2 credit-card-chip-line-v1'></div>
                                <div className='flex-2 credit-card-chip-line-v2'></div>
                                <div className='flex-3 credit-card-chip-line-h1'></div>
                                <div className='flex-3 credit-card-chip-line-h2'></div>
                                <div className='flex-3 credit-card-chip-line-h3'></div>
                                <div className='flex-3 credit-card-chip-line-h3-1'></div>
                                <div className='flex-3 credit-card-chip-line-h3-2'></div>
                                <div className='flex-3 credit-card-chip-line-h3-3'></div>
                                <div className='flex-3 credit-card-chip-line-h4'></div>
                                <div className='flex-3 credit-card-chip-line-h5'></div>
                            </div>
                        </div>
                        
                        <div className='visa-card-contactless'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="236" height="56">
                                <path fill="none" stroke="#EAEEF1" stroke-width="6" stroke-linecap="round"
                                    d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5 0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                                />
                            </svg>
                        </div>

                        {/* <div className='credit-card-number text-slate-200'>1234 5678 1234 5678</div>
                        <div className='credit-card-expiry-date text-slate-300'>12/12</div> */}
                        <div className='credit-card-owner text-slate-300'>CARDHOLDER NAME</div>
                        <div className='visa-card-logo text-slate-200 '>VISA</div>
                        
                    </div>
  )
}

export default VisaCardOne
