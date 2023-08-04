import { FC, useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import Button from '@/components/Common/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { Product, ReqSearch } from '@/shared/types/itemType';

interface IButtonPage
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  children?: React.ReactElement;
}

const ButtonPage: FC<IButtonPage> = (props) => {
  const { children, title, className, ...parentAttributes } = props;
  return (
    <button
      {...parentAttributes}
      className={`${className} flex h-10 w-10 cursor-pointer items-center justify-center border text-2xl text-gray-500 transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-white`}
    >
      {children}
      {title}
    </button>
  );
};

const COUNT_PAGES_SHOW = 5;

const ListProduct: WithLayout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [take, setTake] = useState<number>(12);

  const minPageShow =
    page - Math.floor(COUNT_PAGES_SHOW / 2) > 1
      ? page - Math.floor(COUNT_PAGES_SHOW / 2)
      : 1;

  const handlePrevPage = () => {
    if (prevPage) {
      handleListProduct({ page: page - 1, take: 12 });
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      handleListProduct({ page: page + 1, take: 12 });
    }
  };

  const handleListProduct = async ({ page, take }: ReqSearch) => {
    setIsLoading(false);
    try {
      const res = await CmsApi.getListItems({ page, take });
      setProducts(res.data.data);
      setPageCount(res.data.meta.pageCount);
      setPrevPage(res.data.meta.hasPreviousPage);
      setNextPage(res.data.meta.hasNextPage);
      setItemCount(res.data.meta.itemCount);
      setTake(res.data.meta.take);
      setPage(res.data.meta.page);
      setIsLoading(true);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await CmsApi.deleteItem(id);
    } catch (error) {
      setError(error);
    }
    handleListProduct({ page: 1, take: 12 });
  };

  useEffect(() => {
    handleListProduct({ page: 1, take: 12 });
  }, []);

  return (
    <div>
      <h3 className='mb-4'>Danh sách sản phẩm</h3>
      {isLoading ? (
        <div className='flex h-full w-full flex-col items-start justify-center gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='flex w-full rounded-lg border border-gray-300 p-4 transition-all hover:border-amber-400 hover:shadow-md'
            >
              <div className='h-full border-r border-gray-300 pr-4'>
                <NextImage
                  width={200}
                  height={300}
                  src={product.images[0]}
                  alt=''
                  className='h-full w-full'
                />
              </div>
              <div className='flex w-full flex-col justify-between pl-4'>
                <div className='flex flex-col gap-1'>
                  <h4 className='cursor-pointer transition-all hover:text-amber-400'>
                    {product.name}
                  </h4>
                  <span>${product.price}</span>
                  <p>{product.description}</p>
                </div>
                <div className='flex justify-end gap-4'>
                  {/* <Link
                    href='/product/update-product'
                    className='rounded-md border border-amber-400 p-2 transition-all hover:bg-amber-400 hover:text-white'
                  >
                    Update
                  </Link> */}
                  <Button
                    title='Xóa'
                    onClick={() => handleDeleteProduct(product.id)}
                    className=' outline-none hover:text-red-600 '
                  />
                </div>
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
      <div className='flex items-center justify-between pt-16 text-gray-200'>
        <div className='flex gap-2'>
          <ButtonPage onClick={handlePrevPage}>
            <MdOutlineKeyboardArrowLeft />
          </ButtonPage>
          {Array(pageCount > 2 ? COUNT_PAGES_SHOW : pageCount)
            .fill(null)
            .map((_, index) => (
              <ButtonPage
                key={index}
                className={`${
                  page === index + minPageShow
                    ? ' bg-amber-400 text-white'
                    : 'bg-white'
                }`}
                title={String(index + minPageShow)}
                onClick={() =>
                  handleListProduct({ page: index + minPageShow, take: 12 })
                }
              />
            ))}
          <ButtonPage onClick={handleNextPage}>
            <MdOutlineKeyboardArrowRight />
          </ButtonPage>
        </div>
        <span className='text-gray-500'>
          Đang xem {prevPage ? page * take - 11 : 1}-
          {nextPage ? take * page : itemCount} of {itemCount} tất cả kết quả
        </span>
      </div>
    </div>
  );
};

ListProduct.getLayout = (page) => <Layout>{page}</Layout>;

export default ListProduct;
