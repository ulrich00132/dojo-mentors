'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Input from './Input';

import { TbAirBalloon, TbPlaneTilt } from 'react-icons/tb';
import { GoRocket } from 'react-icons/go';

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'
import Register from '../auth/Register';
import ToggleButton from '../ToggleButton';
import Counter from './Counter';
import ToggleInput from './ToggleInput';
import Dropdown from './Dropdown';

export let hasMentorship = false; 

export const optionChatList = [
    {value: 'illimité', label: 'Illimité'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'},
    {value: '5', label: '5'},
    {value: '6', label: '6'},
    {value: '7', label: '7'},
    {value: '8', label: '8'},
    {value: '9', label: '9'},
];

export const optionResponseList = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
    {value: 6, label: 6},
    {value: 7, label: 7},
];

interface PlanSettingProps {
    sessionId: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    required?: boolean;
    mentorshipId: any;
    mentorship: boolean;
    mentorshipOnChange: (value: any) => void;
    growthPrice?: number;
    scalePrice?: number;
    advancedPrice?: number;
    growthPriceId?: string;
    scalePriceId?: string;
    advancedPriceId?: string;
    callPerMonthGrowth?: number;
    callPerMonthScale?: number;
    callPerMonthAdvanced?: number;
    callGrowthOnChange?: (value: any) => void;
    callScaleOnChange?: (value: any) => void;
    callAdvancedOnChange?: (value: any) => void;
    chatPerMonthGrowth?: string;
    chatGrowthOnChange?: (value: any) => void;
    chatPerMonthScale?: string;
    chatScaleOnChange?: (value: any) => void;
    chatPerMonthAdvanced?: string;
    chatAdvancedOnChange?: (value: any) => void;
    responseDelayGrowth?: number;
    responseGrowthOnChange?: (value: any) => void;
    responseDelayScale?: number;
    responseScaleOnChange?: (value: any) => void;
    responseDelayAdvanced?: number;
    responseAdvancedOnChange?: (value: any) => void;
    supportGrowthId?: any;
    supportGrowth?: boolean;
    supportGrowthOnChange?: (value: any) => void;
    supportScaleId?: any;
    supportScale?: boolean;
    supportScaleOnChange?: (value: any) => void;
    supportAdvancedId?: any;
    supportAdvanced?: boolean;
    supportAdvancedOnChange?: (value: any) => void;
    
}



const PlanSetting: React.FC<PlanSettingProps>  = ({
    sessionId="pricePerMinute",
    register,
    errors,
    disabled,
    required,
    mentorshipId,
    mentorship,
    mentorshipOnChange,
    growthPrice,
    scalePrice,
    advancedPrice,
    growthPriceId = "growthPrice",
    scalePriceId = "scalePrice",
    advancedPriceId = "advancedPrice",
    callPerMonthGrowth = 0,
    callPerMonthScale = 0,
    callPerMonthAdvanced = 0,
    callGrowthOnChange = () => {},
    callScaleOnChange = () => {},
    callAdvancedOnChange = () => {},
    chatPerMonthGrowth,
    chatGrowthOnChange = () => {},
    chatPerMonthScale,
    chatScaleOnChange = () => {},
    chatPerMonthAdvanced,
    chatAdvancedOnChange = () => {},
    responseDelayGrowth,
    responseGrowthOnChange = () => {},
    responseDelayScale,
    responseScaleOnChange = () => {},
    responseDelayAdvanced,
    responseAdvancedOnChange = () => {},
    supportGrowthId,
    supportGrowth,
    supportGrowthOnChange,
    supportScaleId,
    supportScale,
    supportScaleOnChange,
    supportAdvancedId,
    supportAdvanced,
    supportAdvancedOnChange,

    
}) => {
    
    

    // const [isChecked, setIsChecked] = useState(false);
    const [isChecked, setIsChecked] = useState(mentorship);
    
    
    // const toggleHandler = () => setIsOn((prev) => !prev)

    // const handleCheckboxChange = useCallback(() => {
    //     if (isChecked === true) {
    //         setIsChecked(false);
    //         mentorship === false;
    //     };

    //     if (isChecked === false) {
    //         setIsChecked(true);
    //         mentorship === true;
    //     }
    // }, [mentorship, hasMentorship, isChecked])

    // const handleCheckboxChange = () => {
        
    //     setIsChecked(isChecked => !isChecked);
        
    //     // if (isChecked) {
    //     //     mentorship = true;
    //     // }

    //     if (isChecked === true) {
    //         mentorship = true;
    //         hasMentorship = true;
    //     }
    //     if (isChecked === false) {
    //         mentorship = false;
    //         hasMentorship = false;
    //     }

    // };

    // ---- HANDLE IS CHECKED ------

    // if (isChecked === true) {
    //     mentorship = true;
    //     hasMentorship = true;
    // }
    // if (isChecked === false) {
    //     mentorship = false;
    //     hasMentorship = false;
    // }

    // useEffect(() => {
    //     hasMentorship = isChecked;
    //     mentorship = hasMentorship;
    //     setIsChecked(mentorship);

    // }, [isChecked, hasMentorship, mentorship])


    const [support, setSupport] = useState(false);
    
    const handleSupport = () => {
        setSupport(!support);
    } 
  
    return (
    <div>
       
        <div className='font-bold text-lg pt-4 z-50'>
            Session
        </div>
        <div className="font-medium text-neutral-600 pt-4 pb-4">
            Quel est le tarif à payer pour une session de mentorat d{"'"}un minimum de 30 minutes avec vous ?
        </div>
        <Input 
            id={sessionId}
            label='Par bloc de 30min'
            type='number'
            formatPrice
            required={required}
            register={register}
            errors={errors}
            disabled={disabled}
        />
        <hr className='h-1 bg-black mx-auto my-8' />

        {/* Toggle button */}


        <div className='flex justify-between items-center pt-4'>
            <div className='font-bold text-lg'>
                Formule abonnement
                <span className='text-neutral-600 text-md font-light'> (optionnel)
                </span>
            </div>
            <ToggleButton
                register={register}
                errors={errors}
                checked={mentorship}
                onChange={mentorshipOnChange}
                label={isChecked ? "Activé" : "Désactivé"}
                id={mentorshipId}
            />
        </div>

        <div 
            className={mentorship === true ? 'translate-y-0 ease-in-out duration-300 opacity-100' : 'translate-y-full animate-none opacity-0'} 
            >
            { mentorship === true && (
                <>
                    {/* GROWTH PLAN */}
                    <div>
                        
                        <div 
                            className='
                                flex 
                                flex-row 
                                items-center
                                gap-2
                                font-bold
                                text-xl
                                text-green
                                pb-4
                                pt-8
                                '
                            >
                            <TbAirBalloon size={24} />
                            Growth (Niveau 1)
                        </div>
                        <div className="font-medium text-neutral-600 pb-4 translate-y-1 transition-all">
                            {'Quel est le tarif à payer pour un plan de mentorat "Growth" ?'}
                        </div>
                        <div className='flex flex-col gap-6'>
                            <Input 
                                id={growthPriceId}
                                label='Prix mensuel Growth'
                                type='number'
                                formatPrice
                                required={required}
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />

                            <Counter 
                                title="Nombre maximum d'appels par mois"
                                subtitle='Combien de fois, le mentoré abonné à un plan "Growth" peut vous appeler par mois ?'
                                value={callPerMonthGrowth}
                                onChange={callGrowthOnChange}

                            />

                            <Dropdown
                                option={optionChatList}
                                value={chatPerMonthGrowth}
                                onChange={chatGrowthOnChange}
                                title='Nombre de messages via le chat'
                                subtitle='Combien de fois votre mentoré peut vous contacter via le chat pour le plan "Growth" ?'
                            />

                            <Dropdown
                                option={optionResponseList}
                                value={responseDelayGrowth}
                                onChange={responseGrowthOnChange}
                                title='Délai de réponse plan "Growth"'
                                subtitle='Combien de temps en moyenne votre mentoré peut espérer recevoir une réponse de votre part pour le plan "Growth" ?'
                            />
                            
                            <ToggleInput 
                                id={supportGrowthId}
                                checked
                                label='Support technique'
                                subtitle='Êtes-vous prêt à fournir une aide technique à votre mentoré dans un plan "Growth"?'
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    
                    
                    <hr className='h-1 bg-green mx-auto my-8' />
                    
                    
                    {/* SCALE PLAN */}
                    <div>
                        <div 
                            className='
                                flex 
                                flex-row 
                                items-center
                                gap-2
                                font-bold
                                text-lg
                                text-green
                                pb-4
                                '
                            >
                            <TbPlaneTilt size={24} />
                            Scale (Niveau 2)
                        </div>
                        <div className="font-medium text-neutral-600 pb-4 translate-y-1 transition-all">
                            Quel est le tarif à payer pour un plan de mentorat régulier mensuel ?
                        </div>
                        
                        <div className='flex flex-col gap-6'>
                            <Input 
                                id={scalePriceId}
                                label='Prix mensuel de mentorat'
                                type='number'
                                formatPrice
                                required={required}
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />

                            <Counter 
                                title="Nombre maximum d'appels par mois"
                                subtitle='Combien de fois, le mentoré abonné à un plan "Scale" peut vous appeler par mois ?'
                                value={callPerMonthScale}
                                onChange={callScaleOnChange}

                            />

                            <Dropdown
                                option={optionChatList}
                                value={chatPerMonthScale}
                                onChange={chatScaleOnChange}
                                title='Nombre de messages via le chat'
                                subtitle='Combien de fois votre mentoré peut vous contacter via le chat pour le plan "Scale" ?'
                            />

                            <Dropdown
                                option={optionResponseList}
                                value={responseDelayScale}
                                onChange={responseScaleOnChange}
                                title='Délai de réponse plan "Growth"'
                                subtitle='Combien de temps en moyenne votre mentoré peut espérer recevoir une réponse de votre part pour le plan "Scale" ?'
                            />
                            <ToggleInput 
                                id={supportScaleId}
                                checked
                                label='Support technique'
                                subtitle='Êtes-vous prêt à fournir une aide technique à votre mentoré dans un plan "Scale"?'
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />
                            
                            
                        </div>
                    </div>
                    
                    <hr className='h-1 bg-green mx-auto my-8' />

                    {/* ADVANCED PLAN */}
                    <div>
                        <div 
                            className='
                                flex 
                                flex-row 
                                items-center
                                gap-2
                                font-bold
                                text-lg
                                text-green
                                pb-4
                                '
                            >
                            <GoRocket size={24} />
                            Advanced (Niveau 3)
                        </div>
                        <div className="font-medium text-neutral-600 pb-4 translate-y-1 transition-all">
                            Quel est le tarif à payer pour un plan de mentorat régulier mensuel ?
                        </div>
                        
                        <div className='flex flex-col gap-6'>
                            <Input 
                                id={advancedPriceId}
                                label='Prix mensuel de mentorat'
                                type='number'
                                formatPrice
                                required={required}
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />

                            <Counter 
                                title="Nombre maximum d'appels par mois"
                                subtitle='Combien de fois, le mentoré abonné à un plan "Advanced" peut vous appeler par mois ?'
                                value={callPerMonthAdvanced}
                                onChange={callAdvancedOnChange}

                            />

                            <Dropdown
                                option={optionChatList}
                                value={chatPerMonthAdvanced}
                                onChange={chatAdvancedOnChange}
                                title='Nombre de messages via le chat'
                                subtitle='Combien de fois votre mentoré peut vous contacter via le chat pour le plan "Advanced" ?'
                            />

                            <Dropdown
                                option={optionResponseList}
                                value={responseDelayAdvanced}
                                onChange={responseAdvancedOnChange}
                                title='Délai de réponse plan "Growth"'
                                subtitle='Combien de temps en moyenne votre mentoré peut espérer recevoir une réponse de votre part pour le plan "Advanced" ?'
                            />

                            <ToggleInput 
                                id={supportAdvancedId}
                                checked
                                label='Support technique'
                                subtitle='Êtes-vous prêt à fournir une aide technique à votre mentoré dans un plan "Advanced"?'
                                register={register}
                                errors={errors}
                                disabled={disabled}
                            />
                            
                            
                        </div>
                    </div>
                </>
            )}
        </div>
        
    </div>
  )
}

export default PlanSetting