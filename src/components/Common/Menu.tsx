import { FC, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import Menu from './ListItem';
import { useAppSelector } from '../../app/hooks';
import { selectIsShow } from '../../features/dashboard/dashboardRouteSlice';

export interface IRoutes {
  path: string;
  extract?: boolean;
  label: React.ReactNode;
  idx?: number;
}

interface INavMenu
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  isEnableArrowIcon: boolean;
  labelIcon: React.ReactNode;
  listRoutes: IRoutes[];
}

const NavMenu: FC<INavMenu> = (props) => {
  const isShow = useAppSelector(selectIsShow);
  const {
    title,
    isEnableArrowIcon,
    labelIcon,
    listRoutes: items,
    ...attrs
  } = props;
  const [isHidden, setIsHidden] = useState(false);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  const a = isHidden
    ? ' flex justify-between items-center py-2 px-4 mb-2 rounded-lg cursor-pointer bg-light-background-hover'
    : ' flex justify-between items-center py-2 px-4 mb-2 rounded-lg cursor-pointer bg-light-background-body';
  return (
    <div className='w-full px-3 pb-2 '>
      {isShow ? (
        <div className={attrs.className + a} onClick={handleHidden}>
          <div className='flex items-center gap-2 whitespace-nowrap'>
            <span className='text-2xl'>{labelIcon}</span>
            <span>{title}</span>
          </div>
          {isEnableArrowIcon ? (
            !isHidden ? (
              <span className='text-2xl'>
                <MdOutlineKeyboardArrowRight className='text-light-text-primary' />
              </span>
            ) : (
              <span className='text-2xl'>
                <MdOutlineKeyboardArrowDown className='text-light-text-primary' />
              </span>
            )
          ) : null}
        </div>
      ) : (
        <div className='flex items-center justify-center whitespace-nowrap text-2xl'>
          <span className='p-2'>{labelIcon}</span>
        </div>
      )}

      {isHidden && isShow ? (
        <div className='flex flex-col'>
          {items.map((item, idx) => (
            <Menu key={idx} route={{ idx, ...item }} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NavMenu;
