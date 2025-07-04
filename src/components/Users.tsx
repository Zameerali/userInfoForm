import { useState } from "react";
import type { User } from "../features/user/userType";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { deleteUser } from "../features/user/userSlice";
import Button from "@mui/material/Button";
import Form from "./Form";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  

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
      <Box
        sx={{
          overflowX: "auto",
          "& .MuiTableContainer-root": {
            border: "none",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Street Address</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Region</StyledTableCell>
                <StyledTableCell align="center">Postal Code</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id} sx={{}}>
                  <StyledTableCell component="th" scope="row">
                    {user.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.phone}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.streetAddress}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.city}</StyledTableCell>
                  <StyledTableCell align="right">{user.region}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.postalCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.country}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex sm:flex-row flex-col gap-2 items-center justify-end">
                      <Button
                        onClick={() => handleEdit(user)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Delete
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <div className="user-list mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg text-xs sm:text-sm">
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="user-list mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-800 text-white sticky top-0 z-10">
              <th className="border px-2 py-2">First Name</th>
              <th className="border px-2 py-2">Last Name</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Phone</th>
              <th className="border px-2 py-2 hidden md:table-cell">
                Street Address
              </th>
              <th className="border px-2 py-2 hidden sm:table-cell">City</th>
              <th className="border px-2 py-2 hidden md:table-cell">Region</th>
              <th className="border px-2 py-2 hidden lg:table-cell">
                Postal Code
              </th>
              <th className="border px-2 py-2 hidden sm:table-cell">Country</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="border px-2 py-2">{user.firstName}</td>
                  <td className="border px-2 py-2">{user.lastName}</td>
                  <td className="border px-2 py-2">{user.email}</td>
                  <td className="border px-2 py-2">{user.phone}</td>
                  <td className="border px-2 py-2 hidden md:table-cell">
                    {user.streetAddress}
                  </td>
                  <td className="border px-2 py-2 hidden sm:table-cell">
                    {user.city}
                  </td>
                  <td className="border px-2 py-2 hidden md:table-cell">
                    {user.region}
                  </td>
                  <td className="border px-2 py-2 hidden lg:table-cell">
                    {user.postalCode}
                  </td>
                  <td className="border px-2 py-2 hidden sm:table-cell">
                    {user.country}
                  </td>
                  <td className="border px-2 py-2 whitespace-nowrap">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> */}
    </>
  );
}

export default Users;
