import { IosShare } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Checkbox, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CmsApi } from "../../api/cms-api";
import { ReqSearch } from "../../shared/types/itemType";
import { ResGetRoles, ResGetUsers, ResRoles, User } from "../../shared/types/rolesType";
import { RoleCard } from "../Common/RoleCard";
import TablePagination from "../Common/TablePagination";
import Title from "../Common/Title";

const listImg = [
  "https://www.pngarts.com/files/11/Avatar-PNG-Transparent-Image.png",
  "https://www.pngarts.com/files/11/Avatar-PNG-Transparent-Image.png",
  "https://www.pngarts.com/files/11/Avatar-PNG-Transparent-Image.png",
  "https://www.pngarts.com/files/11/Avatar-PNG-Transparent-Image.png",
];

const Roles = () => {
  const [roles, setRoles] = React.useState<ResRoles[]>([]);
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
    CmsApi.getRoles().then((res) => {
      setRoles(res.data.data);
    });

    CmsApi.getUsers({}).then((res) => {
      setUser(res.data.data);
      setPagination(res.data.meta);
    });
  }, []);

  return (
    <div className="w-full px-16 pt-10 bg-light-background-body">
      <div className="mb-5">
        <h1 className="text-2xl font-medium text-light-text-primary">Roles List</h1>
        <span className="text-light-text-secondary">
          A role provided access to predefined menus and features so that depending on assigned role
          an administrator can have access to what he need
        </span>
      </div>
      <div className="h-36 grid grid-cols-3 gap-5">
        {roles.map((item, index) => (
          <RoleCard
            title={item.user_role}
            image_urls={item.users.map((user) => user.avatar)}
            total={item.total}
          ></RoleCard>
        ))}
      </div>
      <h1 className="text-2xl font-medium text-light-text-primary mt-12">
        Total users with their roles
      </h1>
      <div className="mb-5">
        <span className="text-light-text-secondary">
          Find all of your company's administrator accounts and their associate roles.
        </span>
      </div>
      <div className="shadow-lg rounded-xl bg-white w-full ">
        <div className="w-full h-24">
          <div className="h-full flex flex-row items-center mx-5 justify-between">
            <button className="border border-light-borderColor rounded-lg w-36 h-10 text-light-text-secondary font-medium">
              <div className="flex flex-row items-center justify-center space-x-2">
                <IosShare style={{ fontSize: "20px" }} />
                <span className="">EXPORT</span>
              </div>
            </button>
            <div className="flex flex-row">
              <input
                placeholder="Search"
                className="border outline-light-primary-light px-5 border-light-borderColor mr-5 rounded-lg w-[600px] h-10 text-light-text-secondary font-medium"
                onChange={(e) => handleSort({ search: e.target.value })}
              ></input>
              <FormControl fullWidth style={{ width: "150px" }}>
                <Select
                  sx={{
                    "& .MuiSelect-select .notranslate::after": "placeholder"
                      ? {
                          content: `"${"Select Role"}"`,
                          opacity: 0.6,
                          fontWeight: 400,
                        }
                      : {},
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  // onChange={handleChange}
                  style={{
                    height: "40px",
                    borderRadius: "8px",
                  }}
                >
                  {roles.map((item, index) => (
                    <MenuItem value={item.user_role}>{item.user_role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <table className="w-full">
          <tr className="w-full h-16  bg-light-background-body grid grid-cols-11 border border-collapse">
            <th className="col-span-1 flex justify-center items-center">
              <Checkbox style={{ color: "rgba(76, 78, 100, 0.68)" }} />
            </th>
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "username", order: "ASC" })}
                title="USER"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "email", order: "ASC" })}
                title="EMAIL"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "role", order: "ASC" })}
                title="ROLE"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-2">
              <Title
                handleSort={() => handleSort({ sort: "phone", order: "ASC" })}
                title="PHONE"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-1">
              <Title
                handleSort={() => handleSort({ sort: "action", order: "ASC" })}
                title="STATUS"
                width="w-60"
              ></Title>
            </th>
            <th className="col-span-1">
              <Title title="ACTIONS" width="w-60" isLast={true}></Title>
            </th>
          </tr>
          <div className="w-full flex flex-col justify-between items-center">
            {users?.map((user, index) => (
              <tr className="w-full h-16 grid grid-cols-11 border-b hover:bg-light-background-hover">
                <td className="col-span-1 flex justify-center items-cente">
                  <span className="flex justify-center items-center">
                    <Checkbox style={{ color: "rgba(76, 78, 100, 0.68)" }} />
                  </span>
                </td>
                <td className="col-span-2 pl-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-[36px] h-[36px] rounded-full">
                      <img className="w-full h-full rounded-full" src={user.avatar} alt="" />
                    </span>
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className="col-span-2 pl-5 flex items-center justify-between">{user.email}</td>
                <td className="col-span-2 pl-5 flex items-center justify-between">{user.role}</td>
                <td className="col-span-2 pl-5 flex items-center justify-between">{user.phone}</td>
                <td className="col-span-1 pl-5 flex items-center justify-between">{user.status}</td>
                <td className="col-span-1 pl-10 flex items-center justify-between">
                  <span className="cursor-pointer">
                    <MoreVertIcon />
                  </span>
                </td>
              </tr>
            ))}
          </div>
        </table>
        <TablePagination pagination={pagination.itemCount} handleSort={handleSort} />
      </div>
    </div>
  );
};

export default Roles;
