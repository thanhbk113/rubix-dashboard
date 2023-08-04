import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import UploadImage from '@/components/Common/UploadImage';
import Layout from '@/components/layout/Layout';

import { CmsApi } from '@/api/cms-api';
import { WithLayout } from '@/shared/types';
import { ReqCategories } from '@/shared/types/categoryType';

interface A {
  isSuccess: boolean | null;
  message: string;
}

const CreateCategory: WithLayout = () => {
  const [active, setActive] = useState<boolean>(false);
  const [images, setImage] = useState<File[]>([]);
  const [message, setMessage] = useState<A>({
    isSuccess: null,
    message: '',
  });
  console.log(images);

  const initialValues: ReqCategories = {
    name: '',
    description: '',
    slug: '',
    status: '',
    image: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const reqCreateCategory: ReqCategories = {
        name: values.name,
        description: values.description,
        slug: values.slug,
        image: '',
        status: values.status,
      };

      try {
        const res = await CmsApi.uploadFiles({ files: images });
        console.log(res.data.urls);

        reqCreateCategory.image = res.data.urls[0];

        const _ = await CmsApi.createCategory(reqCreateCategory);
        toast.success('Tạo thành công!');
        // setMessage({
        //   isSuccess: true,
        //   message: 'Success',
        // });
      } catch (error: any) {
        toast.error(error.data.message);
        // setMessage({ message: error.data.message, isSuccess: false });
      }

      setImage([]);
      resetForm({});
      setSubmitting(false);
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Bạn phải nhập tên.'),
      slug: Yup.string().required('Bạn phải nhập slug.'),
      status: Yup.string().required('Bạn phải nhập trạng thái.'),
    }),
  });

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

  return (
    <div className='mx-10 h-full gap-6'>
      <div className='rounded-xl bg-white px-10 py-8 font-semibold text-light-text-primary  shadow-lg'>
        <h2 className='mb-4 text-xl'>Tạo doanh mục</h2>
        <form
          onSubmit={formik.handleSubmit}
          className='w-full'
          encType='multipart/form-data'
        >
          <label htmlFor='' className='text-sm'>
            Tên danh mục
          </label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Nhập tên danh mục'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='text-sm text-light-error'>{formik.errors.name}</div>
          ) : null}
          <div className='mb-2'>
            <label htmlFor='' className='text-sm'>
              Mô tả
            </label>
            <textarea
              name='Mô tả'
              id='description'
              className='h-40 w-full overflow-y-hidden rounded-lg border p-4 outline-none'
              placeholder='Vui lòng nhập ở đây ...'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              Slug
            </label>
            <Input
              id='slug'
              name='slug'
              type='text'
              placeholder='Nhập Slug'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug}
            />
            {formik.touched.slug && formik.errors.slug ? (
              <div className='text-sm text-light-error'>
                {formik.errors.slug}
              </div>
            ) : null}
          </div>

          <div className='w-full'>
            <label htmlFor='' className='text-sm'>
              Trạng thái
            </label>
            <Input
              id='status'
              name='Trạng thái'
              type='text'
              placeholder='Nhập trạng thái'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            />
            {formik.touched.status && formik.errors.status ? (
              <div className='text-sm text-light-error'>
                {formik.errors.status}
              </div>
            ) : null}
          </div>

          <div className='flex cursor-pointer items-center gap-2 text-xl text-light-text-primary'>
            <span className='flex items-center justify-center'>
              <Stack direction='row' spacing={1} alignItems='center'>
                <AntSwitch
                  inputProps={{ 'aria-label': 'ant design' }}
                  checked={active}
                  onClick={() => setActive(!active)}
                />
              </Stack>
            </span>
            <span>Hoạt động</span>
          </div>

          <div className='my-10 h-full'>
            <UploadImage multiple={false} images={images} setImage={setImage} />
          </div>

          <div className='mt-10 flex justify-end'>
            <Button
              type='submit'
              large={true}
              className='mb-4 w-[12%] rounded-lg bg-light-primary-light text-sm text-white hover:bg-light-primary-main hover:shadow-lg'
              title='Hoàn tất'
            />
          </div>
        </form>
      </div>
      <ToastContainer />

      {/* {message.isSuccess === true && <Alert title={message.message} success />}
      {message.isSuccess === false && <Alert title={message.message} error />} */}
    </div>
  );
};

CreateCategory.getLayout = (page) => <Layout>{page}</Layout>;

export default CreateCategory;
