import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { UpdateProduct } from '@/screen/Product';

export default UpdateProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
