import { LockOpen } from '@mui/icons-material';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

import Logo from '@/components/Common/Logo';
import NavMenu from '@/components/Common/Menu';
import Header from '@/components/layout/Header';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  handleShow,
  handleSlide,
  selectIsShow,
  selectIsSlide,
} from '@/features/dashboard/dashboardRouteSlice';

const ListLabels = [
  {
    path: '/',
    exact: true,
    label: 'ECommerce',
  },
];

const ListProductLabels = [
  {
    path: '/product/create-product',
    label: 'Create Product',
  },
];

const ListCategoriesLabels = [
  {
    path: '/categories/create-category',
    label: 'Create Category',
  },
];

const ListRolesPermisstionLabels = [
  {
    path: '/roles-permission/roles',
    exact: true,
    label: 'Roles',
  },
  {
    path: '/roles-permission/permissions',
    label: 'Permissions',
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isSlide = useAppSelector(selectIsSlide);
  const isShow = useAppSelector(selectIsShow);
  return (
    <div className='justify-betwwen flex w-screen bg-light-background-body text-light-text-primary '>
      <div
        className={` ${
          isShow ? 'max-w-[300px]' : 'max-w-[70px]'
        } flex h-screen w-full flex-col overflow-y-auto pt-[62px]`}
        onMouseEnter={() => {
          if (isSlide === false) {
            dispatch(handleShow());
          }
        }}
        onMouseLeave={() => {
          if (isSlide === false) {
            dispatch(handleShow());
          }
        }}
      >
        <div className='fixed top-0 left-0 flex h-[60px] w-full max-w-[285px] items-center justify-between bg-light-background-body p-4'>
          {isShow ? (
            <div className='flex items-center gap-2'>
              <Logo />
            </div>
          ) : (
            <Logo />
          )}
          {isShow ? (
            <span
              className='cursor-pointer'
              onClick={() => dispatch(handleSlide())}
            >
              {isSlide ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightOutlinedIcon />
              )}
            </span>
          ) : null}
        </div>

        <NavMenu
          className='bg-light-background-hover'
          labelIcon={<HomeOutlinedIcon />}
          title='Dashboard'
          isEnableArrowIcon={true}
          listRoutes={ListLabels}
        />

        {isShow ? (
          <div className='relative my-4 h-6 w-full'>
            <span className='h-full w-[70%] pl-8 text-sm font-normal text-neutral-400'>
              APP & PAGES
            </span>
            <span className='absolute left-0 top-2 h-1	 w-[6%] border-b border-slate-300'></span>
          </div>
        ) : null}

        <NavMenu
          className=''
          labelIcon={<GridViewIcon />}
          title='Product'
          isEnableArrowIcon={true}
          listRoutes={ListProductLabels}
        />
        <NavMenu
          className=''
          labelIcon={<LockOpen />}
          title='Roles & Permissions'
          isEnableArrowIcon={true}
          listRoutes={ListRolesPermisstionLabels}
        />
        <NavMenu
          className=''
          labelIcon={<GridViewIcon />}
          title='Categories'
          isEnableArrowIcon={true}
          listRoutes={ListCategoriesLabels}
        />
      </div>
      <div className='flex h-screen flex-1 flex-col overflow-y-auto'>
        <Header />
        <div className=' bg-white p-10'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
