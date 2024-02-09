'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ImageProps {
  width: number;
  height: number;
}

const Logo : React.FC<ImageProps> = ({
  width,
  height,
}) => {
    const router = useRouter();

    const imageSize = {
      width: `${width}px`,
      height: `${height}px`,
    };

  return (
    <Image 
        alt='logo'
        className='md:block cursor-pointer'
        src="/images/book-a-mentor-logo.svg"
        height={height}
        width={width}
        onClick={() => router.push('/')}
    />

    
  )
}

export default Logo