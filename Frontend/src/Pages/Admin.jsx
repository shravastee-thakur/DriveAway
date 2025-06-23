import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Admin = () => {
  const { accessToken, role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/admin/getAllUsers",
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
        `http://localhost:3000/api/v1/admin/deleteUser/${userId}`,
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

        <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-left">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2 text-left break-all">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`px-3 py-1 rounded text-white ${
                        user.role === "admin"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
