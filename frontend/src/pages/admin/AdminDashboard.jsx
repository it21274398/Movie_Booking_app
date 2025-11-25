import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AdminMovies from "../admin/AdminMovies";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout.jsx";

const StatCard = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        textAlign: "center",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          {icon}
        </Box>
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    movieCount: 0,
    showtimeCount: 0,
    todayBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("admin_token");

  const fetchStats = async () => {
    try {
      const moviesRes = await axios.get("/movies");
      const showtimesRes = await axios.get("/showtimes/");
      const bookingRes = await axios.get("/bookings/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookingStats = bookingRes.data?.data || {
        todayBookings: 0,
        totalRevenue: 0,
      };

      setStats({
        movieCount: moviesRes.data?.length || 0,
        showtimeCount: showtimesRes.data?.length || 0,
        todayBookings: bookingStats.todayBookings || 0,
        totalRevenue: bookingStats.totalRevenue || 0,
      });
    } catch (error) {
      console.log("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>



      <AdminMovies />

    </AdminLayout>
  );
};

export default AdminDashboard;
