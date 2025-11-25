import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Fade,
  Slide,
  alpha,
  InputAdornment,
  Divider,
  IconButton,
  Container,
  Card
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Security,
  Group,
  Badge,
  AutoAwesome
} from "@mui/icons-material";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/admin/register", form);

      setSuccess("🎉 Admin registered successfully!");
      setForm({ name: "", email: "", password: "" });

      // Redirect to admin login
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const FeatureCard = ({ icon, title, description, color }) => (
    <Card
      sx={{
        p: 2,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 32px ${alpha(color, 0.2)}`
        }
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.8)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          boxShadow: `0 6px 20px ${alpha(color, 0.3)}`
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" fontWeight={600} color="white" gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {description}
      </Typography>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha('#00ff88', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha('#4dabf5', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha('#ffd700', 0.05)} 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: 150,
          height: 150,
          background: `linear-gradient(135deg, ${alpha('#00ff88', 0.1)} 0%, transparent 50%)`,
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          filter: 'blur(30px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: 120,
          height: 120,
          background: `linear-gradient(135deg, ${alpha('#4dabf5', 0.1)} 0%, transparent 50%)`,
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(25px)'
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            {/* Left Side - Admin Features */}


            {/* Right Side - Registration Form */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Paper
                  sx={{
                    background: 'rgba(30, 30, 30, 0.9)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: '0 25px 80px rgba(0, 255, 136, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: 450,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
                    }
                  }}
                >
                  {/* Decorative Elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -30,
                      right: -30,
                      width: 120,
                      height: 120,
                      background: `linear-gradient(135deg, ${alpha('#00ff88', 0.1)} 0%, transparent 50%)`,
                      borderRadius: '50%',
                      filter: 'blur(25px)'
                    }}
                  />

                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 12px 40px rgba(0, 255, 136, 0.4)'
                      }}
                    >
                      <Badge sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} sx={{
                      background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1
                    }}>
                      Create Admin
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Register new administrator account
                    </Typography>
                  </Box>

                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        background: 'rgba(255, 107, 107, 0.1)',
                        color: '#ff6b6b',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: 3
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  {success && (
                    <Alert
                      severity="success"
                      sx={{
                        mb: 3,
                        background: 'rgba(0, 255, 136, 0.1)',
                        color: '#00ff88',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        borderRadius: 3
                      }}
                    >
                      {success}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#00ff88' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        color: 'white',
                        mb: 3,

                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': {
                            borderColor: '#00ff88',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ff88',
                          },
                        },

                        // TEXT INSIDE INPUT
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },

                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 1)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#00ff88',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Admin Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#00ff88' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        color: 'white',
                        mb: 3,

                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': {
                            borderColor: '#00ff88',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ff88',
                          },
                        },

                        // TEXT INSIDE INPUT
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },

                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 1)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#00ff88',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Admin Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#00ff88' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ color: '#00ff88' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        color: 'white',
                        mb: 3,

                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': {
                            borderColor: '#00ff88',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00ff88',
                          },
                        },

                        // TEXT INSIDE INPUT
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },

                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 1)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#00ff88',
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      startIcon={loading ? <AutoAwesome /> : <AdminPanelSettings />}
                      sx={{
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                        color: '#000',
                        fontWeight: 700,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1rem',
                        boxShadow: '0 8px 32px rgba(0, 255, 136, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #00cc6a 0%, #00ff88 100%)',
                          boxShadow: '0 16px 48px rgba(0, 255, 136, 0.4)',
                          transform: 'translateY(-2px)'
                        },
                        '&:disabled': {
                          background: 'rgba(0, 255, 136, 0.3)',
                          color: 'rgba(0, 0, 0, 0.5)'
                        },
                        transition: 'all 0.3s ease',
                        mb: 2
                      }}
                    >
                      {loading ? 'Creating Account...' : 'Register Admin Account'}
                    </Button>

                    <Divider sx={{ borderColor: 'rgba(0, 255, 136, 0.2)', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                        Already have an account?
                      </Typography>
                    </Divider>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => window.history.back()}
                      sx={{
                        borderColor: 'rgba(0, 255, 136, 0.5)',
                        color: '#00ff88',
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': {
                          borderColor: '#00ff88',
                          background: 'rgba(0, 255, 136, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Back to Admin Login
                    </Button>
                  </form>

                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

// Add the missing Grid import
import { Grid } from "@mui/material";

export default AdminRegister;