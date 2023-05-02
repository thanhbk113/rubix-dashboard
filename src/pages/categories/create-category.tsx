import { GetServerSideProps } from 'next';

import { requireAuth } from '@/components/requireAuth';

import { CreateCategory } from '@/screen/Categories';

export default CreateCategory;

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});
