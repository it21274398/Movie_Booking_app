import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Paper,
} from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import axios from "../../api/axiosConfig";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      // Full list from backend
      const res = await axios.get("http://localhost:8000/api/bookings/");
      setBookings(res.data.data || []);

    } catch (err) {
      console.log("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight={700} mb={3}>
        All Bookings
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Movie</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Seats</strong></TableCell>
                <TableCell><strong>Total (Rs)</strong></TableCell>
                <TableCell><strong>Booked On</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((b) => {
                const showtimeDate = new Date(b.showtime?.showDate).toLocaleDateString();
                const bookingDate = new Date(b.createdAt).toLocaleString();

                return (
                  <TableRow key={b._id}>
                    <TableCell>{b.user?.email || "Guest"}</TableCell>
                    <TableCell>{b.movie?.title}</TableCell>
                    <TableCell>{showtimeDate}</TableCell>
                    <TableCell>{b.showtime?.showTime}</TableCell>
                    <TableCell>{b.seats.join(", ")}</TableCell>
                    <TableCell>{b.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{bookingDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </AdminLayout>
  );
};

export default AdminBookings;
