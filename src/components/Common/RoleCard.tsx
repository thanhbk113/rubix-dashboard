import { FC } from 'react';

interface Props {
  title: string;
  total: number;
  image_urls: string[];
}

export const RoleCard: FC<Props> = (props) => {
  const list = [
    'right-[10px]',
    'right-[40px]',
    'right-[70px]',
    'right-[100px]',
  ];
  return (
    <div className='relative rounded-xl bg-white shadow-lg'>
      <div className='flex flex-col px-4 pt-6'>
        <div className='mb-8 flex flex-row items-center justify-between text-sm text-light-text-secondary'>
          <span>Total {props.total} users</span>
          {/* {props.image_urls.map((item, index) => {
            const a = 20;
            return (
              <img
                src={item}
                alt=''
                className={`${list[index]} absolute h-12 w-12 max-w-none rounded-full border-4  border-white`}
              />
            );
          })} */}
        </div>
        <span className='text-xl font-medium text-light-text-secondary'>
          {props.title}
        </span>
        <div>
          <span className='cursor-pointer text-light-primary-light hover:border-b hover:border-b-light-primary-light'>
            Edit Role
          </span>
        </div>
      </div>
    </div>
  );
};
