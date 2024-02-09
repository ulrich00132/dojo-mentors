'use client';

interface BodyContainerProps {
    children: React.ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = (
    {children}
    ) => {

  return (
    <div
        className="
            max-w-[2520px]
            mx-auto
            xl:px-20
            md:px-10
            sm:px-2
            px-4
            bg-lightGrey
            h-screen
        "
    >
        {children}

    </div>
  )
}

export default BodyContainer