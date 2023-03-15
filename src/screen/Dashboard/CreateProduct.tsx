import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { CmsApi } from "../../api/cms-api";
import { Category } from "../../shared/types/categoryType";
import { ReqItem } from "../../shared/types/itemType";
import Alert from "../Common/Alert";
import Button from "../Common/Button";
import Editor from "../Common/Editor/Editor";
import Input from "../Common/Input";

interface A {
  isSuccess: boolean | null;
  message: string;
}

const CreateProduct = () => {
  const [description, setDescription] = useState<any>();
  const [category, setCategory] = useState<Category[]>([]);
  const [valueCategory, setValueCategory] = useState<any>();
  const [cost, setCost] = useState<any>(0);
  const [active, setActive] = useState<boolean>(false);

  const [message, setMessage] = useState<A>({
    isSuccess: null,
    message: "",
  });

  const initialValues: ReqItem = {
    name: "",
    description: "",
    price: 0,
    cost: 0,
    // images: [],
    categoryId: "",
    quantity: 0,
    sku: "",
    active: false,
  };

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await CmsApi.getCategory();

        setCategory(res.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    getItem();
  }, []);

  const handleSelectValueDescription = (e: React.SyntheticEvent, value: any) => {
    setValueCategory(value.id);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const reqCreateItem = {
        name: values.name,
        description: description,
        price: values.price,
        cost: cost,
        // images: values.image,
        categoryId: valueCategory,
        quantity: values.quantity,
        sku: values.sku,
        active: active,
      };

      console.log(reqCreateItem);

      try {
        const res = await CmsApi.createItem(reqCreateItem);
        setMessage({
          isSuccess: true,
          message: "Success",
        });
      } catch (error: any) {
        setMessage({ message: error.data.message, isSuccess: false });
      }

      setTimeout(() => {
        setMessage({
          isSuccess: null,
          message: "",
        });
      }, 3000);
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("You must enter your name."),
      price: Yup.string().required("You must enter your price."),
      cost: Yup.string().required("You must enter your cost."),
      quantity: Yup.string().required("You must enter your quantity."),
      sku: Yup.string().required("You must enter your sku."),
    }),
  });

  return (
    <div className="grid grid-flow-row-dense grid-cols-5 mx-10 mt-5 mb-10 gap-6 h-full">
      <div className="col-span-4 bg-white h-full rounded-xl shadow-lg px-10 py-8 font-semibold text-light-text-primary">
        <h2 className="text-xl mb-4">Create Product</h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <label htmlFor="" className="text-sm">
            Product Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-light-error text-sm">{formik.errors.name}</div>
          ) : null}

          <div className="flex justify-between items-center gap-4">
            <div className="w-full">
              <label htmlFor="" className="text-sm">
                SKU
              </label>
              <Input
                id="sku"
                name="sku"
                type="text"
                placeholder="Enter SKU"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sku}
              />
              {formik.touched.sku && formik.errors.sku ? (
                <div className="text-light-error text-sm">{formik.errors.sku}</div>
              ) : null}
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-sm">
                Quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter Quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="text-light-error text-sm">{formik.errors.quantity}</div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div className="w-full">
              <label htmlFor="" className="text-sm">
                Cost
              </label>
              <Input
                id="cost"
                name="cost"
                type="number"
                placeholder="Enter Cost"
                onChange={(e) => setCost(e.target.value)}
                onBlur={formik.handleBlur}
                value={cost}
              />
              {formik.touched.cost && formik.errors.cost ? (
                <div className="text-light-error text-sm">{formik.errors.cost}</div>
              ) : null}
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-sm">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-light-error text-sm">{formik.errors.price}</div>
              ) : null}
            </div>
          </div>

          <label htmlFor="" className="text-sm">
            Category
          </label>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={category.map((item) => ({
              id: item.id,
              label: item.name,
            }))}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleSelectValueDescription}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                style={{ borderRadius: "30px" }}
                placeholder="Category"
              />
            )}
          />
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-light-error text-sm">{formik.errors.categoryId}</div>
          ) : null}

          <Editor setText={setDescription} />

          <div className="flex justify-end">
            <Button
              type="submit"
              large
              className="mb-4 w-[12%] bg-light-primary-light rounded-lg text-white hover:shadow-lg hover:bg-light-primary-main text-sm"
              title="SUBMIT"
            />
          </div>
        </form>
      </div>

      <div className=" ">
        <div className="h-[36%] bg-white  mb-10 rounded-xl shadow-lg flex flex-col justify-center items-center gap-2">
          <Button
            className="bg-light-background-body text-light-text-primary w-[60%] h-[16%] rounded-sm shadow hover:bg-light-background-hover hover:transition flex items-center justify-evenly"
            title="Upload Image(s)"
          >
            <WallpaperIcon />
          </Button>
          <h2 className="text-sm text-light-text-primary">PNJ, JPG & GIF ACCEPTED</h2>
        </div>
        <div className="w-full h-[16%] border-2 bg-white  border-light-primary-main rounded-xl flex flex-col justify-evenly pl-6 pr-10">
          <div className="flex justify-between items-center">
            <span className="bg-[#ededff] text-light-primary-main px-1 rounded">Standard</span>
            <span className="text-lg">
              <span>${cost}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-xl text-light-text-primary">
            <span className="flex items-center justify-center">
              <Stack direction="row" spacing={1} alignItems="center">
                <AntSwitch
                  inputProps={{ "aria-label": "ant design" }}
                  checked={active}
                  onClick={() => setActive(!active)}
                />
              </Stack>
            </span>
            <span>Active</span>
          </div>
        </div>
      </div>

      {message.isSuccess === true && <Alert title={message.message} success />}
      {message.isSuccess === false && <Alert title={message.message} error />}
    </div>
  );
};

export default CreateProduct;
