"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Image from "next/image";

interface ReferralSucessProps {
  currentUser: SafeUser | null;
}

const ReferralSuccess: React.FC<ReferralSucessProps> = ({ currentUser }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-2xl md:text-4xl font-semibold">
            <div className="text-4xl lg:text-6xl text-rose text-center">
                {currentUser?.firstName} !
            </div>
            <div>
                Tu es une bonne personne 😇  
            </div>
        </div>
        <div className="text-lg text-neutral-500">
          {"Ton ami(e) ne te remerciera jamais assez pour ça."}
        </div>
      </div>
      <div
        className="
            aspect-square
            w-1/2
            relative
            overflow-hidden
            "
      >
        <Image
          alt="Merci"
          src={"/images/thank-you.jpg"}
          fill
          className="object-cover w-full"
        />
      </div>
      <div className="w-1/2">
        <Button
          label="Aller à l'accueil"
          onClick={() => router.push(process.env.NEXT_PUBLIC_APP_URL!)}
        />
      </div>
    </div>
  );
};

export default ReferralSuccess;
