import { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const { accessToken, role } = useContext(AuthContext);

  useEffect(() => {
    const getAllBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/booking/getAllBookings",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error("Failed to get all bookings", error);
      }
    };

    if (role === "admin") {
      getAllBookings();
    }
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/booking/deleteBooking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setBookings((prev) =>
          prev.filter((booking) => booking._id !== bookingId)
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
              <TableRow className="bg-[#E7F0DC]">
                <TableCell>Email</TableCell>
                <TableCell align="right">Car</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {booking.user?.email}
                  </TableCell>
                  <TableCell align="right">{booking.car?.modelName}</TableCell>
                  <TableCell align="right">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{booking.pickupLocation}</TableCell>
                  <TableCell align="right">{booking.dropLocation}</TableCell>
                  <TableCell align="right">
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AllBooking;
