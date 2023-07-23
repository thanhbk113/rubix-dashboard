import { FC, useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
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
      return !isHidden ? 'password' : props.type;
    }
  };

  return (
    <div className='relative mb-4 flex  h-[56px] w-full items-center justify-between rounded-lg border border-solid border-gray-300'>
      <input
        {...parentAttributes}
        className=' h-full w-full rounded-lg px-3 outline-none'
        type={getType()}
      />
      {eyeEnable ? (
        !isHidden ? (
          <span className='text-2xl'>
            <MdOutlineVisibility
              className='absolute right-2 text-gray-400 '
              onClick={HiddenPassword}
            />
          </span>
        ) : (
          <span className='text-2xl'>
            <MdOutlineVisibilityOff
              className='absolute right-2 text-gray-400'
              onClick={HiddenPassword}
            />
          </span>
        )
      ) : null}
    </div>
  );
};

export default Input;
