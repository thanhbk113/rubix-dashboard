import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Logo from '@/components/Common/Logo';
import NextImage from '@/components/NextImage';

import { CmsApi } from '@/api/cms-api';
import { ROUTES } from '@/constant';
import { ReqRegister } from '@/shared/types/authType';

const Register = () => {
  const [error, setError] = useState<string>('');
  const initialValues: ReqRegister = { username: '', email: '', password: '' };
  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const _ = await CmsApi.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        router.push(ROUTES.LOGIN);
      } catch (e: any) {
        setError(e.response.data.error);
      }
    },

    validationSchema: Yup.object().shape({
      username: Yup.string().required('You must enter your username.'),
      email: Yup.string()
        .email('Invalid email address.')
        .required('You must enter your email.'),
      password: Yup.string().required('You must enter your password.'),
    }),
  });

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Logo />
      <div className='relative hidden h-screen w-full items-center justify-center  bg-[#f7f7f9] md:flex'>
        <div>
          <NextImage
            width={954}
            height={835}
            src='/image/register.png'
            className='z-5 w-full'
            alt='Đồi núi'
          />
        </div>
        {/* <NextImage
          width={1900}
          height={288}
          className='absolute top-[60%] h-[18rem] w-full '
          src='/image/bg-login.png'
          alt=''
        /> */}
      </div>
      <div className='flex h-full w-full max-w-[450px] flex-col justify-center bg-white px-7 pt-12 pb-9'>
        <div className='flex flex-col items-start'>
          <div className='flex flex-col items-start pb-6'>
            <h2 className='text-2xl font-semibold text-light-text-primary'>
              Adventure starts here 🚀
            </h2>
            <p className='text-light-text-secondary'>
              Make your app management easy and fun!
            </p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className='flex w-full flex-col gap-4'
          >
            <Input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className='text-sm text-light-error'>
                {formik.errors.username}
              </div>
            ) : null}

            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-sm text-light-error'>
                {formik.errors.email}
              </div>
            ) : null}

            <Input
              id='password'
              name='password'
              placeholder='Password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              eyeEnable={true}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-sm text-light-error'>
                {formik.errors.password}
              </div>
            ) : null}

            {/* <div className='flex w-full items-center justify-between pt-2 pb-4'>
              <Checkbox content='I agree to privacy policy & terms' />
              <span>
                <Link href='/' className='text-xs text-a'></Link>
              </span>
            </div> */}

            {/* {!isLoading ? (
              <Button
                type='submit'
                large={true}
                className='rounded-lg bg-light-primary-light text-sm text-white hover:bg-light-primary-main hover:shadow-lg'
                title='Register'
              />
            ) : (
              <span className=' flex w-full items-center justify-center gap-2'>
                <CircularProgress
                  className='text-light-primary-main'
                  width='30px'
                  height='30px'
                  duration='3s'
                />
              </span>
            )} */}
            <Button
              type='submit'
              large={true}
              className='rounded-lg bg-light-primary-light text-sm text-white hover:bg-light-primary-main hover:shadow-lg'
              title='Đăng ký'
            />
          </form>
          {error && (
            <span className='pt-2 text-sm text-light-error'>{error}</span>
          )}
          {/* <div className='relative mb-8 w-full border-b border-solid border-gray-300 py-4'>
            <p className='absolute left-1/2  top-1/2 my-4 flex w-16 -translate-x-1/2 -translate-y-1/2 justify-center bg-white text-gray-400'>
              or
            </p>
          </div> */}
          <div className='my-4 flex w-full items-center justify-center gap-4 text-xs'>
            <p>Đã có tài khoản?</p>
            <Link href='/login' className='text-light-primary-main'>
              Đăng nhập
            </Link>
          </div>
          {/* <Social>
            <Link href='https://www.facebook.com/lownsni'>
              <NextImage height={20} width={20} src='/svg/fb.svg' alt='' />
            </Link>
            <Link href=''>
              <NextImage height={20} width={20} src='/svg/twitter.svg' alt='' />
            </Link>
            <Link href=''>
              <NextImage height={20} width={20} src='/svg/github.svg' alt='' />
            </Link>
            <Link href=''>
              <NextImage height={20} width={20} src='/svg/google.svg' alt='' />
            </Link>
          </Social> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
