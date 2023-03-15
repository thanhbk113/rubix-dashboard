import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useState } from "react";

const Title = ({
  width,
  title,
  isLast,
  handleSort,
}: {
  width: string;
  title: string;
  isLast?: boolean;
  handleSort?: any;
}) => {
  const [hiddenSort, setHiddenSort] = useState<boolean>(false);

  const handleHiddenSort = () => {
    setHiddenSort(!hiddenSort);
  };

  return (
    <div
      className="flex flex-row items-center justify-between h-full cursor-pointer"
      onMouseEnter={handleHiddenSort}
      onMouseLeave={handleHiddenSort}
    >
      <span className="text-xs text-light-text-secondary ml-5 h-full flex items-center gap-2">
        <span>{title}</span>
        {hiddenSort && (
          <span className="cursor-pointer" onClick={() => handleSort()}>
            <ArrowDownwardOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
        )}
      </span>

      {!isLast && <span className="text-gray-300">|</span>}
    </div>
  );
};

export default Title;
