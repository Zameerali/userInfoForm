import React, { useState, useEffect } from "react";
import type { User } from "../features/user/userType";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import {
  addUser,
  resetUserState,
  updateUser,
} from "../features/user/userSlice";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";

type FormProps = {
  editingUser?: User | null;
  onFinishEdit?: () => void;
};

const schema = yup
  .object({
    firstName: yup.string().required("First Name is requried"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .min(10, "Phone number must be at least 11 digits")
      .required("Phone number is required"),
    streetAddress: yup.string().required("Address is required"),
    city: yup.string().required("City name is required"),
    region: yup.string().required("Region is required"),
    postalCode: yup
      .number()
      .typeError("Must be a number")
      .required("Postal code required")
      .transform((val, oVal) => (String(oVal).trim() === "" ? undefined : val)),
    country: yup.string().required("Country name is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
function Form({ editingUser, onFinishEdit }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User>(
    editingUser || {
      id: Date.now(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      region: "",
      postalCode: 0,
      country: "",
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingUser) {
      reset(editingUser, { keepErrors: false });
    } else {
      setUser({
        id: Date.now(),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: 0,
        country: "",
      });
    }
  }, [editingUser, reset]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setUser((prevUser) => ({
        ...prevUser,
        [name]: digitsOnly,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (editingUser) {
  //     dispatch(updateUser(user));
  //     if (onFinishEdit) onFinishEdit();
  //     setSnackbarMsg("User updated successfully!");
  //   } else {
  //     dispatch(addUser(user));
  //     setSnackbarMsg("User created successfully!");
  //   }
  //   setOpen(true);
  //   setUser({
  //     id: Date.now(),
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     streetAddress: "",
  //     city: "",
  //     region: "",
  //     postalCode: 0,
  //     country: "",
  //   });
  // };

  const onSubmit = (data: FormData) => {
    const user = editingUser
      ? { ...editingUser, ...data }
      : { id: Date.now(), ...data };
    if (editingUser) {
      dispatch(updateUser(user));
      if (onFinishEdit) onFinishEdit();
      setSnackbarMsg("User updated successfully");
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: 0,
        country: "",
      });
    } else {
      dispatch(addUser(user));
      setSnackbarMsg("User Created Successfully");
    }
    setOpen(true);
    // dispatch(resetUserState());
    reset();
  };
  const [open, setOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold  sm:truncate sm:text-3xl sm:tracking-tight">
            {editingUser ? "Edit User Form" : "Add User Form"}
          </h2>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    // name="firstName"
                    id="firstName"
                    // value={user.firstName}
                    // onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    {...register("firstName")}
                  />

                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    // name="lastName"
                    id="lastName"
                    // value={user.lastName}
                    // onChange={handleChange}
                    {...register("lastName")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.lastName?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    // name="email"
                    id="email"
                    // value={user.email}
                    // onChange={handleChange}
                    {...register("email")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    // name="phone"
                    id="phone"
                    // value={user.phone}
                    // onChange={handleChange}
                    {...register("phone")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                    // pattern="\d{11,}"
                    // title="Phone number must be at least 11 digits"
                  />

                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <select
                    // name="country"
                    id="country"
                    // value={user.country}
                    // onChange={handleChange}
                    {...register("country")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  >
                    <option value="">Select Country</option>
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>

                  {errors.country && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.country?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    // name="streetAddress"
                    id="streetAddress"
                    // value={user.streetAddress}
                    // onChange={handleChange}
                    {...register("streetAddress")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.streetAddress && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.streetAddress?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-900"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    // name="city"
                    id="city"
                    // value={user.city}
                    // onChange={handleChange}
                    {...register("city")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.city?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Region
                  </label>
                  <input
                    type="text"
                    // name="region"
                    id="region"
                    // value={user.region}
                    // onChange={handleChange}
                    {...register("region")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.region && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    // name="postalCode"
                    id="postalCode"
                    // value={user.postalCode.toString()}
                    // onChange={handleChange}
                    {...register("postalCode")}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    // required
                  />

                  {errors.postalCode && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.postalCode?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              sx={{
                backgroundColor: "#4B5563",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              type="submit"
              variant="contained"
              className="rounded-md bg-dark-600 px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {editingUser ? "Update" : "Save"}
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message={snackbarMsg}
              // action={
              //   <Button color="inherit" onClick={handleClose}>
              //     Close
              //   </Button>
              //}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
