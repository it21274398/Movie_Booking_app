import React from "react";
import { Box, Toolbar } from "@mui/material";

import AdminTopbar from "../pages/admin/AdminTopbar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{
      background: `
          linear-gradient(135deg, #1e1c1cff 0%, #1a1a1a 50%, #131212ff 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
      display: "flex", width: "100%",
    }}>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: "40px",

          width: "95%",

        }}
      >
        {/* Top Navbar */}
        <AdminTopbar />

        {/* Offset for fixed AppBar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
