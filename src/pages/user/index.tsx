import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import UserProfile from '@/screen/User';

export default UserProfile;
export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
