import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRegister from "../pages/admin/AdminRegister";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminMovies from "../pages/admin/AdminMovies";
import AddMovie from "../pages/admin/AddMovie";
import EditMovie from "../pages/admin/EditMovie";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminShowtimes from "../pages/admin/AdminShowtimes";
import AddShowtime from "../pages/admin/AddShowtime";
import EditShowtime from "../pages/admin/EditShowtime";
import AdminLogin from "../pages/admin/AdminLogin";

import Login from "../pages/UserLogin";
import Register from "../pages/UserRegister";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Showtimes from "../pages/Showtimes";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import MyBookings from "../pages/MyBookings";

import UserLayout from "../layouts/UserLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ===========================
          USER ROUTES WITH LAYOUT
      ============================ */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />


      <Route
        path="/movie/:id"
        element={
          <UserLayout>
            <MovieDetails />
          </UserLayout>
        }
      />

      <Route
        path="/movie/:id/showtimes"
        element={
          <UserLayout>
            <Showtimes />
          </UserLayout>
        }
      />

      <Route
        path="/movie/:id/seats/:showtimeId"
        element={
          <UserLayout>
            <SeatSelection />
          </UserLayout>
        }
      />

      <Route
        path="/checkout/:bookingId"
        element={
          <UserLayout>
            <Checkout />
          </UserLayout>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <UserLayout>
            <MyBookings />
          </UserLayout>
        }
      />


      {/* ===========================
          ADMIN ROUTES WITH LAYOUT
      ============================ */}

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/movies"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminMovies />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/movies/add"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AddMovie />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/movies/edit/:id"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EditMovie />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/showtimes/:movieId"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminShowtimes />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/showtimes/:movieId/add"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AddShowtime />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/showtimes/:movieId/edit/:showtimeId"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <EditShowtime />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminBookings />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* LOGIN + REGISTER SHOULD NOT USE LAYOUT */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

    </Routes>
  );
};

export default AppRoutes;
