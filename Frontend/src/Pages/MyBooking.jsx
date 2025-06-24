import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const MyBooking = () => {
  const [myBooking, setMyBooking] = useState([]);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const getMyBooking = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/booking/myBooking",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setMyBooking(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch my bookings", error);
      }
    };

    getMyBooking();
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
        setMyBooking((prev) =>
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
          My Bookings
        </h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-[#E7F0DC] ">
                <TableCell align="center">Car</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myBooking.map((booking) => (
                <TableRow
                  key={booking._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{booking.car?.modelName}</TableCell>
                  <TableCell align="center">
                    {new Date(booking.startDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(booking.endDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="center">{booking.pickupLocation}</TableCell>
                  <TableCell align="center">{booking.dropLocation}</TableCell>
                  <TableCell align="center">
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Cancel
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

export default MyBooking;
