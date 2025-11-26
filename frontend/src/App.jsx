import React from "react";

import AppRoutes from "./routes/AppRoutes";
import { Container, Box } from "@mui/material";

const App = () => {
  return (
    <Box
      sx={{
        //background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
         background: `
          linear-gradient(135deg, #1e1c1cff 0%, #1a1a1a 50%, #131212ff 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
        minHeight: "100vh",
        width: "97.9%",
        paddingBottom: "2rem"
      }}
    >


      <Box sx={{ m: -5, }}>
        <AppRoutes />
      </Box>
    </Box>

  );
};

export default App;
