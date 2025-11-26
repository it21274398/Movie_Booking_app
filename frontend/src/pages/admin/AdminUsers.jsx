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
  Grid,
  Card,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import {
  Delete,
  Group,
  Search,
  Email,
  CalendarToday,
  AdminPanelSettings,
  Person,
  Block,
  Edit,
  MoreVert,
  FilterList,
  TrendingUp
} from "@mui/icons-material";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, admins: 0, users: 0, active: 0 });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/total-users");
      const usersData = res.data.data || [];
      setUsers(usersData);
      calculateStats(usersData);
    } catch (error) {
      console.log("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (usersData) => {
    const total = usersData.length;
    const admins = usersData.filter(user => user.role === 'admin').length;
    const users = usersData.filter(user => user.role === 'user').length;
    const active = usersData.filter(user => user.status !== 'inactive').length;

    setStats({ total, admins, users, active });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`/users/${selectedUser._id}`);
      fetchUsers();
      setDeleteDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || u.role === roleFilter)
  );

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(color, 0.2)}`
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{
            background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.8)})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 0.5
          }}>
            {value}
          </Typography>
          <Typography variant="h6" fontWeight={600} color="white" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="#ffd700">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#00ff88';
      case 'inactive': return '#ff6b6b';
      case 'suspended': return '#ffd700';
      default: return '#4dabf5';
    }
  };

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
        <CircularProgress
          size={60}
          sx={{
            color: '#ffd700',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round'
            }
          }}
        />
        <Typography variant="h6" sx={{
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 600
        }}>
          Loading Users...
        </Typography>
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}>
            User Management
          </Typography>
     

          {/* Statistics Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Users"
                value={stats.total}
                subtitle="Registered accounts"
                icon={<Group sx={{ color: '#ffd700', fontSize: 32 }} />}
                color="#ffd700"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Admins"
                value={stats.admins}
                subtitle="Administrative accounts"
                icon={<AdminPanelSettings sx={{ color: '#ff6b6b', fontSize: 32 }} />}
                color="#ff6b6b"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Regular Users"
                value={stats.users}
                subtitle="Customer accounts"
                icon={<Person sx={{ color: '#4dabf5', fontSize: 32 }} />}
                color="#4dabf5"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Users"
                value={stats.active}
                subtitle="Currently active"
                icon={<TrendingUp sx={{ color: '#00ff88', fontSize: 32 }} />}
                color="#00ff88"
              />
            </Grid>
          </Grid>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#ffd700' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                minWidth: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#ffd700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffd700',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                }
              }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 3,
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffd700',
                  },
                }}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admins</MenuItem>
                <MenuItem value="user">Users</MenuItem>
              </Select>
            </FormControl>

            <Chip
              icon={<FilterList />}
              label={`${filteredUsers.length} users found`}
              sx={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                color: '#ffd700',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Box>

        {/* Users Table */}
        <Paper
          sx={{
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 215, 0, 0.1)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)'
              }}>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person /> User
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email /> Contact
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AdminPanelSettings /> Role & Status
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday /> Member Since
                  </Typography>
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <Slide in timeout={500 + (index * 100)} direction="up" key={user._id}>
                  <TableRow
                    sx={{
                      '&:hover': {
                        background: 'rgba(255, 215, 0, 0.05)',
                        transform: 'scale(1.01)',
                        transition: 'all 0.3s ease'
                      },
                      borderBottom: '1px solid rgba(255, 215, 0, 0.05)'
                    }}
                  >
                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 45,
                            height: 45,
                            background: `linear-gradient(135deg, ${user.role === 'admin' ? '#ff6b6b' : '#4dabf5'}, ${alpha(user.role === 'admin' ? '#ff6b6b' : '#4dabf5', 0.7)})`,
                            fontWeight: 600,
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={600} color="white">
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="#ffd700">
                            ID: {user._id?.substring(0, 8)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Typography variant="body1" color="white" sx={{ mb: 0.5 }}>
                        {user.email}
                      </Typography>

                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex',  gap: 1 }}>
                        <Chip
                          label={user.role?.toUpperCase()}
                          size="small"
                          sx={{
                            px:4,
                            background: user.role === 'admin'
                              ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.1))'
                              : 'linear-gradient(135deg, rgba(26, 255, 0, 0.2), rgba(51, 255, 0, 0.1))',
                            color: user.role === 'admin' ? '#ff6b6b' : '#78c790ff',
                            border: `1px solid ${user.role === 'admin' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(77, 171, 245, 0.3)'}`,
                            fontWeight: 600
                          }}
                        />

                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Typography variant="body1" color="white" fontWeight={600}>
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </Typography>
                      <Typography variant="caption" color="#ffd700">
                        {new Date(user.createdAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>



                  </TableRow>
                </Slide>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          PaperProps={{
            sx: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(255, 107, 107, 0.3)'
            }
          }}
        >
          <DialogTitle sx={{
            color: '#ff6b6b',
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), transparent)',
            py: 3
          }}>
            Confirm User Deletion
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" color="white" sx={{ mb: 2 }}>
              Are you sure you want to delete this user?
            </Typography>
            {selectedUser && (
              <Box sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, #ff6b6b, #ff8e8e)`,
                    margin: '0 auto 16px',
                    fontWeight: 600,
                    fontSize: '1.5rem'
                  }}
                >
                  {getInitials(selectedUser.name)}
                </Avatar>
                <Typography variant="h5" color="#ffd700" fontWeight={700} sx={{ mb: 1 }}>
                  {selectedUser.name}
                </Typography>
                <Typography variant="body2" color="#ffd700">
                  {selectedUser.email}
                </Typography>
                <Typography variant="body2" color="#ffd700" sx={{ mt: 2 }}>
                  This action cannot be undone and will permanently delete the user account.
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 4, px: 4 }}>
            <Button
              onClick={() => setDeleteDialog(false)}
              variant="outlined"
              sx={{
                borderColor: 'rgba(255, 215, 0, 0.5)',
                color: '#ffd700',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: '#ffd700',
                  background: 'rgba(255, 215, 0, 0.1)'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                color: 'white',
                fontWeight: 700,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff5252, #ff6b6b)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Delete User
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminUsers;