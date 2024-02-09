'use client';

import { BiChevronDown } from 'react-icons/bi';
import Link from 'next/link';

const Links = () => {
  return (
    <div 
        className='
            hidden
            
            items-center
            space-x-4
            flex-nowrap
        '
    >
        <div className='hover:text-rose cursor-pointer transition'>
            <Link href={"/"}>
                Trouver un mentor
            </Link>
        </div>
        <div className='hover:text-rose cursor-pointer transition flex items-center '>
            <Link 
                href={"/"}
                className='flex items-center'
            >
                Ressources
                <div>
                    <BiChevronDown />
                </div>
            </Link>
        </div>
        <div className='hover:text-rose cursor-pointer transition'>
            <Link href={"/"}>
                Pourquoi avoir un mentor?
            </Link>
        </div>

    </div>
  )
}

export default Links