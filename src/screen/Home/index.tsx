import Auth from '@/components/Auth';
import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

const Home: WithLayout = () => {
  return <div>Home</div>;
};

Home.getLayout = (page) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);
export default Home;
