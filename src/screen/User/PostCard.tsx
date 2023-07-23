import {
  Avatar,
  Box,
  Card,
  IconButton,
  InputBase,
  styled,
  useTheme,
} from '@mui/material';
import React, { FC, MouseEvent } from 'react';
import { MdOutlineMoreVert, MdSend } from 'react-icons/md';

import FlexBox from '@/components/Common/FlexBox';
import { H5, Small, Tiny } from '@/components/Common/Typography';
import NextImage from '@/components/NextImage';
// component props interface
interface PostCardProps {
  post: {
    postTitle: string;
    postImage: string;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

// styled components
const ImageWrapper = styled(Box)(() => ({
  width: 48,
  height: 48,
  overflow: 'hidden',
  borderRadius: '50%',
}));

const PostImageWrapper = styled(Box)(() => ({
  width: '100%',
  marginTop: 16,
  overflow: 'hidden',
  borderRadius: '8px',
}));

const PostCard: FC<PostCardProps> = ({ post, handleMore }) => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 2, mb: 3 }}>
      <FlexBox justifyContent='space-between'>
        <FlexBox alignItems='center'>
          <ImageWrapper>
            <NextImage
              src='/static/user/user-10.png'
              alt='User'
              width={50}
              height={50}
            />
          </ImageWrapper>

          <Box marginLeft={1}>
            <H5 lineHeight={1}>Martha Hawk</H5>
            <Tiny fontWeight={500} color='text.disabled'>
              22 June 2020
            </Tiny>
          </Box>
        </FlexBox>

        <IconButton onClick={handleMore} className='text-2xl'>
          <MdOutlineMoreVert fontSize='small' color='disabled' />
        </IconButton>
      </FlexBox>

      <Box marginTop={3}>
        <Small fontWeight={600}>{post.postTitle}</Small>

        {post.postImage && (
          <PostImageWrapper>
            <NextImage
              src={post.postImage}
              alt='Post One'
              width={200}
              height={200}
              className='h-full w-full object-cover'
            />
          </PostImageWrapper>
        )}

        <FlexBox
          alignItems='center'
          justifyContent='space-between'
          my={2}
        ></FlexBox>

        <FlexBox alignItems='center' py={1}>
          <Avatar
            alt='User'
            src='/static/user/user-10.png'
            sx={{ width: 36, height: 36 }}
          />

          <InputBase
            placeholder='Write a comment'
            sx={{
              height: 36,
              paddingX: 2,
              fontSize: 13,
              width: '100%',
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: '8px',
              color: 'text.primary',
              backgroundColor:
                theme.palette.mode === 'light' ? 'secondary.200' : 'divider',
            }}
          />

          <IconButton>
            <MdSend fontSize='large' color='disabled' />
          </IconButton>
        </FlexBox>
      </Box>
    </Card>
  );
};

export default PostCard;
