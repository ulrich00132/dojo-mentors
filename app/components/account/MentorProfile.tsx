"use client";

import useDashboardForm from "@/app/hooks/useDashboardForm";
import { useEffect, useState, useMemo, useCallback } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import DashboardForm from "../dashboard/forms/DashboardForm";

import Container from "../Container";
import Heading from "../Heading";

import { SafeProfile, SafeUser, SafeAllProfiles } from "@/app/types";

// import { categories } from "../navbar/Categories";
import {
  categories,
  accountSettings,
  optionChatList,
  optionResponseList,
} from "@/app/libs/data";
import CategoryInput, { updatedList } from "../inputs/CategoryInput";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import useArray from "@/app/hooks/useArray";
// import { accountSettings } from "@/app/libs/data";
import EditCategory from "./EditCategory";
import CompanySelect from "../inputs/CompanySelect";
import CountrySelect from "../inputs/CountrySelect";

import useCountries from "@/app/hooks/useCountries";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import MultilineInput from "../inputs/MultilineInput";
import Counter from "../inputs/Counter";
import PlanSetting, { hasMentorship } from "../inputs/PlanSetting";
import Modal from "../modals/Modal";

import { MdKeyboardArrowDown, MdOutlineCheck } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

// import { hasMentorship } from "../inputs/PlanSetting";

export { accountSettings } from "@/app/libs/data";

export let listOfExpertise: string[] = [];

export enum STEPS {
  EXPERTISE = 0,
  LOCATION = 1,
  WORK = 2,
  ABOUT = 3,
  PLANS = 4,
  SOCIAL = 5,
  SUCCESSSTORY = 6,
}

interface MentorProfileProps {
  profile: SafeProfile & {
    mentor: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const MentorProfile: React.FC<MentorProfileProps> = ({
  profile,
  currentUser,
}) => {
  const dashboardForm = useDashboardForm();

  const [isLoading, setIsLoading] = useState(false);

  const filterChatOptions = (inputValue: string) => {
    return optionChatList.filter((i) =>
      i.label.toLocaleLowerCase().includes(inputValue)
    );
  };

  const filterDelayOptions = (inputValue: number) => {
    return optionResponseList.filter((i) => i.label === inputValue);
  };

  const router = useRouter();
  const { array, push, remove, filter } = useArray([]);

  const [step, setStep] = useState(STEPS.EXPERTISE);

  // listOfExpertise.splice(0, listOfExpertise.length, ...profile.myExpertise)

  // HANDLE MENTORSHIP STATE

  const initialMentorshipPlan = profile.hasMentorshipPlan;

  const [toggleMentorship, setToggleMentorship] = useState(
    initialMentorshipPlan
  );

  // useEffect(() => {
  //   setToggleMentorship(profile.hasMentorshipPlan)
  // }, [profile.hasMentorshipPlan])

  // const handleMentorship = useCallback(() => {

  //   setToggleMentorship(prev => !prev);

  // }, [initialMentoshipPlan]);

  const handleMentorship = () => {
    setToggleMentorship((prev) => !prev);
  };

  const { getByValue } = useCountries();
  const currentLocationValue = getByValue(profile.locationValue);

  // const currentExpertises = useMemo(() => {
  //   listOfExpertise = [...profile.myExpertise];

  //   const editedExpertises = listOfExpertise.slice();

  //   return editedExpertises

  // }, [listOfExpertise, profile.myExpertise]);

  const [currentExpertises, setCurrentExpertises] = useState<string[]>(
    profile.myExpertise.slice()
  );
  const currentCompany = profile.company;

  // If subscription is Yes

  // let hasMentorship = profile.hasMentorshipPlan
  // useEffect (() => {
  //   if(hasMentorship) {
  //       setCustomValue("hasMentorshipPlan", currentMentorship);
  //   };

  // }, [hasMentorship, profile.hasMentorshipPlan, currentMentorship]);

  // HANDLE LEFT MENU

  const [showMenuList, setShowMenuList] = useState(false);
  const handleShowMenu = () => {
    setShowMenuList((prev) => !prev);
  };

  const [selectedMenu, setSelectedMenu] = useState(step);

  const selectLeftMenu = useCallback(
    (step: number) => {
      setSelectedMenu(step);
      setStep(step);
      setShowMenuList(false)

      dashboardForm.onOpen();
    },
    [step, selectedMenu, setStep, dashboardForm]
  );

  const settingsMenu = accountSettings.map((setting, index) => (
    <div
      key={index}
      onClick={() => selectLeftMenu(index)}
      className={`
        flex 
        flex-col 
        p-2
        hover:text-black
        hover:bg-greenLight
        cursor-pointer
        border-b
        lg:border-transparent
        ${index === step ? "font-bold" : "font-normal"}
        ${index === step ? "text-black" : "text-neutral-500"}
        w-full
        md:w-[640px]
        lg:w-full
        mx-auto
      `}
    >
      <div className="flex flex-row justify-between">
        {setting}
        {index === step && (
          <MdOutlineCheck />
        )}

      </div>
    </div>
  ));

  // CHAT PER MONTH

  const chatGrowthCount = profile.chatPerMonthGrowth?.toLocaleLowerCase();
  const chatScaleCount = profile.chatPerMonthScale?.toLocaleLowerCase();
  const chatAdvancedCount = profile.chatPerMonthAdvanced?.toLocaleLowerCase();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      myExpertise: currentExpertises,
      id: profile.id,
      location: currentLocationValue,
      position: profile.position,
      company: currentCompany,
      avatar: profile.avatar,
      profileTitle: profile.profileTitle,
      bio: profile.bio,
      menteeCount: profile.menteeCount,
      sessionPrice: profile.sessionPrice,
      hasMentorshipPlan: toggleMentorship,
      growthPrice: profile.growthPrice,
      scalePrice: profile.scalePrice,
      advancedPrice: profile.advancedPrice,
      callPerMonthGrowth: profile.callPerMonthGrowth,
      callPerMonthScale: profile.callPerMonthScale,
      callPerMonthAdvanced: profile.callPerMonthAdvanced,
      chatPerMonthGrowth: filterChatOptions(chatGrowthCount as string),
      chatPerMonthScale: filterChatOptions(chatScaleCount as string),
      chatPerMonthAdvanced: filterChatOptions(chatAdvancedCount as string),
      responseDelayGrowth: filterDelayOptions(
        profile.responseDelayGrowth as number
      ),
      responseDelayScale: filterDelayOptions(
        profile.responseDelayScale as number
      ),
      responseDelayAdvanced: filterDelayOptions(
        profile.responseDelayAdvanced as number
      ),
      supportGrowth: profile.supportGrowth,
      supportScale: profile.supportScale,
      supportAdvanced: profile.supportAdvanced,
      linkedIn: profile.linkedIn,
      twitter: profile.twitter,
      facebook: profile.facebook,
      instagram: profile.instagram,
      website: profile.website,
      sucessStory: profile.sucessStory,
    },
  });

  const expertise = watch("myExpertise");
  const location = watch("location");
  const company = watch("company");
  const avatar = watch("avatar");
  const menteeCount = watch("menteeCount");
  const hasMentorshipPlan = watch("hasMentorshipPlan");
  const growthPrice = watch("growthPrice");
  const scalePrice = watch("scalePrice");
  const advancedPrice = watch("advancedPrice");
  const callPerMonthGrowth = watch("callPerMonthGrowth");
  const callPerMonthScale = watch("callPerMonthScale");
  const callPerMonthAdvanced = watch("callPerMonthAdvanced");
  const chatPerMonthGrowth = watch("chatPerMonthGrowth");
  const chatPerMonthScale = watch("chatPerMonthScale");
  const chatPerMonthAdvanced = watch("chatPerMonthAdvanced");
  const responseDelayGrowth = watch("responseDelayGrowth");
  const responseDelayScale = watch("responseDelayScale");
  const responseDelayAdvanced = watch("responseDelayAdvanced");
  const supportGrowth = watch("supportGrowth");
  const supportScale = watch("supportScale");
  const supportAdvanced = watch("supportAdvanced");

  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedDelay, setSelectedDelay] = useState(0);

  function handleSelect(chatPerMonthGrowth: any) {
    setSelectedOptions(chatPerMonthGrowth);
  }

  function handleSelectedDelay(responseDelayGrowth: any) {}

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // Add an expertise to the currentExpertises array
  const addExpertise = (expertise: string) => {
    setCurrentExpertises((prevExpertises) => [...prevExpertises, expertise]);
  };

  // Remove an expertise from the currentExpertises array
  const removeExpertise = (index: number) => {
    const newExpertises = [...currentExpertises];
    newExpertises.splice(index, 1);
    setCurrentExpertises(newExpertises);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // if (step !== STEPS.SUCCESSSTORY) {
    //   return onNext();
    // }
    setIsLoading(true);

    axios
      .post("/api/profiles/edit", data)
      .then(() => {
        toast.success("🙌 Profile has been updated!");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Oups! Somenthing went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    // if (step === STEPS.SUCCESSSTORY) {
    //   return "Mettre à jour";
    // }
    return "Mettre à jour";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.EXPERTISE) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Quelles catégories décrivent le mieux vos compétences?"
        subtitle="Sélectionnez une ou plusieurs expertises."
      />

      <div className="flex flex-auto flex-wrap gap-3">
        {currentExpertises.map((item: string) => (
          <div
            key={item}
            onClick={() => {}}
            className="
                        flex
                        flex-row
                        justify-between
                        items-center
                        gap-4
                        bg-pastelRose
                        border-2
                        border-rose
                        px-3
                        py-2.5
                        whitespace-nowrap

                    "
          >
            <div>{item}</div>
            <div
              onClick={() => {
                // const toRemove = listOfExpertise.indexOf(expertise)
                // listOfExpertise.splice(toRemove, 1);
                // push(listOfExpertise);

                const toRemove = currentExpertises.indexOf(item);
                currentExpertises.splice(toRemove, 1);

                push(item);
                removeExpertise;
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
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <EditCategory
              icon={category.icon}
              label={category.label}
              updatedExpertises={currentExpertises}
              selected={expertise === category.label}
              onClick={(expertise) => setCustomValue("myExpertise", expertise)}
              categoriesData={categories}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which country do you live in?"
          subtitle="Select the city in which you currently live"
        />

        <div className="w-full">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.WORK) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="What organization do you work for?"
          subtitle="Select a company"
        />

        <div>
          <Input
            id="position"
            label="Votre poste actuel"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>

        <hr />
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
    );
  }

  if (step === STEPS.ABOUT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Mettre à jour ma photo de profil"
          subtitle="Une photo de vous permet d'établir une relation de confiance avec vos mentorés."
        />

        <ImageUpload
          value={avatar}
          onChange={(value) => setCustomValue("avatar", value)}
        />

        <div className="pb-8">
          <Input
            id="profileTitle"
            label="Titre de votre profil"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          onChange={(value) => setCustomValue("menteeCount", value)}
        />

        <PlanSetting
          sessionId="sessionPrice"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
          mentorshipId={"hasMentorshipPlan"}
          mentorship={toggleMentorship as boolean}
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
          callGrowthOnChange={(value) =>
            setCustomValue("callPerMonthGrowth", value)
          }
          callScaleOnChange={(value) =>
            setCustomValue("callPerMonthScale", value)
          }
          callAdvancedOnChange={(value) =>
            setCustomValue("callPerMonthAdvanced", value)
          }
          chatPerMonthGrowth={chatPerMonthGrowth}
          chatGrowthOnChange={(value) =>
            setCustomValue("chatPerMonthGrowth", value)
          }
          chatPerMonthScale={chatPerMonthScale}
          chatScaleOnChange={(selectedOptions) =>
            setCustomValue("chatPerMonthScale", selectedOptions)
          }
          chatPerMonthAdvanced={chatPerMonthAdvanced}
          chatAdvancedOnChange={(selectedOptions) =>
            setCustomValue("chatPerMonthAdvanced", selectedOptions)
          }
          responseDelayGrowth={responseDelayGrowth}
          responseGrowthOnChange={(selectedDelay) =>
            setCustomValue("responseDelayGrowth", selectedDelay)
          }
          responseDelayScale={responseDelayScale}
          responseScaleOnChange={(selectedDelay) =>
            setCustomValue("responseDelayScale", selectedDelay)
          }
          responseDelayAdvanced={responseDelayAdvanced}
          responseAdvancedOnChange={(selectedDelay) =>
            setCustomValue("responseDelayAdvanced", selectedDelay)
          }
          supportGrowthId="supportGrowth"
          supportGrowth={supportGrowth}
          supportScaleId={"supportScale"}
          supportScale={supportScale}
          supportAdvancedId="supportAdvanced"
          supportAdvanced={supportAdvanced}
        />
      </div>
    );
  }

  if (step === STEPS.SOCIAL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Site web et réseaux sociaux"
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
    );
  }

  if (step === STEPS.SUCCESSSTORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="✨ Success-story"
          subtitle="Racontez une brève success-story dont vous êtes fier(e)"
        />

        <div className="whitespace-pre-wrap">
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
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-3
      "
      >
        <div className="col-span-2 lg:col-span-1 lg:ml-12 lg:max-w-xs p-8">
          <div
            onClick={handleShowMenu}
            className="flex flex-row justify-between lg:hidden border-2 border-black p-2"
          >
            <div className="flex flex-row gap-2">
              <HiMenuAlt2 size={24} /> 
              Menu
            </div>
            <MdKeyboardArrowDown />
          </div>
          <div
            className={`
            lg:block
            border
            lg:border-transparent
            ${showMenuList ? "block" : "hidden"}
          `}
          >
            {settingsMenu}
          </div>
        </div>
        <div 
          className={`
            col-span-1
            lg:col-span-2
            min-w-2xl
            max-w-2xl
            w-screen
            lg:block
            
          `}
        >
          <DashboardForm
            isOpen={true}
            onClose={dashboardForm.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
