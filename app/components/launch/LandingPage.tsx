'use client';

import Button from '../Button';


import useRegisterModal from '@/app/hooks/useRegisterModal';

const LandingPage = () => {
    
    const registerModal = useRegisterModal();
    
    return (
    <div className='flex flex-col justify-center items-center'>
        <div className='text-lg text-purple font-semibold'>
        Mentor coaching 1:1
        </div>
        <div className='text-3xl md:text-5xl font-bold text-center m-12'>
          <div className='mb-4 mt-4'>
            Ils l{"'"}ont déjà <span className='text-rose'>réalisé</span>.
          </div>
          <div>
            Profitez de leur expérience.
          </div>
        </div>

        <div className='text-base md:text-2xl mb-4 text-gray-700 text-center p-4'>
            Obtenez 30 min d{"'"}<span className='font-bold'>appel gratuit</span> avec un mentor
        </div>

        <div>
          <Button
            label="M'inscrire pour le lancement"
            onClick={registerModal.onOpen}
            outline
          />
          </div>


        <div 
          className='
            flex
            flex-row
            border-l-4
            border-rose
            m-24
            pl-8
            w-3/5
            lg:w-1/2
            text-gray-600
          '
        >
          Un mentor est une inspiration, le coach nécessaire pour atteindre des résultats à la hauteur de vos ambitions.

        </div>
    </div>
  )
}

export default LandingPage