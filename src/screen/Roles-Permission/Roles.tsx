import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import { MdOutlineIosShare } from 'react-icons/md';

import TablePagination from '@/components/Common/TablePagination';
import Title from '@/components/Common/Title';
import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

import { CmsApi } from '../../api/cms-api';
import { ReqSearch } from '../../shared/types/itemType';
import { User } from '../../shared/types/rolesType';

const Roles: WithLayout = () => {
  // const [roles, setRoles] = React.useState<ResRoles[]>([]);
  const [users, setUser] = React.useState<User[]>([]);
  const [pagination, setPagination] = React.useState<any>(1);

  const handleSort = async ({ sort, order, search, take }: ReqSearch) => {
    try {
      const res = await CmsApi.getUsers({ sort, order, search, take });
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // CmsApi.getRoles().then((res) => {
    //   setRoles(res.data.data);
    // });

    CmsApi.getUsers({}).then((res) => {
      setUser(res.data.data);
      setPagination(res.data.meta);
    });
  }, []);

  return (
    <div className='w-full bg-light-background-body px-16 py-10'>
      <div className='w-full rounded-xl bg-white shadow-lg '>
        <div className='h-24 w-full'>
          <div className='mx-5 flex h-full flex-row items-center justify-between'>
            <button className='h-10 w-36 rounded-lg border border-light-borderColor font-medium text-light-text-secondary'>
              <div className='flex flex-row items-center justify-center space-x-2'>
                <MdOutlineIosShare style={{ fontSize: '24px' }} />
                <span className=''>EXPORT</span>
              </div>
            </button>
            <div className='flex flex-row'>
              <input
                placeholder='Search'
                className='mr-5 h-10 w-[600px] rounded-lg border border-light-borderColor px-5 font-medium text-light-text-secondary outline-light-primary-light'
                onChange={(e) => handleSort({ search: e.target.value })}
              ></input>
            </div>
          </div>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='grid h-16 w-full border-collapse grid-cols-7 border bg-light-background-body'>
              <th className='col-span-1 flex items-center justify-center'>
                <Checkbox style={{ color: 'rgba(76, 78, 100, 0.68)' }} />
              </th>
              <th className='col-span-2'>
                <Title
                  handleSort={() =>
                    handleSort({ sort: 'username', order: 'ASC' })
                  }
                  title='USER'
                  width='w-60'
                ></Title>
              </th>
              <th className='col-span-2'>
                <Title
                  handleSort={() => handleSort({ sort: 'email', order: 'ASC' })}
                  title='EMAIL'
                  width='w-60'
                ></Title>
              </th>
              <th className='col-span-2'>
                <Title
                  handleSort={() => handleSort({ sort: 'role', order: 'ASC' })}
                  title='ROLE'
                  width='w-60'
                ></Title>
              </th>
            </tr>
          </thead>
          <tbody className='flex w-full flex-col items-center justify-between'>
            {users?.map((user, index) => (
              <tr
                key={index}
                className='grid h-16 w-full grid-cols-7 border-b hover:bg-light-background-hover'
              >
                <td className='items-cente col-span-1 flex justify-center'>
                  <span className='flex items-center justify-center'>
                    <Checkbox style={{ color: 'rgba(76, 78, 100, 0.68)' }} />
                  </span>
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  <div className='flex items-center gap-2'>
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  {user.email}
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  {user.role}
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  {user.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          pagination={pagination.itemCount}
          handleSort={handleSort}
        />
      </div>
    </div>
  );
};

Roles.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Roles;
