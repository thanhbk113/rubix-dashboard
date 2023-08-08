import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import UploadImage from '@/components/Common/UploadImage';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { Category } from '@/shared/types/categoryType';
import { ReqItem } from '@/shared/types/itemType';

const CreateProduct: WithLayout = () => {
  const [valueCategory, setValueCategory] = useState<string[]>([]);
  const [images, setImage] = useState<File[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [error, setError] = useState();

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
    categoriesId: [],
    quantity: '',
    details: '',
    stock: '',
    active: true,
  };

  const handleSelectValueDescription = (
    e: React.SyntheticEvent,
    value: Category
  ) => {
    setValueCategory((prev) => [...prev, value.id]);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const reqCreateItem: ReqItem = {
        name: values.name,
        description: values.description,
        price: values.price,
        cost: values.cost,
        images: [],
        categoriesId: valueCategory,
        quantity: values.quantity,
        details: values.details,
        stock: values.stock,
        active: true,
      };

      try {
        const res = await CmsApi.uploadFiles({ files: images });

        if (res.data.urls.length > 0) {
          reqCreateItem.images = res.data.urls;
        }
        const _ = await CmsApi.createItem(reqCreateItem);
        toast.success('Tạo sản phẩm thành công');
      } catch (error: any) {
        toast.error(error.data.message);
      }

      setImage([]);
      setValueCategory([]);
      resetForm({});
      setSubmitting(false);
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Bạn phải nhập tên.'),
      price: Yup.string().required('Bạn phải nhập giá.'),
      cost: Yup.string().required('Bạn phải nhập giá.'),
      quantity: Yup.string().required('Bạn phải nhập số lượng.'),
      stock: Yup.string().required('Bạn phải nhập số lượng.'),
    }),
  });

  return (
    <div className='mx-10 h-full gap-6'>
      <div className='rounded-xl bg-white px-10 py-8 font-semibold text-light-text-primary  shadow-lg'>
        <h2 className='mb-4 text-xl'>Tạo sản phẩm</h2>
        <form onSubmit={formik.handleSubmit} className='w-full'>
          <label htmlFor='' className='text-sm'>
            Tên sản phẩm
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Nhập tên sản phẩm'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='text-sm text-light-error'>{formik.errors.name}</div>
          ) : null}
          <div className='mb-2'>
            <label htmlFor='' className='text-sm'>
              Mô Tả
            </label>
            <textarea
              name='description'
              id='description'
              className='h-40 w-full overflow-y-hidden rounded-lg border p-4 outline-none'
              placeholder='Xin viết ở đây ...'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          <div className='flex items-center justify-between gap-6'>
            <div className='w-full'>
              <label htmlFor='' className='text-sm'>
                Tồn kho
              </label>
              <Input
                id='stock'
                name='stock'
                type='number'
                placeholder='Nhập số tồn kho'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className='text-sm text-light-error'>
                  {formik.errors.stock}
                </div>
              ) : null}
            </div>
            <div className='w-full'>
              <div>
                <label htmlFor='' className='text-sm'>
                  Số lượng
                </label>
                <Input
                  id='quantity'
                  name='quantity'
                  type='number'
                  placeholder='Nhập số lượng'
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
          </div>

          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              Giá vốn
            </label>
            <Input
              id='cost'
              name='cost'
              type='number'
              placeholder='Nhập giá vốn'
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
              Giá bán
            </label>
            <Input
              id='price'
              name='price'
              type='number'
              placeholder='Nhập giá bán'
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
            Danh mục
          </label>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={category}
            onChange={handleSelectValueDescription}
            getOptionLabel={(option) => option.name}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                style={{ borderRadius: '30px' }}
                placeholder='Danh mục'
              />
            )}
          />
          {formik.touched.categoriesId && formik.errors.categoriesId ? (
            <div className='text-sm text-light-error'>
              {formik.errors.categoriesId}
            </div>
          ) : null}

          <div className='mt-4'>
            <label htmlFor='' className='text-sm'>
              Chi tiết
            </label>
            <textarea
              name='details'
              id='details'
              cols={30}
              rows={10}
              className='h-40 w-full overflow-y-hidden rounded-lg border p-4 outline-none'
              placeholder='Vui lòng viết ở đây ...'
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
              title='GỬI'
            />
          </div>
        </form>
      </div>
      <ToastContainer />

      {/* {message.isSuccess === true && <Alert title={message.message} success />}
      {message.isSuccess === false && <Alert title={message.message} error />} */}
      <span>{error}</span>
    </div>
  );
};

CreateProduct.getLayout = (page) => <Layout>{page}</Layout>;

export default CreateProduct;
