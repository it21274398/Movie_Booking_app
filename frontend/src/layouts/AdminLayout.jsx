import React from "react";
import { Box, Toolbar } from "@mui/material";

import AdminTopbar from "../pages/admin/AdminTopbar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>


      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          px: 0,   // remove left/right padding
          ml: 0,   // remove default margin-left
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
