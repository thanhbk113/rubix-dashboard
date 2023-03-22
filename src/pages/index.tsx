import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { Home } from '@/screen';

export default Home;

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
