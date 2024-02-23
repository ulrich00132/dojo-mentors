"use client";

import Button from "../Button";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Counter from "../inputs/Counter";
import { useMemo, useState } from "react";
import InputSimple from "../inputs/InputSimple";
import Image from "next/image";

const LandingPage = () => {
  const registerModal = useRegisterModal();
  const [value, setValue] = useState(4);
  const [mentoringPrice, setMentoringPrice] = useState(120);

  const mentoringMonthlyOutcome = useMemo(() => {
    return mentoringPrice * value;
  }, [mentoringPrice, value]);
  const mentoringYearlyOutcome = useMemo(() => {
    return mentoringPrice * value * 12;
  }, [mentoringPrice, value]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full max-w-4xl mx-auto mt-4">
      {/* <div className='text-lg text-purple font-semibold'>
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

        </div> */}

      {/* IMAGES  */}
      {/* <div
          className='grid grid-cols-3 w-full'
        >
          <div className='aspect-square relative overflow-hidden col-span-1'>
            <Image 
              fill
              src="/images/copywriting-mentor.png"
              alt='Copywriting mentor'

            />
          </div>
          <div className='aspect-square relative overflow-hidden col-span-1'>
            <Image 
              fill
              src="/images/copywriting-mentor.png"
              alt='Copywriting mentor'

            />
          </div>
          <div className='aspect-square relative overflow-hidden col-span-1'>
            <Image 
              fill
              src="/images/copywriting-mentor.png"
              alt='Copywriting mentor'

            />
          </div>
          
        </div> */}

      <div className="flex flex-col justify-center items-center gap-8 mx-4">
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-center">
          Monétise tes connaissances
        </h1>
        <h2 className="px-4 lg:px-12 text-xl text-center text-neutral-600">
          {/* Tu as des compétences qui pourraient aider des personnes moins avancées que toi. */}
          <strong>Tu as plus de compétences</strong> que beaucoup de vendeurs de
          formations sur internet.
        </h2>
        <div
          className="
            aspect-square
            w-3/4
            lg:w-1/2
            relative
            overflow-hidden
            "
        >
          <Image
            alt="Merci"
            src={"/images/give-me-five-mentor.png"}
            fill
            className="object-cover w-full"
            
          />
        </div>

        <div
        onClick={registerModal.onOpen}
        className="
            bg-black
            border-2
            border-black
            text-white
            text-md
            lg:text-xl 
            p-4 
            cursor-pointer 
            transition-all
            shadow-[5px_5px_0px_0px_rgb(164,164,164)]
            hover:bg-white
            hover:text-black
            hover:shadow-[5px_5px_0px_0px_rgb(0,0,0)]
            "
      >
        M'inscrire pour le lancement 🚀
      </div>
        
        <p className="px-4 lg:px-12 text-xl text-center text-neutral-600 mt-8">
          Dojo Mentors est une communauté de personnes qui échangent leurs connaissances à travers une session de <strong className="text-rose">coaching</strong> ou de <strong className="text-rose">mentoring</strong> . Une communauté de personnes comme toi qui partagent ou apprennent de nouvelles compétences auprès de personnes qui
          ont réellement le savoir dont elles parlent car elles
          l'utilisent tous les jours dans leurs activés.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex flex-row lg:flex-col justify-center bg-transparent lg:bg-yellow items-center gap-2 p-4 w-screen lg:w-1/3">
            <div className="text-2xl">🧠</div>
            <h1 className="text-md md:text-2xl lg:text-3xl font-semibold lg:text-center">
              Partage tes connaissances
            </h1>
          </div>

          <div className="flex flex-row lg:flex-col justify-center bg-transparent lg:bg-rose items-center gap-2 p-4">
            <div className="text-2xl">🙌</div>
            <h1 className="text-md md:text-2xl lg:text-3xl font-semibold lg:text-center">
              Aide tes mentorés
            </h1>
          </div>

          <div className="flex flex-row lg:flex-col justify-center bg-transparent lg:bg-green items-center gap-2 p-4 w-screen lg:w-1/3">
            <div className="text-2xl">🤑</div>
            <h1 className="text-md md:text-2xl lg:text-3xl font-semibold lg:text-center">
            Reçois ta contribution
            </h1>
          </div>
        </div>

        <div
        onClick={registerModal.onOpen}
        className="
            bg-black
            border-2
            border-black
            text-white
            text-md
            lg:text-xl 
            p-4 
            cursor-pointer 
            transition-all
            shadow-[5px_5px_0px_0px_rgb(252,117,255)]
            hover:bg-white
            hover:text-black
            hover:shadow-[5px_5px_0px_0px_rgb(0,0,0)]
            mt-12
            lg:mt-20
            "
      >
        Je veux rejoindre les Dojo Mentors 🥋
      </div>

        
      </div>

      <div className="flex flex-col gap-8 border border-neutral-200 w-full p-8 shadow-xl">
        <h3 className="text-2xl">🤑 Calcule ton revenu potentiel</h3>
        <div className="bg-black flex flex-row justify-between text-rose text-4xl p-4">
          <div className="border-r border-neutral-100/40 w-1/2">
            <div className="flex flex-col">{mentoringMonthlyOutcome}€</div>
            <div className="text-sm">par mois</div>
          </div>

          <div className="flex flex-col">
            <div>{mentoringYearlyOutcome}€</div>
            <div className="text-sm">par an</div>
          </div>
        </div>
        <Counter
          title="Nombre de mentorés"
          subtitle="Combien de mentorés voudrais-tu accompagner par mois?"
          value={value}
          onChange={(value) => setValue(value)}
        />

        <InputSimple
          id="price"
          label="Prix mensuel"
          type="number"
          formatPrice
          value={mentoringPrice}
          onChange={(e: any) => setMentoringPrice(e.target.value)}
        />
      </div>

      <div
        onClick={registerModal.onOpen}
        className="
            bg-rose 
            text-white 
            text-xl 
            p-4 
            cursor-pointer 
            hover:bg-yellow 
            transition-all
            shadow-[5px_5px_0px_0px_rgb(0,0,0)]
            mt-20
          "
      >
        Devenir un Dojo Mentor 🥷
      </div>

      <div className="flex flex-col justify-center items-center border-t-neutral-100">
        <h3 className="text-black">🗣️ Envie de discuter? </h3>
        <p className="text-rose hover:underline hover:cursor-pointer">hello@dojomentors.com </p>
      </div>
    </div>
  );
};

export default LandingPage;
