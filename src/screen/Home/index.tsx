import dynamic from 'next/dynamic';

import Layout from '@/components/layout/Layout';

const Dashboard = dynamic(() => import('@/screen/Dashboards'), {
  ssr: false,
});
import { WithLayout } from '@/shared/types';

const Home: WithLayout = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;
