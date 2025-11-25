import React from "react";

import AppRoutes from "./routes/AppRoutes";
import { Container, Box } from "@mui/material";

const App = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        width: "100%",
        paddingBottom: "2rem"
      }}
    >


      <Box sx={{ m: 4, }}>
        <AppRoutes />
      </Box>
    </Box>

  );
};

export default App;
