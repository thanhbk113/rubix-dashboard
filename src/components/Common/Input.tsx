import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { FC, useState } from "react";

interface IInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  eyeEnable?: boolean;
}

const Input: FC<IInput> = (props) => {
  const [isHidden, setHidden] = useState<boolean>(false);
  const { type, eyeEnable, className, ...parentAttributes } = props;
  const HiddenPassword = () => {
    setHidden(!isHidden);
  };
  const getType = () => {
    if (type) {
      return type;
    } else {
      return !isHidden ? "password" : props.type;
    }
  };

  return (
    <div className="w-full h-[56px] rounded-lg  mb-4 flex items-center justify-between relative border-gray-300 border-solid border">
      <input
        {...parentAttributes}
        className=" w-full h-full px-3 outline-none rounded-lg"
        type={getType()}
      />
      {eyeEnable ? (
        !isHidden ? (
          <VisibilityOutlinedIcon
            className="text-gray-400 absolute right-2 "
            onClick={HiddenPassword}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            className="text-gray-400 absolute right-2"
            onClick={HiddenPassword}
          />
        )
      ) : null}
    </div>
  );
};

export default Input;
