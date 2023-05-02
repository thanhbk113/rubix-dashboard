import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { ListProduct } from '@/screen/Product';

export default ListProduct;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
