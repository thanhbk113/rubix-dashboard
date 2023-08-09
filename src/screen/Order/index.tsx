import { useEffect, useState } from 'react';

import Button from '@/components/Common/Button';
import { H4 } from '@/components/Common/Typography';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { Datum } from '@/shared/types/orderType';

const Order: WithLayout = () => {
  const [orderItem, setOrderItem] = useState<Datum[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Đang vận chuyển');

  const handleCompleteOrder = async (id: string) => {
    const _ = await CmsApi.completeOrder(id);
    setStatus('Đã hoàn thành');
  };

  const handleListOrder = async () => {
    setIsLoading(false);
    try {
      const res = await CmsApi.getListOrders();
      setOrderItem(res.data.data);
      setIsLoading(true);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    handleListOrder();
  }, []);

  return (
    <div>
      <h3 className='mb-4'>Đơn hàng</h3>
      {isLoading ? (
        <div className='flex h-full w-full flex-col items-start justify-center gap-4'>
          {orderItem.map((product) => (
            <div
              key={product.id}
              className='w-full rounded-lg border border-gray-300 p-4 transition-all hover:border-amber-400 hover:shadow-md'
            >
              <div className='mb-4 flex w-full flex-col justify-between'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <h4 className='cursor-pointer text-green-500 transition-all hover:text-amber-400'>
                      {product.user.username}
                    </h4>
                    {product.status === 'pending' ? (
                      <Button
                        title={status}
                        onClick={() => handleCompleteOrder(product.id)}
                        className={`${
                          status === 'Đã hoàn thành'
                            ? 'text-green-400 outline-none'
                            : 'border border-red-600 p-2 text-red-600'
                        }`}
                      />
                    ) : (
                      <H4 className='text-green-400'>Đã hoàn thành</H4>
                    )}
                  </div>
                  <span className='font-bold'>
                    Tổng giá tiền: {product.total_price} đ
                  </span>
                  <p>Tổng số lượng: {product.total_quantity}</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                {product.orderItems.map((item) => {
                  console.log(item.item);
                  return (
                    <div
                      className='flex h-full w-full justify-start gap-2 border-gray-300 '
                      key={item.id}
                    >
                      <NextImage
                        width={50}
                        height={50}
                        src={item.item.images[0]}
                        alt=''
                        className='h-full '
                      />
                      <div className='flex w-full flex-col'>
                        <H4>{item.item.name}</H4>
                        <div className='flex w-full justify-between'>
                          <H4>Giá: {item.item.price} đ</H4>
                          <H4>Số lượng: {item.quantity}</H4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-start justify-center gap-6'>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className='flex h-full w-full gap-6'>
                <div className='h-[250px] w-[200px] bg-gray-200'></div>
                <div className='flex w-full flex-col justify-between py-4 pr-4'>
                  <div className='flex w-full flex-col gap-4 '>
                    <div className='h-8 w-1/3 bg-gray-200'></div>
                    <div className='h-4 w-1/4 bg-gray-200'></div>
                    <div className='h-4 w-full bg-gray-200'></div>
                    <div className='h-4 w-3/4 bg-gray-200'></div>
                  </div>
                  <div className='flex gap-6'>
                    <div className='h-10 w-24 rounded-md bg-gray-200'></div>
                    <div className='h-10 w-24 rounded-md bg-gray-200'></div>
                  </div>
                </div>
              </Skeleton>
            ))}
        </div>
      )}
    </div>
  );
};

Order.getLayout = (page) => <Layout>{page}</Layout>;

export default Order;
