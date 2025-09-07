import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Admin = () => {
  const { accessToken, role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          "https://driveaway.onrender.com/api/v1/admin/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (error) {
        console.error("Failed in fetching users", error);
      }
    };
    if (role === "admin") {
      fetchAllUsers();
    }
  }, [role]);

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `https://driveaway.onrender.com/api/v1/admin/deleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        alert(res.data.message);
      }
    } catch (error) {
      console.error("User delete failed", error);
    }
  };

  return (
    <div className="admin-container flex flex-col items-center justify-center px-2 py-4 mt-10">
      <div className="w-full max-w-full md:max-w-[85%] lg:max-w-[70%] overflow-x-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
          Manage Users
        </h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-[#E7F0DC] ">
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>

                    <TableCell align="center">
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          user.role === "admin"
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        disabled={user.role === "admin"}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Admin;
