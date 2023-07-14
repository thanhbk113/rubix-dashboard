import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { Order } from '@/screen';

export default Order;
export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
