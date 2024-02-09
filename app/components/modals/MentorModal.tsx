'use client';

import useMentorModal from "@/app/hooks/useMentorModal"
import Modal from "./Modal"

import { useCallback, useEffect, useMemo, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import MultilineInput from "../inputs/MultilineInput";
import Input from "../inputs/Input";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { Expertises } from "../inputs/CategoryInput";

import { FiChevronDown } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { updatedList } from "../inputs/CategoryInput";


import useArray from "@/app/hooks/useArray";
import DashboardForm from "../dashboard/forms/DashboardForm";
import Counter from "../inputs/Counter";
import CompanySelect from "../inputs/CompanySelect";
import PlanSetting from "../inputs/PlanSetting";

export let listOfExpertise: string[] = []; 

import { hasMentorship } from "../inputs/PlanSetting";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { singleLevelNestedRoutes } from "@/app/libs/routes";




export enum STEPS {
    EXPERTISE = 0,
    LOCATION = 1,
    WORK= 2,
    ABOUT = 3,
    PLANS = 4,
    SOCIAL = 5,
    SUCCESSSTORY = 6,
}

const MentorModal = () => {
    
    const router = useRouter();
    
    const mentorModal = useMentorModal();

    const [step, setStep] = useState(STEPS.EXPERTISE);
    
    const {array, push, remove, filter} = useArray([]);

    const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);


    // HANDLE MENTORSHIP STATE
    const [toggleMentorship, setToggleMentorship] = useState(false);
    const handleMentorship = useCallback(() => {
        setToggleMentorship(prev => !prev);

    }, [toggleMentorship])


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            // isMentor: true,
            hasMentorshipPlan: false,
            avatar: "",
            bio: "",
            profileTitle: "",
            location: null,
            company: "",
            position: "",

            // isPremium: false,
            menteeCount: 1.00,

            linkedIn: "",
            twitter: "",
            facebook: "",
            instagram: "",
            website: "",

            sucessStory: "",

            myExpertise: [],

            sessionPrice: 25,
            minTimeBlock: 30,

            growthPrice: 50,
            scalePrice: 120,
            advancedPrice: 180,

            callPerMonthGrowth: 3,
            callPerMonthScale: 3,
            callPerMonthAdvanced: 3,

            chatPerMonthGrowth: "",
            chatPerMonthScale: "",
            chatPerMonthAdvanced: "",

            responseDelayGrowth: 1,
            responseDelayScale: 1,
            responseDelayAdvanced: 1,

            supportGrowth: false,
            supportScale: false,
            supportAdvanced: false,

            slug: "",

        }
    });

    const expertise = watch('myExpertise');
    const location = watch('location');
    // const company = watch('company');
    const menteeCount = watch('menteeCount');
    const avatar = watch('avatar');
    const hasMentorshipPlan = watch('hasMentorshipPlan');
    const growthPrice = watch('growthPrice');
    const scalePrice = watch('scalePrice');
    const advancedPrice = watch('advancedPrice');
    const callPerMonthGrowth = watch('callPerMonthGrowth');
    const callPerMonthScale = watch('callPerMonthScale');
    const callPerMonthAdvanced = watch('callPerMonthAdvanced');
    const chatPerMonthGrowth = watch('chatPerMonthGrowth');
    const chatPerMonthScale = watch('chatPerMonthScale');
    const chatPerMonthAdvanced = watch('chatPerMonthAdvanced');
    const responseDelayGrowth = watch('responseDelayGrowth');
    const responseDelayScale = watch('responseDelayScale');
    const responseDelayAdvanced = watch('responseDelayAdvanced');
    const supportGrowth = watch('supportGrowth');
    const supportScale = watch('supportScale');
    const supportAdvanced = watch('supportAdvanced');
    
    
    const [selectedOptions, setSelectedOptions] = useState();
    const [selectedDelay, setSelectedDelay] = useState(0);

    function handleSelect(chatPerMonthGrowth: any) {
        setSelectedOptions(chatPerMonthGrowth)
    }

    function handleSelectedDelay(responseDelayGrowth: any) {

    }


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.SUCCESSSTORY) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('api/profiles', data)
        .then(() => {
            toast.success("🙌 Profil mentor créé avec succès!");
            // router.refresh();
            reset();
            setStep(STEPS.EXPERTISE);
            mentorModal.onClose();
            router.push(process.env.NEXT_PUBLIC_APP_URL + singleLevelNestedRoutes.account.payments)
        })
        .catch(() => {
            toast.error("😞 Oups, Une erreur est survenue !");
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.SUCCESSSTORY) {
            return "Valider"
        }
        return "Suivant"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.EXPERTISE) {
            return undefined;
        }
        return "Précédent"
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Quelles catégories décrivent le mieux vos compétences?"
                subtitle="Sélectionnez une ou plusieurs expertises."
            />

            <div className="flex flex-auto flex-wrap gap-3">
                
                {listOfExpertise.map((item: string) => (
                    <div 
                        key={item}
                        onClick={() => {}}
                        className="
                            flex
                            flex-row
                            justify-between
                            items-center
                            gap-4
                            bg-roseLight
                            border-2
                            border-rose
                            px-3
                            py-2.5
                            whitespace-nowrap

                        "
                    
                    >
                        <div>
                            {item}
                        </div>
                        <div 
                            onClick={() => {
                                // const toRemove = listOfExpertise.indexOf(expertise)
                                // listOfExpertise.splice(toRemove, 1);
                                // push(listOfExpertise);

                                const toRemove = listOfExpertise.indexOf(item)
                                listOfExpertise.splice(toRemove, 1)

                                push(item);
                                    
                            }}
                            className="
                                text-grey 
                                hover:text-rose 
                                hover:bg-black 
                                transition 
                                duration-200 
                                ease-in-out
                                cursor-pointer
                                "
                            >
                            <IoMdClose size={24} />
                        </div>
                    </div>
                ))}


            </div>
            
            <div
                className="
                    flex
                    flex-col
                    gap-3
                "
            >

                {/* Show expertise par category (label) */}
                {categories.map((item) => (
                    <div 
                        key={item.label}
                        className="col-span-1"
                    >   
                            <CategoryInput
                                onClick={(expertise) => 
                                setCustomValue('myExpertise', expertise)}
                                label={item.label}
                                icon={item.icon}
                                skill={item.skills}
                                onExpertiseSelect={item.skills}
                                selected={expertise === item.label}
                            />
                        
                    </div>
                ))}

            </div>

        </div>
    );

    // if (step === STEPS.TOPICS) {
        
    //     const selectedCategory = categories.find((item) => item.skills.some((skill) => skill.expertise === selectedExpertise));

    //     if (selectedCategory) {

    //         bodyContent = (
                
    //             <div
    //                 className="flex flex-col gap-3"
    //             >
    //                <div>
    //                 TOPICS
    //                </div>
    //                <div className="font-semibold text-rose">
    //                 Selected Expertise: {selectedExpertise}
    //                </div>
    //                <div className="bg-blue">
    //                 {selectedCategory.skills
    //                     .filter((skill) => skill.expertise === selectedExpertise)
    //                     .map((skill) => (
    //                         <div key={skill.expertise}>
    //                             {skill.expertise}
    //                             <div className="bg-white">
    //                                 {skill.topics.join(', ')}
    //                             </div>
    //                         </div>
                            
    //                     ))
    //                 }

    //                </div>
    //             </div>
    //         )
    //     }
        
    // };

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Dans quelle ville vivez-vous ?"
                    subtitle="Sélectionnez la ville dans laquelle vous vivez actuellement."
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                    
                />
            </div>
        )
    }

    if (step === STEPS.WORK) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Parlez de votre poste à vos mentorés."
                    subtitle="Vos mentorés aimeraient en savoir plus sur vous."
                />

                <div className="flex flex-col gap-4">
                    <Input 
                            id="position"
                            label="Votre poste actuel"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    <div>
                        <Input 
                            id="company"
                            label="Dans quelle entreprise travaillez-vous actuellement ?"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>

                <div>
                    {/* <CompanySelect
                        value={company}
                        onChange={(value) => setCustomValue('company', value)}
                        title="Dans quelle entreprise travaillez-vous actuellement ?"
                        subtitle="Sélectionnez l'entreprise dans laquelle vous travaillez actuellement."
                    /> */}

                    {/* <Input 
                        id="company"
                        label="Dans quelle entreprise travaillez-vous actuellement ?"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    /> */}

                </div>
                

            </div>
        )
    };


    if (step === STEPS.ABOUT) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading 
                title="Ajoutez une photo de profil"
                subtitle="Une photo de vous permet d'établir une relation de confiance avec vos mentorés."
            />
            <ImageUpload
                value={avatar}
                onChange={(value) => setCustomValue('avatar', value)}
            />

            <div className="pb-8">
                <Input 
                    id="profileTitle"
                    label="Titre de votre profil"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    maxLength={54}
                />

            </div>
            <div>
                <MultilineInput 
                    id="bio"
                    label="Bio"
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                    placeholder="Tapez votre bio ici..."
                    wordCounter
                    length={4000}
                />
            </div>
          </div>  
        );
    }



    if (step === STEPS.PLANS) {
        bodyContent = (
            
            <div className="flex flex-col gap-8 z-[100]">
                
                <Heading 
                    title="Fixez vos prix et services"
                    subtitle="Quel sont les services que vous proposez et à quel(s) prix ?"
                />

                <Counter 
                    title="Combien de mentorés acceptez-vous par période?"
                    subtitle="Sélectionner un nombre maximum de mentorés."
                    value={menteeCount}
                    onChange={(value) => setCustomValue('menteeCount', value)}
                />
                
                <PlanSetting 
                    sessionId="sessionPrice"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    required
                    mentorshipId={'hasMentorshipPlan'}
                    mentorship={toggleMentorship}
                    mentorshipOnChange={handleMentorship}
                    growthPriceId="growthPrice"
                    scalePriceId="scalePrice"
                    advancedPriceId="advancedPrice"
                    growthPrice={growthPrice}
                    scalePrice={scalePrice}
                    advancedPrice={advancedPrice}
                    callPerMonthGrowth={callPerMonthGrowth}
                    callPerMonthScale={callPerMonthScale}
                    callPerMonthAdvanced={callPerMonthAdvanced}
                    callGrowthOnChange={(value) => setCustomValue('callPerMonthGrowth', value)}
                    callScaleOnChange={(value) => setCustomValue('callPerMonthScale', value)}
                    callAdvancedOnChange={(value) => setCustomValue('callPerMonthAdvanced', value)}
                    chatPerMonthGrowth={chatPerMonthGrowth}
                    chatGrowthOnChange={(selectedOptions) => setCustomValue("chatPerMonthGrowth", selectedOptions)}
                    chatPerMonthScale={chatPerMonthScale}
                    chatScaleOnChange={(selectedOptions) => setCustomValue("chatPerMonthScale", selectedOptions)}
                    chatPerMonthAdvanced={chatPerMonthAdvanced}
                    chatAdvancedOnChange={(selectedOptions) => setCustomValue("chatPerMonthAdvanced", selectedOptions)}
                    responseDelayGrowth={responseDelayGrowth}
                    responseGrowthOnChange={(selectedDelay) => setCustomValue("responseDelayGrowth", selectedDelay)}
                    responseDelayScale={responseDelayScale}
                    responseScaleOnChange={(selectedDelay) => setCustomValue("responseDelayScale", selectedDelay)}
                    responseDelayAdvanced={responseDelayAdvanced}
                    responseAdvancedOnChange={(selectedDelay) => setCustomValue("responseDelayAdvanced", selectedDelay)}
                    supportGrowthId="supportGrowth"
                    supportGrowth={supportGrowth}
                    supportScaleId={"supportScale"}
                    supportScale={supportScale}
                    supportAdvancedId="supportAdvanced"
                    supportAdvanced={supportAdvanced}
                />

            </div>
        )
    }

    if (step === STEPS.SOCIAL) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Réseaux sociaux"
                    subtitle="Vos mentorés aimeraient suivre sur vos activités sur les réseaux sociaux."
                />
                <div className="flex flex-col gap-4">
                    <Input 
                        id="linkedIn"
                        label="LinkedIn"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        
                    />
                    <Input 
                        id="website"
                        label="Site web"
                        disabled={isLoading}
                        register={register}
                        errors={errors}

                    />
                    <Input 
                        id="twitter"
                        label="Twitter"
                        disabled={isLoading}
                        register={register}
                        errors={errors}

                    />
                    <Input 
                        id="facebook"
                        label="Facebook"
                        disabled={isLoading}
                        register={register}
                        errors={errors}

                    />
                    <Input 
                        id="instagram"
                        label="Instagram"
                        disabled={isLoading}
                        register={register}
                        errors={errors}

                    />
                    

                </div>
                

            </div>
        )

    }

    if (step === STEPS.SUCCESSSTORY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="✨ Success-story"
                    subtitle="Racontez une brève success-story dont vous êtes fier(e)"
                />

            <div>
                <MultilineInput 
                    id="sucessStory"
                    label="Success-story"
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                    placeholder={"Il était une fois..."}
                    wordCounter
                    length={1200}
                />
            </div>

            </div>
        )
    }

    return (
    <Modal 
        isOpen={mentorModal.isOpen}
        onClose={mentorModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.EXPERTISE ? undefined : onBack}
        title="Devenir un mentor"
        body={bodyContent}
    />
  )
}

export default MentorModal