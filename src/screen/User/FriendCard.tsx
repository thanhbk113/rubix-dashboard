import { Card, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { MdOutlineFacebook, MdOutlineSportsBasketball } from 'react-icons/md';

import { H6, Small } from '@/components/Common/Typography';
import NextImage from '@/components/NextImage';

// component props interface
interface FriendCardProps {
  friend: {
    name: string;
    image: string;
    profession: string;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    dribbleUrl?: string;
  };
}

const FriendCard: FC<FriendCardProps> = () => {
  return (
    <Card sx={{ textAlign: 'center', padding: 3 }}>
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: 'primary.100',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        <NextImage
          src='/avatar/012-woman-2.svg'
          alt='User'
          width={50}
          height={50}
        />
      </Box>
      <H6 mt={2}>Selena Gomez</H6>
      <Small color='text.disabled'>Marketing Manager</Small>
      <Box marginTop={2}>
        <IconButton className='text-2xl'>
          <MdOutlineFacebook />
        </IconButton>
        <IconButton className='text-2xl'>
          <AiOutlineTwitter color='primary' />
        </IconButton>
        <IconButton className='text-2xl'>
          <AiOutlineInstagram color='warning' />
        </IconButton>
        <IconButton className='text-2xl'>
          <MdOutlineSportsBasketball color='error' />
        </IconButton>
      </Box>
    </Card>
  );
};

export default FriendCard;
