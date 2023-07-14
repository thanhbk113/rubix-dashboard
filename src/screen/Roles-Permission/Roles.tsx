import { IosShare } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';

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
      {/* <div className='mb-5'>
        <h1 className='text-2xl font-medium text-light-text-primary'>
          Roles List
        </h1>
        <span className='text-light-text-secondary'>
          A role provided access to predefined menus and features so that
          depending on assigned role an administrator can have access to what he
          need
        </span>
      </div>
      <div className='grid h-36 grid-cols-3 gap-5'>
        {roles.map((item, index) => (
          <RoleCard
            key={index}
            title={item.user_role}
            image_urls={item.users.map((user) => user.avatar)}
            total={item.total}
          ></RoleCard>
        ))}
      </div>
      <h1 className='mt-12 text-2xl font-medium text-light-text-primary'>
        Total users with their roles
      </h1>
      <div className='mb-5'>
        <span className='text-light-text-secondary'>
          Find all of your company's administrator accounts and their associate
          roles.
        </span>
      </div> */}
      <div className='w-full rounded-xl bg-white shadow-lg '>
        <div className='h-24 w-full'>
          <div className='mx-5 flex h-full flex-row items-center justify-between'>
            <button className='h-10 w-36 rounded-lg border border-light-borderColor font-medium text-light-text-secondary'>
              <div className='flex flex-row items-center justify-center space-x-2'>
                <IosShare style={{ fontSize: '20px' }} />
                <span className=''>EXPORT</span>
              </div>
            </button>
            <div className='flex flex-row'>
              <input
                placeholder='Search'
                className='mr-5 h-10 w-[600px] rounded-lg border border-light-borderColor px-5 font-medium text-light-text-secondary outline-light-primary-light'
                onChange={(e) => handleSort({ search: e.target.value })}
              ></input>
              {/* <FormControl fullWidth style={{ width: '150px' }}>
                <Select
                  sx={{
                    // eslint-disable-next-line no-constant-condition
                    '& .MuiSelect-select .notranslate::after': 'placeholder'
                      ? {
                          content: `"${'Select Role'}"`,
                          opacity: 0.6,
                          fontWeight: 400,
                        }
                      : {},
                  }}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}
                  // onChange={handleChange}
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                  }}
                >
                  {roles.map((item, index) => (
                    <MenuItem key={index} value={item.user_role}>
                      {item.user_role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
            </div>
          </div>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='grid h-16  w-full border-collapse grid-cols-11 border bg-light-background-body'>
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
              <th className='col-span-2'>
                <Title
                  handleSort={() => handleSort({ sort: 'phone', order: 'ASC' })}
                  title='PHONE'
                  width='w-60'
                ></Title>
              </th>
              <th className='col-span-1'>
                <Title
                  handleSort={() =>
                    handleSort({ sort: 'action', order: 'ASC' })
                  }
                  title='STATUS'
                  width='w-60'
                ></Title>
              </th>
              <th className='col-span-1'>
                <Title title='ACTIONS' width='w-60' isLast={true}></Title>
              </th>
            </tr>
          </thead>
          <tbody className='flex w-full flex-col items-center justify-between'>
            {users?.map((user, index) => (
              <tr
                key={index}
                className='grid h-16 w-full grid-cols-11 border-b hover:bg-light-background-hover'
              >
                <td className='items-cente col-span-1 flex justify-center'>
                  <span className='flex items-center justify-center'>
                    <Checkbox style={{ color: 'rgba(76, 78, 100, 0.68)' }} />
                  </span>
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  <div className='flex items-center gap-2'>
                    {/* <span className='h-[36px] w-[36px] rounded-full'>
                      <img
                        className='h-full w-full rounded-full'
                        src={user.avatar}
                        alt=''
                      />
                    </span> */}
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
                <td className='col-span-1 flex items-center justify-between pl-5'>
                  {user.status}
                </td>
                <td className='col-span-1 flex items-center justify-between pl-10'>
                  <span className='cursor-pointer'>
                    <MoreVertIcon />
                  </span>
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
