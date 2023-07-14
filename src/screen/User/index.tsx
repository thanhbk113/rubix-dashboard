import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, styled, Tab } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

import RubixAvatar from '@/components/Common/Avatar';
import FlexBox from '@/components/Common/FlexBox';
import SearchInput from '@/components/Common/SearchInput';
import { H3, Small } from '@/components/Common/Typography';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import FollowerCard from '@/screen/User/FollowerCard';
import FriendCard from '@/screen/User/FriendCard';
import Gallery from '@/screen/User/Gallery';
import Profile from '@/screen/User/Profile';
import { WithLayout } from '@/shared/types';
import { ResUser } from '@/shared/types/userType';

// styled components
const StyledCard = styled(Card)(() => ({
  position: 'relative',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: 'center',
  position: 'relative',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: '100%',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTabs-flexContainer': {
      minWidth: 400,
      justifyContent: 'space-between',
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const UserProfile: WithLayout = () => {
  const [user, setUser] = useState<ResUser>();

  console.log(user);

  useEffect(() => {
    CmsApi.getUSer('3ac9ca9b-ec3b-4375-859b-fa0aabfda30b').then((res) => {
      setUser(res.data);
    });
  }, []);
  const [value, setValue] = useState('1');

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <StyledCard>
          <Box sx={{ height: 200, width: '100%', overflow: 'hidden' }}>
            <NextImage
              src='/background/user-cover-pic.png'
              alt='User Cover'
              height='200'
              width='2000'
              className='h-full w-full object-cover'
            />
          </Box>

          <FlexBox
            flexWrap='wrap'
            padding='0 2rem'
            alignItems='center'
            justifyContent='space-between'
          >
            <ContentWrapper>
              <RubixAvatar
                src='/avatar/001-man.svg'
                sx={{
                  border: 4,
                  width: 100,
                  height: 100,
                  borderColor: 'background.paper',
                }}
              />

              <Box marginLeft={3} marginTop={3}>
                <H3 lineHeight={1.2}>{user?.username}</H3>
                <Small color='text.disabled'>UI Designer</Small>
              </Box>
            </ContentWrapper>

            <StyledTabList onChange={handleChange}>
              <StyledTab label='Profile' value='1' />
              <StyledTab label='Follower' value='2' />
              <StyledTab label='Friends' value='3' />
              <StyledTab label='Gallery' value='4' />
            </StyledTabList>
          </FlexBox>
        </StyledCard>

        <Box marginTop={3}>
          <StyledTabPanel value='1'>
            <Profile />
          </StyledTabPanel>

          <StyledTabPanel value='2'>
            <Grid container spacing={3}>
              {followers.map((item, index) => (
                <Grid item lg={4} sm={6} xs={12} key={index}>
                  <FollowerCard follower={item} />
                </Grid>
              ))}
            </Grid>
          </StyledTabPanel>

          <StyledTabPanel value='3'>
            <H3>Friends</H3>
            <SearchInput placeholder='Search Friends...' sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {friends.map((friend, index) => (
                <Grid item lg={4} sm={6} xs={12} key={index}>
                  <FriendCard friend={friend} />
                </Grid>
              ))}
            </Grid>
          </StyledTabPanel>

          <StyledTabPanel value='4'>
            <Gallery />
          </StyledTabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

UserProfile.getLayout = (page) => <Layout>{page}</Layout>;

const followers = [
  {
    image: '/avatar/040-man-11.svg',
    name: 'Mr. Breast',
    profession: 'Product Designer',
    following: true,
  },
  {
    image: '/avatar/041-woman-11.svg',
    name: 'Ethan Drake',
    profession: 'UI Designer',
    following: true,
  },
  {
    image: '/avatar/042-vampire.svg',
    name: 'Selena Gomez',
    profession: 'Marketing Manager',
    following: false,
  },
  {
    image: '/avatar/043-chef.svg',
    name: 'Sally Becker',
    profession: 'UI Designer',
    following: true,
  },
  {
    image: '/avatar/044-farmer.svg',
    name: 'Dua Lipa',
    profession: 'Marketing Manager',
    following: false,
  },
  {
    image: '/avatar/045-man-12.svg',
    name: 'Joe Murry',
    profession: 'Product Designer',
    following: true,
  },
  {
    image: '/avatar/040-man-11.svg',
    name: 'Mr. Breast',
    profession: 'Product Designer',
    following: true,
  },
  {
    image: '/avatar/041-woman-11.svg',
    name: 'Ethan Drake',
    profession: 'UI Designer',
    following: true,
  },
  {
    image: '/avatar/042-vampire.svg',
    name: 'Selena Gomez',
    profession: 'Marketing Manager',
    following: false,
  },
  {
    image: '/avatar/043-chef.svg',
    name: 'Sally Becker',
    profession: 'UI Designer',
    following: true,
  },
  {
    image: '/avatar/044-farmer.svg',
    name: 'Dua Lipa',
    profession: 'Marketing Manager',
    following: false,
  },
  {
    image: '/avatar/045-man-12.svg',
    name: 'Joe Murry',
    profession: 'Product Designer',
    following: true,
  },
];

const friends = [
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
  {
    name: 'Selena Gomez',
    image: '/avatar/012-woman-2.svg',
    profession: 'Marketing Manager',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    dribbleUrl: '',
  },
];

export default UserProfile;
