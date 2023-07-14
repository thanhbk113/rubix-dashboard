import React from 'react';

import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

const Order: WithLayout = () => {
  return <div>Order</div>;
};

Order.getLayout = (page) => <Layout>{page}</Layout>;

export default Order;
