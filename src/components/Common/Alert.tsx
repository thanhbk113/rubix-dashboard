import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import React, { FC } from "react";

interface IAlert {
  title: string;
  error?: boolean;
  success?: boolean;
}

const Alert: FC<IAlert> = (props) => {
  let type;
  let icon;

  if (props.error) {
    type = "border border-red-400 bg-[#ffeae9] text-[#FF4D49] rounded-lg";
    icon = <ErrorOutlineOutlinedIcon />;
  } else if (props.success) {
    type = "border border-green-500 bg-[#eefbe5] text-[#72E128] rounded-lg";
    icon = <CheckCircleOutlineOutlinedIcon />;
  }
  return (
    <div
      className={
        type + " flex items-center gap-4 w-[320px] h-[48px] pl-8 py-4 fixed right-10 top-16"
      }
    >
      {icon}
      <span>{props.title}</span>
    </div>
  );
};

export default Alert;
