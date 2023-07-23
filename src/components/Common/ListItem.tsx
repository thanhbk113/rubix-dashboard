import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { MdFiberManualRecord } from 'react-icons/md';

import { IRoutes as IRoute } from './Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  alo1234,
  selectIndexActive,
} from '../../features/dashboard/dashboardRouteSlice';

interface IListRoutes {
  route: IRoute;
}

const Menu: FC<IListRoutes> = ({ route }) => {
  const dispatch = useAppDispatch();
  const indexActive = useAppSelector(selectIndexActive);
  const [a, setA] = useState(true);

  useEffect(() => {
    if (indexActive === route.label) {
      setA(true);
    } else {
      setA(false);
    }
  }, [indexActive]);

  return (
    <Link
      href={route.path}
      className={
        a
          ? 'mb-2 flex w-full items-center gap-4 rounded-lg bg-light-background-hover py-2 px-4 hover:bg-light-background-hover'
          : 'mb-2 flex w-full items-center gap-4 rounded-lg bg-light-background-body py-2 px-4 hover:bg-light-background-hover'
      }
      onClick={() => dispatch(alo1234(route.label))}
    >
      <span className='text-2xl'>
        <MdFiberManualRecord style={{ fontSize: '12px' }} />
      </span>
      <span>{route.label}</span>
    </Link>
  );
};

export default Menu;
