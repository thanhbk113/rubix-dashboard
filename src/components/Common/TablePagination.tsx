import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { FormControl, MenuItem, Select } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface ITablePagination {
  pagination: number;
  handleSort?: any;
}

const TablePagination: FC<ITablePagination> = ({ pagination, handleSort }) => {
  const [valuePage, setValuePage] = useState<number>(10);
  const [valueLeftPage, setValueLeftPage] = useState<number>(1);
  const [valueRightPage, setValueRightPage] = useState<number>(valuePage);

  const handlePrevPage = () => {
    handleSort({ take: valuePage });
    if (valueLeftPage <= 1) {
      setValueLeftPage(1);
      setValueRightPage(valueRightPage);
    } else if (valueRightPage >= pagination) {
      setValueLeftPage(valueLeftPage - valuePage);
      setValueRightPage(valueRightPage - (pagination % 10));
    } else {
      setValueLeftPage(valueLeftPage - valuePage);
      setValueRightPage(valueRightPage - valuePage);
    }
  };

  const handleNextPage = () => {
    handleSort({ take: valuePage });
    if (valueRightPage >= pagination) {
      setValueLeftPage(valueLeftPage);
      setValueRightPage(pagination);
    } else {
      setValueLeftPage(valueLeftPage + valuePage);
      setValueRightPage(valueRightPage + (pagination % 10));
    }
  };

  useEffect(() => {
    setValueLeftPage(1);
    if (pagination < valuePage) {
      setValueRightPage(pagination);
    } else {
      setValueRightPage(valuePage);
    }
    handleSort({ take: valuePage });
  }, [valuePage]);

  return (
    <div className="w-full h-16 flex justify-end items-center gap-4 mr-8">
      <span>Rows per page:</span>
      <FormControl fullWidth style={{ width: "66px" }}>
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
          defaultValue={10}
          onChange={(e: any) => setValuePage(e.target.value)}
          style={{
            width: "66px",
            height: "32px",
            borderRadius: "8px",
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <span>
        {valueLeftPage}-{valueRightPage} of {pagination}
      </span>
      <div className="flex justify-between items-center gap-2 pr-4">
        <span
          className={
            valueLeftPage > 1
              ? "cursor-pointer hover:bg-gray-200 rounded-full"
              : "cursor-not-allowed" + " "
          }
        >
          <KeyboardArrowLeftOutlinedIcon
            onClick={handlePrevPage}
            style={{ opacity: valueLeftPage > 1 ? "1" : "0.3" }}
          />
        </span>
        <span
          className={
            valueRightPage < pagination
              ? "cursor-pointer hover:bg-gray-200 rounded-full"
              : "cursor-not-allowed"
          }
        >
          <KeyboardArrowRightOutlinedIcon
            onClick={handleNextPage}
            style={{ opacity: valueRightPage < pagination ? "1" : "0.3" }}
          />
        </span>
      </div>
    </div>
  );
};

export default TablePagination;
