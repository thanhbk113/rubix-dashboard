import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";

import { CmsApi } from "../../api/cms-api";
import { ReqSearch } from "../../shared/types/itemType";
import { ResRoles, User } from "../../shared/types/rolesType";
import TablePagination from "../Common/TablePagination";
import Title from "../Common/Title";

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
    <div className="w-full h-full px-16 pt-5  bg-light-background-body">
      <div className="mb-5">
        <h1 className="text-2xl font-medium text-light-text-primary">Permissions List</h1>
        <span className="text-light-text-secondary">
          Each category (Basic, Professional, and Business) includes the four predefined roles shown
          below.
        </span>
      </div>
      <div className="shadow-lg rounded-xl bg-white w-full">
        <table className="w-full">
          <div className="w-full h-24 flex justify-between items-center px-5">
            <input
              placeholder="Search Permission"
              className="border outline-light-primary-light px-5 border-light-borderColor  rounded-lg w-50 h-10 text-light-text-secondary font-medium"
              onChange={(e) => handleSort({ search: e.target.value })}
            ></input>
            <button className=" border-light-borderColor rounded-lg w-[12rem] h-10 text-white font-medium bg-[#666cff]">
              ADD PERMISSION
            </button>
          </div>
          <tr className="w-full h-16  bg-light-background-body grid grid-cols-8 border border-collapse">
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "username", order: "ASC" })}
                title="NAME"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-3">
              <Title
                handleSort={() => handleSort({ sort: "email", order: "ASC" })}
                title="ASSIGNED TO"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "role", order: "ASC" })}
                title="CREATE DATE"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-1">
              <Title
                isLast
                handleSort={() => handleSort({ sort: "phone", order: "ASC" })}
                title="ACTIONS"
                width="w-60"
              ></Title>
            </th>
          </tr>
          <div className="w-full flex flex-col justify-between items-center">
            {users?.map((user, index) => (
              <tr className="w-full h-16 grid grid-cols-8 border-b hover:bg-light-background-hover">
                <td className="col-span-2 pl-5 flex items-center justify-between">
                  {user.username}
                </td>
                <td className="col-span-3 pl-5 flex items-center justify-between">{user.role}</td>
                <td className="col-span-2 pl-5 flex items-center justify-between">
                  {user.created_at}
                </td>
                <td className="col-span-1 pl-10 flex items-center justify-between">
                  <span className="cursor-pointer">
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
