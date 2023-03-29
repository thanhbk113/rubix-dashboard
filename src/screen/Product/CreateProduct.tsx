import Autocomplete from '@mui/material/Autocomplete';
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
import { ReqItem } from '@/shared/types/itemType';

interface A {
  isSuccess: boolean | null;
  message: string;
}

const CreateProduct: WithLayout = () => {
  const [valueCategory, setValueCategory] = useState<string>('');
  const [images, setImage] = useState<File[]>([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState();

  const [message, setMessage] = useState<A>({
    isSuccess: null,
    message: '',
  });

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await CmsApi.getCategory();

        setCategory(res.data.data);
      } catch (error: any) {
        setError(error.data.message);
      }
    };

    getItem();
  }, []);

  const initialValues: ReqItem = {
    name: '',
    description: '',
    price: '',
    cost: '',
    images: [],
    categoryId: '',
    quantity: '',
    details: '',
    sku: '',
  };

  const handleSelectValueDescription = (
    e: React.SyntheticEvent,
    value: any
  ) => {
    setValueCategory(value.id);
  };

  console.log(images);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const reqCreateItem: ReqItem = {
        name: values.name,
        description: values.description,
        price: values.price,
        cost: values.cost,
        images: [],
        categoryId: valueCategory,
        quantity: values.quantity,
        details: values.details,
        sku: values.sku,
      };

      try {
        const res = await CmsApi.uploadFiles({ files: images });

        if (res.data.urls.length > 0) {
          reqCreateItem.images = res.data.urls;
        }
        const _ = await CmsApi.createItem(reqCreateItem);
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

      setImage([]);
      setValueCategory('');
      resetForm({});
      setSubmitting(false);
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
          <div className='mb-2'>
            <label htmlFor='' className='text-sm'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              className='h-20 w-full overflow-y-hidden rounded-lg border p-4 outline-none'
              placeholder='Please write here ...'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cost}
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

          <div className='mt-4'>
            <label htmlFor='' className='text-sm'>
              Detail
            </label>
            <textarea
              name='details'
              id='details'
              cols={30}
              rows={10}
              className='h-40 w-full overflow-y-hidden rounded-lg border p-4 outline-none'
              placeholder='Please write here ...'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
          </div>
          <div className='my-10 h-full'>
            <UploadImage multiple={true} images={images} setImage={setImage} />
          </div>

          <div className='mt-10 flex justify-end'>
            <Button
              type='submit'
              large={true}
              className='mb-4 w-[12%] rounded-lg bg-light-primary-light text-sm text-white hover:bg-light-primary-main hover:shadow-lg'
              title='SUBMIT'
            />
          </div>
        </form>
      </div>

      {message.isSuccess === true && <Alert title={message.message} success />}
      {message.isSuccess === false && <Alert title={message.message} error />}
      <span>{error}</span>
    </div>
  );
};

CreateProduct.getLayout = (page) => (
  <Layout>
    <Auth>{page}</Auth>
  </Layout>
);

export default CreateProduct;
