import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Fade,
  Container,
  Badge,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Movie,
  ConfirmationNumber,
  AccountCircle,
  ExitToApp,
  Home,
  Star,
  LocalMovies,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/user/login");
  };

  const handleLogin = () => {
    navigate("/user/login");
  };

  return (
    <AppBar

      position="static"
      elevation={0}
      sx={{
        mt: 5,

        background: `
          linear-gradient(135deg, #1d1d1dff 0%, #1a1a1a 50%, #13121295 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #ffd900 50%, transparent 100%)",
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
        }}>

          {/* LEFT — LOGO */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/")}
          >
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(45deg, #f2f78eff 30%, #ffd700 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              CineBook
            </Typography>

          </Box>

          {/* MOBILE MENU */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            {user && (
              <Badge
                color="secondary"
                variant="dot"
                sx={{
                  "& .MuiBadge-dot": {
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                  },
                }}
              >
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    color: "#ffd700",
                    background: "rgba(255, 215, 0, 0.1)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    "&:hover": {
                      background: "rgba(255, 215, 0, 0.2)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Badge>
            )}
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
              sx={{
                color: "#ffd700",
                background: "rgba(255, 215, 0, 0.1)",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                "&:hover": {
                  background: "rgba(255, 215, 0, 0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* DESKTOP NAV LINKS */}
          <Box sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap:3
          }}>
            <Button
              startIcon={<Home />}
              onClick={() => navigate("/")}
              sx={{
                color: "#fff",
                fontWeight: 600,

                px: 2,
                py: 1,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#ffd700",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Home
            </Button>


            <Button
              startIcon={<ConfirmationNumber />}
              onClick={() => navigate("/my-bookings")}
              sx={{
                color: "#fff",
                fontWeight: 600,

                px: 2,
                py: 1,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 215, 0, 0.1)",
                  color: "#ffd700",
                  transform: "translateY(-2px)",
                },
              }}
            >
              My Bookings
            </Button>

            {user ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
                  <Chip
                    icon={<Star sx={{ color: "#ffd700!important" }} />}
                    label={`Welcome, ${user.name || user.email}`}
                    sx={{
                      background: "rgba(255, 215, 0, 0.1)",
                      color: "#ffd700",
                      border: "1px solid rgba(255, 215, 0, 0.3)",
                      fontWeight: 600,
                      "& .MuiChip-icon": {
                        color: "#ffd700!important",
                      },
                    }}
                  />
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{
                      color: "#ffd700",
                      background: "rgba(255, 215, 0, 0.1)",
                      border: "1px solid rgba(255, 215, 0, 0.3)",
                      "&:hover": {
                        background: "rgba(255, 215, 0, 0.2)",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<AccountCircle />}
                onClick={handleLogout}
                sx={{
                  background: "rgba(0, 0, 0, 1)",
                  color: "#ff0000ff",
                  fontWeight: 600,
                  mr:-5,
                  borderRadius: 3,
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-2px)",
                    background: "rgba(255, 0, 0, 1)",
                    boxShadow: "0 8px 25px rgba(255, 0, 0, 0.4)",
                    color: "#000000ff",
                  },

                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* MOBILE MENU */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            borderRadius: 3,
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem
          onClick={() => { navigate("/"); handleMobileMenuClose(); }}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <Home sx={{ mr: 2, color: "#ffd700" }} /> Home
        </MenuItem>
        <MenuItem
          onClick={() => { navigate("/movies"); handleMobileMenuClose(); }}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <LocalMovies sx={{ mr: 2, color: "#ffd700" }} /> Movies
        </MenuItem>
        <MenuItem
          onClick={() => { navigate("/my-bookings"); handleMobileMenuClose(); }}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <ConfirmationNumber sx={{ mr: 2, color: "#ffd700" }} /> My Bookings
        </MenuItem>
        <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)" }} />
        {user ? (
          <MenuItem
            onClick={handleLogout}
            sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
          >
            <ExitToApp sx={{ mr: 2, color: "#ffd700" }} /> Logout
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => { navigate("/user/login"); handleMobileMenuClose(); }}
            sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
          >
            <AccountCircle sx={{ mr: 2, color: "#ffd700" }} /> Login
          </MenuItem>
        )}
      </Menu>

      {/* USER MENU */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            borderRadius: 3,
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <MenuItem
          onClick={handleUserMenuClose}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <AccountCircle sx={{ mr: 2, color: "#ffd700" }} /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => { navigate("/my-bookings"); handleUserMenuClose(); }}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <ConfirmationNumber sx={{ mr: 2, color: "#ffd700" }} /> My Bookings
        </MenuItem>
        <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)" }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ color: "#fff", "&:hover": { background: "rgba(255, 215, 0, 0.1)" } }}
        >
          <ExitToApp sx={{ mr: 2, color: "#ffd700" }} /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;