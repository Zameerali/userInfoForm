import { useState } from "react";
import type { User } from "../features/user/userType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { deleteUser } from "../features/user/userSlice";
import Button from "@mui/material/Button";
import Form from "./Form";

function Users() {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<AppDispatch>();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleFinishEdit = () => {
    setEditingUser(null);
  };

  return (
    <>
      <Form editingUser={editingUser} onFinishEdit={handleFinishEdit} />
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight mt-6">
            Users List
          </h2>
        </div>
      </div>
      <div className="user-list">
        <ul className="mt-4 space-y-4">
          {users.map((user) => (
            <li key={user.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Phone:</b> {user.phone}
              </p>
              <p>
                <b>Address</b>: {user.streetAddress}, {user.city}, {user.region}
                , {user.postalCode}, {user.country}
              </p>
              <Button
                variant="contained"
                color="error"
                className="mt-4"
                sx={{ mt: 2 }}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                sx={{ mt: 2, mx: 1 }}
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Users;
