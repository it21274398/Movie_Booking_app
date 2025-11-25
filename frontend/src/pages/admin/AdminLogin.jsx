import React, { useState, useContext } from "react";
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
  Card
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Security,
  Dashboard,
  MovieFilter,
  AutoAwesome
} from "@mui/icons-material";
import axios from "../../api/axiosConfig";
import { useNavigate, Navigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, admin } = useContext(AdminAuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/admin/login", form);
      login(res.data.token);
      
      setTimeout(() => {
        navigate("/admin/movies");
      }, 1500);
      
    } catch (err) {
      setError("Invalid admin credentials. Please try again.");
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
            radial-gradient(circle at 20% 80%, ${alpha('#ff6b6b', 0.1)} 0%, transparent 50%),
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
          left: '10%',
          width: 150,
          height: 150,
          background: `linear-gradient(135deg, ${alpha('#ff6b6b', 0.1)} 0%, transparent 50%)`,
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          filter: 'blur(30px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          right: '15%',
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
           
            {/* Right Side - Login Form */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Paper
                  sx={{
                    background: 'rgba(30, 30, 30, 0.9)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(107, 134, 255, 0.3)',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: '0 25px 80px rgba(127, 107, 255, 0.2)',
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
                      background: 'linear-gradient(135deg, #6b6bffff 0%, #968effff 100%)'
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
                      background: `linear-gradient(135deg, ${alpha('#8e6bffff', 0.1)} 0%, transparent 50%)`,
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
                        background: 'linear-gradient(135deg, #7a6bffff 0%, #8e92ffff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 12px 40px rgba(255, 107, 107, 0.4)'
                      }}
                    >
                      <AdminPanelSettings sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight={800} sx={{
                      background: 'linear-gradient(135deg, #7c6bffff 0%, #9b8effff 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1
                    }}>
                      Admin Login
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Secure administrator login
                    </Typography>
                  </Box>

                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        background: 'rgba(124, 107, 255, 0.1)',
                        color: '#726bffff',
                        border: '1px solid rgba(107, 107, 255, 0.3)',
                        borderRadius: 3
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Admin Email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#6b6bffff' }} />
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
                          borderColor: '#001effff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#001effff',
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
                        color: '#1e00ffff',
                      },
                    }}
                    />

                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Admin Password"
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#6b7fffff' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ color: '#706bffff' }}
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
                          borderColor: '#3700ffff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3c00ffff',
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
                        color: '#1e00ffff',
                      },
                    }}

                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      startIcon={loading ? <AutoAwesome /> : <Security />}
                      sx={{
                        background: 'linear-gradient(135deg, #756bffff 0%, #8e92ffff 100%)',
                        color: 'white',
                        fontWeight: 700,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1rem',
                        boxShadow: '0 8px 32px rgba(107, 107, 255, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #908effff 0%, #6b72ffff 100%)',
                          boxShadow: '0 16px 48px rgba(107, 107, 255, 0.4)',
                          transform: 'translateY(-2px)'
                        },
                        '&:disabled': {
                          background: 'rgba(107, 107, 255, 0.3)',
                          color: 'rgba(255, 255, 255, 0.5)'
                        },
                        transition: 'all 0.3s ease',
                        mb: 2
                      }}
                    >
                      {loading ? 'Authenticating...' : 'Access Admin Panel'}
                    </Button>

                    <Divider sx={{ borderColor: 'rgba(255, 107, 107, 0.2)', mb: 2 }}>
                      <Typography variant="body2" color="white" sx={{ px: 2 }}>
                        New Admin sing up here?
                      </Typography>
                    </Divider>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate('/admin/register')}
                      sx={{
                        borderColor: 'rgba(124, 107, 255, 0.5)',
                        color: '#6b75ffff',
                        fontWeight: 600,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': {
                          borderColor: '#6b75ffff',
                          background: 'rgba(255, 107, 107, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Register Admin Account
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

export default AdminLogin;