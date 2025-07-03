import React, { useState, useEffect } from "react";
import type { User } from "../features/user/userType";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addUser, updateUser } from "../features/user/userSlice";
import Button from "@mui/material/Button";
import "./Form.css";

type FormProps = {
  editingUser?: User | null;
  onFinishEdit?: () => void;
};

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
      postalCode: "",
      country: "",
    }
  );

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
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
        postalCode: "",
        country: "",
      });
    }
  }, [editingUser]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser(user));
      if (onFinishEdit) onFinishEdit();
    } else {
      dispatch(addUser(user));
    }
    setUser({
      id: Date.now(),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
    });
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
        <form onSubmit={handleSubmit} className="user-form">
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
                    name="firstName"
                    id="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="lastName"
                    id="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                    pattern="\d{11,}"
                    title="Phone number must be at least 11 digits"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={user.country}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  >
                    <option value="">Select Country</option>
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
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
                    name="streetAddress"
                    id="streetAddress"
                    value={user.streetAddress}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="city"
                    id="city"
                    value={user.city}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="region"
                    id="region"
                    value={user.region}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
                    name="postalCode"
                    id="postalCode"
                    value={user.postalCode}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
                    required
                  />
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
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
