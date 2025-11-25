import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";       // ⬅️ ADD THIS
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminTopbar = () => {
  const { logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();                    // ⬅️ ADD THIS

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",    
        left: 0,
        top: 0,
        height: 110,
        justifyContent: "center",
        backgroundColor: "#1e1e1e",
        zIndex: 1300,
      }}
      elevation={2}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {/* Left side */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: "40px", ml: 5, cursor: "pointer" }}
          onClick={() => navigate("/admin")}           // ⬅️ CLICK → GO TO DASHBOARD
        >
          Admin Panel
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>

          <Button
            color="error"
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;
