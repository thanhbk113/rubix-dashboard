import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FC, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { selectIsShow } from "../../features/dashboard/dashboardRouteSlice";
import Menu from "./ListItem";

export interface IRoutes {
  path: string;
  extract?: boolean;
  label: React.ReactNode;
  idx?: number;
}

interface INavMenu
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  isEnableArrowIcon: boolean;
  labelIcon: React.ReactNode;
  listRoutes: IRoutes[];
}

const NavMenu: FC<INavMenu> = (props) => {
  const isShow = useAppSelector(selectIsShow);
  const { title, isEnableArrowIcon, labelIcon, listRoutes: items, ...attrs } = props;
  const [isHidden, setIsHidden] = useState(false);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  const a = isHidden
    ? " flex justify-between items-center py-2 px-4 mb-2 rounded-lg cursor-pointer bg-light-background-hover"
    : " flex justify-between items-center py-2 px-4 mb-2 rounded-lg cursor-pointer bg-light-background-body";
  return (
    <div className="w-full px-3 pb-2 ">
      {isShow ? (
        <div className={attrs.className + a} onClick={handleHidden}>
          <div className="flex gap-2 items-center whitespace-nowrap">
            <span>{labelIcon}</span>
            <span>{title}</span>
          </div>
          {isEnableArrowIcon ? (
            !isHidden ? (
              <KeyboardArrowRightIcon className="text-light-text-primary" />
            ) : (
              <KeyboardArrowDownOutlinedIcon className="text-light-text-primary" />
            )
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center items-center whitespace-nowrap">
          <span className="p-2">{labelIcon}</span>
        </div>
      )}

      {isHidden && isShow ? (
        <div className="flex flex-col">
          {items.map((item, idx) => (
            <Menu route={{ idx, ...item }} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NavMenu;
