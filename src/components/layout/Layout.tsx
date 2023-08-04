import {
  MdOutlineCategory,
  MdOutlineGridView,
  MdOutlineHome,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineLocalMall,
  MdOutlineLockOpen,
} from 'react-icons/md';

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
    label: 'Thống kê',
  },
];

const ListProductLabels = [
  {
    path: '/product/list-product',
    label: 'Danh sách sản phẩm',
  },
  {
    path: '/product/create-product',
    label: 'Tạo sản phẩm',
  },
];

const ListCategoriesLabels = [
  {
    path: '/categories/create-category',
    label: 'Tạo danh mục',
  },
];

const ListRolesPermisstionLabels = [
  {
    path: '/roles',
    exact: true,
    label: 'Các vai trò',
  },
];

const ListUser = [
  {
    path: '/user',
    exact: true,
    label: 'Users',
  },
];

const Order = [
  {
    path: '/order',
    exact: true,
    label: 'Đơn hàng',
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
                <MdOutlineKeyboardDoubleArrowLeft
                  style={{ fontSize: '24px' }}
                />
              ) : (
                <MdOutlineKeyboardDoubleArrowRight
                  style={{ fontSize: '24px' }}
                />
              )}
            </span>
          ) : null}
        </div>

        <NavMenu
          className='bg-light-background-hover'
          labelIcon={<MdOutlineHome />}
          title='Trang chủ'
          isEnableArrowIcon={true}
          listRoutes={ListLabels}
        />

        {isShow ? (
          <div className='relative my-4 h-6 w-full'>
            <span className='h-full w-[70%] pl-8 text-sm font-normal text-neutral-400'>
              Quản lý
            </span>
            <span className='absolute left-0 top-2 h-1	 w-[6%] border-b border-slate-300'></span>
          </div>
        ) : null}

        {/* <NavMenu
          labelIcon={<MdPeopleAlt />}
          title='User'
          isEnableArrowIcon={true}
          listRoutes={ListUser}
        /> */}
        <NavMenu
          labelIcon={<MdOutlineLockOpen />}
          title='Vai trò & Quyền'
          isEnableArrowIcon={true}
          listRoutes={ListRolesPermisstionLabels}
        />
        <NavMenu
          labelIcon={<MdOutlineGridView />}
          title='Sản phẩm'
          isEnableArrowIcon={true}
          listRoutes={ListProductLabels}
        />
        <NavMenu
          labelIcon={<MdOutlineCategory />}
          title='Danh mục'
          isEnableArrowIcon={true}
          listRoutes={ListCategoriesLabels}
        />
        <NavMenu
          labelIcon={<MdOutlineLocalMall />}
          title='Đơn hàng'
          isEnableArrowIcon={true}
          listRoutes={Order}
        />
      </div>
      <div className='flex h-screen flex-1 flex-col overflow-y-auto'>
        <Header />
        <div className='flex-1 bg-white p-10'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
