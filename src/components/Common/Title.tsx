import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useState } from 'react';

const Title = ({
  title,
  isLast,
  handleSort,
}: {
  width: string;
  title: string;
  isLast?: boolean;
  handleSort?: any;
}) => {
  const [hiddenSort, setHiddenSort] = useState<boolean>(false);

  const handleOpenSort = () => {
    setHiddenSort(true);
  };
  const handleCloseSort = () => {
    setHiddenSort(false);
  };

  return (
    <div
      className='flex h-full cursor-pointer flex-row items-center justify-between'
      onMouseEnter={handleOpenSort}
      onMouseLeave={handleCloseSort}
    >
      <span className='ml-5 flex h-full items-center gap-2 text-xs text-light-text-secondary'>
        <span>{title}</span>
        {hiddenSort && (
          <span className='cursor-pointer' onClick={() => handleSort()}>
            <ArrowDownwardOutlinedIcon style={{ fontSize: '20px' }} />
          </span>
        )}
      </span>

      {!isLast && <span className='text-gray-300'>|</span>}
    </div>
  );
};

export default Title;
