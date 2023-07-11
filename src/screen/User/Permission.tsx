import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';

import { CmsApi } from '../../api/cms-api';
import { ReqSearch } from '../../shared/types/itemType';
import { User } from '../../shared/types/rolesType';

const Permission = () => {
  const [users, setUser] = useState<User[]>([]);

  const handleSort = async ({ sort, order, search }: ReqSearch) => {
    try {
      const res = await CmsApi.getUsers({ sort, order, search });
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CmsApi.getUsers({}).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  return (
    <div className='h-full w-full bg-light-background-body px-16  pt-5'>
      <div className='mb-5'>
        <h1 className='text-2xl font-medium text-light-text-primary'>
          Permissions List
        </h1>
        <span className='text-light-text-secondary'>
          Each category (Basic, Professional, and Business) includes the four
          predefined roles shown below.
        </span>
      </div>
      <div className='w-full rounded-xl bg-white shadow-lg'>
        <table className='w-full'>
          <div className='flex h-24 w-full items-center justify-between px-5'>
            <input
              placeholder='Search Permission'
              className='w-50 h-10 rounded-lg border  border-light-borderColor px-5 font-medium text-light-text-secondary outline-light-primary-light'
              onChange={(e) => handleSort({ search: e.target.value })}
            ></input>
            <button className=' h-10 w-[12rem] rounded-lg border-light-borderColor bg-[#666cff] font-medium text-white'>
              ADD PERMISSION
            </button>
          </div>
          <tr className='grid h-16  w-full border-collapse grid-cols-8 border bg-light-background-body'>
            <th className='col-span-2'>
              <Title
                handleSort={() =>
                  handleSort({ sort: 'username', order: 'ASC' })
                }
                title='NAME'
                width='w-60'
              ></Title>
            </th>
            <th className='col-span-3'>
              <Title
                handleSort={() => handleSort({ sort: 'email', order: 'ASC' })}
                title='ASSIGNED TO'
                width='w-60'
              ></Title>
            </th>
            <th className='col-span-2'>
              <Title
                handleSort={() => handleSort({ sort: 'role', order: 'ASC' })}
                title='CREATE DATE'
                width='w-60'
              ></Title>
            </th>
            <th className='col-span-1'>
              <Title
                isLast
                handleSort={() => handleSort({ sort: 'phone', order: 'ASC' })}
                title='ACTIONS'
                width='w-60'
              ></Title>
            </th>
          </tr>
          <div className='flex w-full flex-col items-center justify-between'>
            {users?.map((user, index) => (
              <tr className='grid h-16 w-full grid-cols-8 border-b hover:bg-light-background-hover'>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  {user.username}
                </td>
                <td className='col-span-3 flex items-center justify-between pl-5'>
                  {user.role}
                </td>
                <td className='col-span-2 flex items-center justify-between pl-5'>
                  {user.created_at}
                </td>
                <td className='col-span-1 flex items-center justify-between pl-10'>
                  <span className='cursor-pointer'>
                    <MoreVertIcon />
                  </span>
                </td>
              </tr>
            ))}
          </div>
        </table>
        <TablePagination />
      </div>
    </div>
  );
};

export default Permission;
