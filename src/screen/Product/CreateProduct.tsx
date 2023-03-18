import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import Auth from '@/components/Auth';
import Alert from '@/components/Common/Alert';
import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import UploadImage from '@/components/Common/UploadImage';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { Category } from '@/shared/types/categoryType';
import { ReqItem } from '@/shared/types/itemType';

interface A {
  isSuccess: boolean | null;
  message: string;
}

const CreateProduct: WithLayout = () => {
  const [description, setDescription] = useState<any>();
  const [category, setCategory] = useState<Category[]>([]);
  const [valueCategory, setValueCategory] = useState<any>();
  const [cost, setCost] = useState<any>(0);
  const [active, setActive] = useState<boolean>(false);

  const [message, setMessage] = useState<A>({
    isSuccess: null,
    message: '',
  });

  const initialValues: ReqItem = {
    name: '',
    description: '',
    price: 0,
    cost: 0,
    // images: [],
    categoryId: '',
    quantity: 0,
    sku: '',
    active: false,
  };

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await CmsApi.getCategory();

        setCategory(res.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    getItem();
  }, []);

  const handleSelectValueDescription = (
    e: React.SyntheticEvent,
    value: any
  ) => {
    setValueCategory(value.id);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,.35)'
          : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const reqCreateItem = {
        name: values.name,
        description: description,
        price: values.price,
        cost: cost,
        // images: values.image,
        categoryId: valueCategory,
        quantity: values.quantity,
        sku: values.sku,
        active: active,
      };

      console.log(reqCreateItem);

      try {
        const res = await CmsApi.createItem(reqCreateItem);
        setMessage({
          isSuccess: true,
          message: 'Success',
        });
      } catch (error: any) {
        setMessage({ message: error.data.message, isSuccess: false });
      }

      setTimeout(() => {
        setMessage({
          isSuccess: null,
          message: '',
        });
      }, 3000);
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('You must enter your name.'),
      price: Yup.string().required('You must enter your price.'),
      cost: Yup.string().required('You must enter your cost.'),
      quantity: Yup.string().required('You must enter your quantity.'),
      sku: Yup.string().required('You must enter your sku.'),
    }),
  });

  return (
    <div className='mx-10 h-full gap-6'>
      <div className='rounded-xl bg-white px-10 py-8 font-semibold text-light-text-primary  shadow-lg'>
        <h2 className='mb-4 text-xl'>Create Product</h2>
        <form onSubmit={formik.handleSubmit} className='w-full'>
          <label htmlFor='' className='text-sm'>
            Product Name
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Enter Name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='text-sm text-light-error'>{formik.errors.name}</div>
          ) : null}

          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              SKU
            </label>
            <Input
              id='sku'
              name='sku'
              type='text'
              placeholder='Enter SKU'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sku}
            />
            {formik.touched.sku && formik.errors.sku ? (
              <div className='text-sm text-light-error'>
                {formik.errors.sku}
              </div>
            ) : null}

            <div className='w-full'>
              <label htmlFor='' className='text-sm'>
                Quantity
              </label>
              <Input
                id='quantity'
                name='quantity'
                type='number'
                placeholder='Enter Quantity'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className='text-sm text-light-error'>
                  {formik.errors.quantity}
                </div>
              ) : null}
            </div>
          </div>

          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              Cost
            </label>
            <Input
              id='cost'
              name='cost'
              type='number'
              placeholder='Enter Cost'
              onChange={(e) => setCost(e.target.value)}
              onBlur={formik.handleBlur}
              value={cost}
            />
            {formik.touched.cost && formik.errors.cost ? (
              <div className='text-sm text-light-error'>
                {formik.errors.cost}
              </div>
            ) : null}
          </div>

          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              Price
            </label>
            <Input
              id='price'
              name='price'
              type='number'
              placeholder='Enter Price'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className='text-sm text-light-error'>
                {formik.errors.price}
              </div>
            ) : null}
          </div>

          <label htmlFor='' className='text-sm'>
            Category
          </label>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={category.map((item) => ({
              id: item.id,
              label: item.name,
            }))}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleSelectValueDescription}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                style={{ borderRadius: '30px' }}
                placeholder='Category'
              />
            )}
          />
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className='text-sm text-light-error'>
              {formik.errors.categoryId}
            </div>
          ) : null}

          <div className='my-10 h-full'>
            <UploadImage />
          </div>
          <div className='mt-10 flex justify-end'>
            <Button
              type='submit'
              large
              className='mb-4 w-[12%] rounded-lg bg-light-primary-light text-sm text-white hover:bg-light-primary-main hover:shadow-lg'
              title='SUBMIT'
            />
          </div>
        </form>
      </div>

      {message.isSuccess === true && <Alert title={message.message} success />}
      {message.isSuccess === false && <Alert title={message.message} error />}
    </div>
  );
};

CreateProduct.getLayout = (page) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default CreateProduct;
