import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge
} from "@mui/material";
import {
  Menu as MenuIcon,
  Movie,
  Dashboard,
  Group,
  Receipt,
  Settings,
  Notifications,
  AdminPanelSettings,
  Logout,
  Person,
  ExpandMore
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useState } from "react";

const AdminTopbar = () => {
  const { logout, admin } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenu = (event) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchor(null);
  };

  const NavItem = ({ path, label, icon, isActive }) => (
    <Box
      onClick={() => navigate(path)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 1.5,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: isActive
          ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
          : 'transparent',
        border: isActive
          ? '1px solid rgba(255, 215, 0, 0.3)'
          : '1px solid transparent',
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.15)'
        }
      }}
    >
      {icon}
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          color: isActive ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
          background: isActive
            ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
            : 'none',
          backgroundClip: isActive ? 'text' : 'none',
          WebkitBackgroundClip: isActive ? 'text' : 'none',
          color: isActive ? 'transparent' : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        left: 0,
        top: 0,
        height: 80,
        justifyContent: "center",
        background: 'rgba(30, 30, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: 1300,
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left side - Logo & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Logo */}


        </Box>

        {/* Center - Navigation Links */}
        <Box sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          gap: 2,
          ml: -50,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <Box
            sx={{
              background: "linear-gradient(45deg, #ffd700, #ffed4e)",
              borderRadius: 3,
              p: 1,
              mr: 2,
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            }}
          >
            <Movie sx={{ fontSize: 32, color: "#000" }} />
          </Box>
          <NavItem
            path="/admin"
            label="Dashboard"
            icon={<Dashboard sx={{ fontSize: 20, color: location.pathname === '/admin' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)' }} />}
            isActive={location.pathname === '/admin'}
          />

          <NavItem
            path="/admin/users"
            label="User Management"
            icon={<Group sx={{ fontSize: 20, color: location.pathname === '/admin/users' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)' }} />}
            isActive={location.pathname === '/admin/users'}
          />

          <NavItem
            path="/admin/bookings"
            label="Bookings"
            icon={<Receipt sx={{ fontSize: 20, color: location.pathname === '/admin/bookings' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)' }} />}
            isActive={location.pathname === '/admin/bookings'}
          />
        </Box>

        {/* Right side - Actions & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications */}
          <IconButton
            onClick={handleNotifMenu}
            sx={{
              background: 'linear-gradient(135deg, rgba(77, 171, 245, 0.1), rgba(77, 171, 245, 0.05))',
              border: '1px solid rgba(77, 171, 245, 0.2)',
              color: '#4dabf5',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(77, 171, 245, 0.2)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 20px rgba(77, 171, 245, 0.3)'
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }
            }}
            onClick={handleProfileMenu}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(255, 215, 0, 0.4)'
              }}
            >
              <Person sx={{ color: '#000' }} />
            </Avatar>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" fontWeight={600} color="white">
                {admin?.name || 'Admin User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>

            <ExpandMore
              sx={{
                color: '#ffd700',
                transition: 'transform 0.3s ease',
                transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />

          </Box>
        </Box>

        {/* Profile Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              mt: 1,
              minWidth: 200
            }
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)',
                color: '#ffd700'
              }
            }}
          >
            <Person sx={{ mr: 2, fontSize: 20 }} />
            My Profile
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)',
                color: '#ffd700'
              }
            }}
          >
            <Settings sx={{ mr: 2, fontSize: 20 }} />
            Settings
          </MenuItem>

          <Divider sx={{ borderColor: 'rgba(255, 215, 0, 0.2)', my: 1 }} />

          <MenuItem
            onClick={logout}
            sx={{
              color: '#ff6b6b',
              '&:hover': {
                background: 'rgba(255, 107, 107, 0.1)',
                color: '#ff5252'
              }
            }}
          >
            <Logout sx={{ mr: 2, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              mt: 1,
              minWidth: 300
            }
          }}
        >
          <Typography variant="h6" color="#ffd700" sx={{ p: 2, pb: 1 }}>
            Notifications
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255, 215, 0, 0.2)' }} />

          <MenuItem
            onClick={handleClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)'
              }
            }}
          >
            <Box>
              <Typography variant="body2" color="#ffd700" fontWeight={600}>
                New Booking
              </Typography>
              <Typography variant="caption" color="text.secondary">
                User booked 3 tickets for Avengers
              </Typography>
            </Box>
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                background: 'rgba(255, 215, 0, 0.1)'
              }
            }}
          >
            <Box>
              <Typography variant="body2" color="#ffd700" fontWeight={600}>
                System Update
              </Typography>
              <Typography variant="caption" color="text.secondary">
                New features available in dashboard
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;