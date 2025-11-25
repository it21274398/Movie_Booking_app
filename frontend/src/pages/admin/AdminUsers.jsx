import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Chip,
  TextField,
  IconButton,
  Tooltip,
  Slide,
  alpha,
} from "@mui/material";
import { Delete, Group, Search } from "@mui/icons-material";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/total-users");

      setUsers(res.data.data || []);
    } catch (error) {
      console.log("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#ffd700" }} size={55} />
        <Typography sx={{ color: "#ffd700" }}>Loading Users...</Typography>
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            background: "linear-gradient(135deg,#ffd700,#ffed4e)",
            backgroundClip: "text",
            color: "transparent",
            mb: 3,
            mt: -6,
          }}
        >
          User Management
        </Typography>

        {/* Search */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <TextField
            placeholder="Search by name or email..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              background: "rgba(255,255,255,0.05)",
              input: { color: "#fff" },
              width: "300px",
              borderRadius: 2,
              mr: 2,
            }}
          />
          <Search sx={{ color: "#ffd700" }} />
        </Box>

        {/* Table */}
        <Paper
          sx={{
            background: "rgba(30,30,30,0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,215,0,0.2)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg,rgba(80,68,0,0.2),rgba(151,129,3,0.1))",
                }}
              >
                <TableCell sx={{ color: "#ffd700", fontWeight: 600 }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#ffd700", fontWeight: 600 }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#ffd700", fontWeight: 600 }}>
                  Role
                </TableCell>
                <TableCell sx={{ color: "#ffd700", fontWeight: 600 }}>
                  Created At
                </TableCell>
                <TableCell sx={{ color: "#ffd700", fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <Slide in={true} direction="up" timeout={400 + index * 100} key={user._id}>
                  <TableRow
                    sx={{
                      "&:hover": {
                        background: "rgba(255,215,0,0.05)",
                        transition: "0.2s",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#fff" }}>{user.name}</TableCell>
                    <TableCell sx={{ color: "#ccc" }}>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        sx={{
                          background: alpha(
                            user.role === "admin" ? "#ff6b6b" : "#4dabf5",
                            0.2
                          ),
                          color: user.role === "admin" ? "#ff6b6b" : "#4dabf5",
                          border: `1px solid ${
                            user.role === "admin"
                              ? "rgba(255,107,107,0.4)"
                              : "rgba(77,171,245,0.4)"
                          }`,
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: "#bbb" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Delete User">
                        <IconButton sx={{ color: "#ff6b6b" }}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </Slide>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminUsers;
