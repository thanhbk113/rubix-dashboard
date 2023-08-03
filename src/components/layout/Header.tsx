import { Popover } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import {
  MdNotificationsNone,
  MdOutlineDarkMode,
  MdOutlineSearch,
  MdOutlineTranslate,
} from 'react-icons/md';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='sticky top-0 z-10 flex items-center justify-end bg-light-background-body p-5 pr-8'>
      <form action='' className='flex h-full items-center justify-between'>
        <div className='flex h-full w-[60px] cursor-pointer items-center justify-center'>
          <MdOutlineSearch style={{ fontSize: '24px' }} />
        </div>
        <input
          type='text'
          className='w-full bg-light-background-body outline-0'
          placeholder='Search (Ctrl+/)'
        />
      </form>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center text-2xl'>
        <MdOutlineTranslate />
      </div>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center text-2xl'>
        <MdOutlineDarkMode />
      </div>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center text-2xl'>
        <MdNotificationsNone />
      </div>
      <button
        className='flex h-full w-[60px] cursor-pointer items-center justify-center text-2xl'
        onClick={handleClick}
      >
        <CiUser />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <button style={{ padding: '4px' }} onClick={() => signOut()}>
          Đăng xuất
        </button>
      </Popover>
    </div>
  );
};

export default Header;
