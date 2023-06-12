import { useState } from 'react'

import { close, logo, menu } from '../assets';
import { navLinksChinese } from '../constants';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const NavBarChinese = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <div className='w-full flex flex-row'>
        <nav className='flex-1 py-6 justify-between items-center navbar'>
            {/* <img src={logo} alt="hoobank" className='w-[124px] h-[32px]'/> */}

            {/* <h1 className='font-poppins font-normal cursor-pointer text-[36px] text-jiLan'>Reinhardt Bank</h1> */}

            <ul className='list-none sm:flex hidden justify-left items-center flex-1'>
                {navLinksChinese.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`cursor-pointer text-[20px] ${index===navLinksChinese.length-1?'mr-0':'mr-10'} text-slate-100 font-semibold`}
                    >
                        <a href={`#${nav.id}`}>
                            {nav.title}
                        </a>
                    </li>
                ))}
            </ul>

            <div className='sm:hidden flex flex-1 justify-end items-center'>
                <img src={toggle ? close : menu}
                alt="menu"
                className='w-[28px] h-[28px] object-contain cursor-pointer'
                onClick={() => setToggle((prev)=>!prev)}
                />

                <div className={`${toggle ? 'flex' : 'hidden'}
                                p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>

                    <ul className='list-none flex flex-col justify-end items-center flex-1'>
                        {navLinksChinese.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-normal cursor-pointer text-[16px] ${index===navLinksChinese.length-1? 'mb-0':'mb-4'} text-white`}
                            >
                                <a href={`${nav.id}`}>
                                    {nav.title}
                                </a>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>

        <div className='flex text-slate-100 items-center text-[20px]'>今天能帮您什么？ <MagnifyingGlassIcon className="h-6 w-6 ml-1 text-bold" /></div>
    </div>
  )
}

export default NavBarChinese
