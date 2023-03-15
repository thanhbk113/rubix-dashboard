import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TranslateIcon from '@mui/icons-material/Translate';

const Header = () => {
  return (
    <div className='flex h-[60px] items-center justify-end bg-light-background-body pr-8'>
      <form action='' className='flex h-full items-center justify-between'>
        <div className='flex h-full w-[60px] cursor-pointer items-center justify-center'>
          <SearchIcon />
        </div>
        <input
          type='text'
          className='w-full bg-light-background-body outline-0'
          placeholder='Search (Ctrl+/)'
        />
      </form>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center'>
        <TranslateIcon />
      </div>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center'>
        <DarkModeOutlinedIcon />
      </div>
      <div className='flex h-full w-[60px] cursor-pointer items-center justify-center'>
        <NotificationsNoneOutlinedIcon />
      </div>
    </div>
  );
};

export default Header;
