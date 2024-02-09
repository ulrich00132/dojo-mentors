'use client';

import Image from "next/image";

interface ChatHeadProps {
    avatarSrc: string | undefined;
    status: boolean | undefined;
    receiverName: string;
}

const ChatHead: React.FC<ChatHeadProps> = ({
    avatarSrc,
    status,
    receiverName,
}) => {
  return (
    <div className="col-span-8">
        <div className="flex flex-row gap-8 w-full">
            <div
                    className="
                        aspect-square
                        w-1/6
                        relative
                        overflow-hidden
                        rounded-full
                    "
                >     
                    <Image
                        fill
                        alt={receiverName}
                        src={avatarSrc || "/images/placeholder"}
                        className="
                            object-cover
                            h-full
                            w-full
                        "
                    />
                    
                </div>
            

            <div className="flex flex-col justify-between w-full">
                <div className="text-xl font-semibold">
                    {receiverName}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="bottom-8 left-24 inset-x-0 p-2 bg-green w-[4px] h-[4px] rounded-full">
                    </div>
                    <div className="text-neutral-500">
                        online
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatHead