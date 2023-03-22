import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { CreateProduct } from '@/screen/Product';

export default CreateProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
