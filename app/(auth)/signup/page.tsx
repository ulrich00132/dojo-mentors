'use client';

import Register from "@/app/components/auth/Register";
import Logo from "@/app/components/navbar/Logo";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Image from "next/image";
import styles from "@/app/styles/styles.module.css"

const Signup = () => {
  return (
    
    <div 
      className="
        flex
        flex-row
        justify-center
        h-screen
        bg-softGrey
      "
    >
      <ToasterProvider />
      
      <div className="w-full md:w-1/2 min-w-[50%] my-auto">
        <div className="flex flex-col items-center">
          <div className="mt-8 mb-12">
            <Logo 
              width={100}
              height={100}
            />
          </div>
          <Register />
        </div>
        
      </div>
      
      <div 
            className={`
              
              ${styles.authImageWrapper}
              w-1/2
              hidden
              xl:block
            `}
          >
            <div className="fixed bottom-2/4">
              <h2 className="text-white text-3xl pl-4">
                <span className="text-rose">{'"'}</span>Un mentor pour booster votre business<span className="text-rose">{'"'}</span>
              </h2>
            </div>
          </div>

      
      
    </div>
    
    
  )
}

export default Signup