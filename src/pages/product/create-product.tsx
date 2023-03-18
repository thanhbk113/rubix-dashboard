import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import CreateProduct from '@/screen/Product/CreateProduct';

export default CreateProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
