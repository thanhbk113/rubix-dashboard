import React, { FC } from 'react';
import {
  MdOutlineCheckCircleOutline,
  MdOutlineErrorOutline,
} from 'react-icons/md';

interface IAlert {
  title: string;
  error?: boolean;
  success?: boolean;
}

const Alert: FC<IAlert> = (props) => {
  let type;
  let icon;

  if (props.error) {
    type = 'border border-red-400 bg-[#ffeae9] text-[#FF4D49] rounded-lg';
    icon = <MdOutlineErrorOutline />;
  } else if (props.success) {
    type = 'border border-green-500 bg-[#eefbe5] text-[#72E128] rounded-lg';
    icon = <MdOutlineCheckCircleOutline />;
  }
  return (
    <div
      className={
        type +
        ' fixed right-10 top-16 flex h-[48px] w-[320px] items-center gap-4 py-4 pl-8'
      }
    >
      <span className='text-2xl'>{icon}</span>
      <span>{props.title}</span>
    </div>
  );
};

export default Alert;
