import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Fade,
  Slide,
  alpha,
  InputAdornment,
  Divider,
  IconButton,
  Container,
  Card,
  Grid
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  AutoAwesome,
  HowToReg
} from "@mui/icons-material";

const UserRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/register", form);
      console.log(res.data);

      // Slight success delay animation
      setTimeout(() => {
        navigate("/user/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha("#ffd700", 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha("#4dabf5", 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha("#00ff88", 0.05)} 0%, transparent 50%)
          `,
          pointerEvents: "none"
        }
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Fade in timeout={800}>
              <Paper
                sx={{
                  background: "rgba(30, 30, 30, 0.85)",
                  borderRadius: 4,
                  p: 5,
                  backdropFilter: "blur(40px)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background:
                      "linear-gradient(135deg,#ffd700 0%, #ffed4e 100%)"
                  }
                }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      boxShadow: "0 12px 40px rgba(255,215,0,0.4)"
                    }}
                  >
                    <HowToReg sx={{ fontSize: 40, color: "#000" }} />
                  </Box>

                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                      background:
                        "linear-gradient(135deg,#ffd700 0%, #ffed4e 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent"
                    }}
                  >
                    Create Your Account
                  </Typography>

                  <Typography variant="body1" color="#ffed4e">
                    Join CineBook and enjoy a premium movie experience
                  </Typography>
                </Box>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      background: "rgba(255,107,107,0.1)",
                      borderRadius: 3,
                      color: "#ff6b6b",
                      border: "1px solid rgba(255,107,107,0.3)"
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {/* NAME */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#ffd700" }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      color: "white",
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 3,
                        "&:hover fieldset": {
                          borderColor: "#ffd700"
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffd700"
                        }
                      },
                      "& .MuiOutlinedInput-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,1)"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ffd700"
                      }
                    }}
                  />

                  {/* EMAIL */}
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#ffd700" }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      color: "white",
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 3,
                        "&:hover fieldset": {
                          borderColor: "#ffd700"
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffd700"
                        }
                      },
                      "& .MuiOutlinedInput-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,1)"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ffd700"
                      }
                    }}
                  />

                  {/* PASSWORD */}
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#ffd700" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: "#ffd700" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      color: "white",
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 3,
                        "&:hover fieldset": {
                          borderColor: "#ffd700"
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffd700"
                        }
                      },
                      "& .MuiOutlinedInput-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,1)"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ffd700"
                      }
                    }}
                  />

                  {/* SUBMIT BUTTON */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <AutoAwesome /> : <HowToReg />}
                    sx={{
                      background:
                        "linear-gradient(135deg,#ffd700 0%,#ffed4e 100%)",
                      color: "#000",
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 3,
                      boxShadow: "0 8px 32px rgba(255,215,0,0.3)",
                      fontSize: "1.1rem",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg,#ffed4e 0%,#ffd700 100%)",
                        boxShadow: "0 16px 48px rgba(255,215,0,0.5)",
                        transform: "translateY(-2px)"
                      },
                      "&:disabled": {
                        background: "rgba(255,215,0,0.3)",
                        color: "rgba(0,0,0,0.5)"
                      },
                      transition: "all 0.3s ease",
                      mb: 2
                    }}
                  >
                    {loading ? "Creating Account..." : "Register Now"}
                  </Button>

                  <Divider
                    sx={{ borderColor: "rgba(255,215,0,0.2)", my: 3 }}
                  >
                    <Typography
                      variant="body2"
                      color="#ffed4e"
                      sx={{ px: 2 }}
                    >
                      Already have an account?
                    </Typography>
                  </Divider>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate("/user/login")}
                    sx={{
                      borderColor: "rgba(255,215,0,0.5)",
                      color: "#ffd700",
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 3,
                      "&:hover": {
                        borderColor: "#ffd700",
                        background: "rgba(255,215,0,0.1)",
                        transform: "translateY(-2px)"
                      },
                      transition: "all 0.3s ease"
                    }}
                  >
                    Go to Login
                  </Button>
                </form>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserRegister;
