import { FC } from "react";

interface Props {
  title: string;
  total: number;
  image_urls: string[];
}

export const RoleCard: FC<Props> = (props) => {
  const list = ["right-[10px]", "right-[40px]", "right-[70px]", "right-[100px]"];
  return (
    <div className="shadow-lg rounded-xl bg-white relative">
      <div className="px-4 pt-6 flex flex-col">
        <div className="flex flex-row text-sm text-light-text-secondary mb-8 items-center justify-between">
          <span>Total {props.total} users</span>
          {props.image_urls.map((item, index) => {
            const a = 20;
            return (
              <img
                src={item}
                alt=""
                className={`${list[index]} w-12 h-12 rounded-full max-w-none border-4 border-white  absolute`}
              />
            );
          })}
        </div>
        <span className="text-xl text-light-text-secondary font-medium">{props.title}</span>
        <div>
          <span className="hover:border-b-light-primary-light hover:border-b cursor-pointer text-light-primary-light">
            Edit Role
          </span>
        </div>
      </div>
    </div>
  );
};
