import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { Roles } from '@/screen/Roles-Permission';

export default Roles;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
