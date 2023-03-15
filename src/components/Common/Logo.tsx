import { FC } from 'react';

import NextImage from '@/components/NextImage';

type ILogo = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Logo: FC<ILogo> = () => {
  return (
    <span className='absolute top-6 left-8 h-4 w-20'>
      <NextImage
        width={100}
        height={40}
        src='/image/logo_black.png'
        alt=''
        className='h-full w-full'
      />
    </span>
  );
};

export default Logo;
