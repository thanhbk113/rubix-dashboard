import { FC } from "react";

interface ISocial {
  children: React.ReactNode;
}

const Social: FC<ISocial> = (props) => {
  return (
    <div className="w-full h-6 flex justify-center items-center gap-6 cursor-pointer">
      {props.children}
    </div>
  );
};

export default Social;
