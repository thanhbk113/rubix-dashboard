import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';

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
      <button
        className='flex h-full w-[60px] cursor-pointer items-center justify-center text-2xl'
        onClick={() => signOut()}
      >
        <MdLogout />
      </button>
    </div>
  );
};

export default Header;
