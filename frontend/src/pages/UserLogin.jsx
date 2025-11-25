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
  Card
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  MovieFilter,
  Theaters,
  Star,
  ConfirmationNumber,
  AutoAwesome,
  Person
} from "@mui/icons-material";

const UserLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      // Success animation delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const FeatureCard = ({ icon, title, description, color }) => (
    <Card
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 16px 48px ${alpha(color, 0.3)}`
        }
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.8)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: `0 8px 24px ${alpha(color, 0.4)}`
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700} color="white" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="#ffed4e ">
        {description}
      </Typography>
    </Card>
  );

  return (
    <Box
      sx={{
       width: '100%',
       height: '100%',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        mt:-4,
        py:11,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha('#ffd700', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha('#4dabf5', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha('#00ff88', 0.05)} 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          background: `linear-gradient(135deg, ${alpha('#ffd700', 0.1)} 0%, transparent 50%)`,
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          filter: 'blur(40px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 150,
          height: 150,
          background: `linear-gradient(135deg, ${alpha('#4dabf5', 0.1)} 0%, transparent 50%)`,
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(30px)'
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Features */}
          <Grid item xs={12} md={6}>
            <Slide in direction="right" timeout={800}>
              <Box>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="h4"
                  color="white"
                  fontWeight={600}
                  sx={{ mb: 1 }}
                >
                  To Your Cinematic World
                </Typography>
                <Typography
                  variant="h6"
                  color="#ffed4e "
                  sx={{ mb: 6 }}
                >
                  Continue your journey through premium movie experiences
                </Typography>

                <Box sx={{ mb: 6 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FeatureCard
                        icon={<Theaters sx={{ fontSize: 32, color: 'white' }} />}
                        title="Premium Access"
                        description="Exclusive screenings and early ticket releases"
                        color="#ffd700"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FeatureCard
                        icon={<Star sx={{ fontSize: 32, color: 'white' }} />}
                        title="VIP Rewards"
                        description="Earn points and get special discounts"
                        color="#4dabf5"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FeatureCard
                        icon={<ConfirmationNumber sx={{ fontSize: 32, color: 'white' }} />}
                        title="Easy Booking"
                        description="Quick and secure ticket reservations"
                        color="#00ff88"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FeatureCard
                        icon={<MovieFilter sx={{ fontSize: 32, color: 'white' }} />}
                        title="Personalized"
                        description="Recommendations based on your taste"
                        color="#ff6b6b"
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box>
                    <Typography variant="h4" fontWeight={800} color="#ffd700">
                      50K+
                    </Typography>
                    <Typography variant="body2" color="#ffed4e ">
                      Happy Moviegoers
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800} color="#4dabf5">
                      500+
                    </Typography>
                    <Typography variant="body2" color="#ffed4e ">
                      Daily Screenings
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800} color="#00ff88">
                      99%
                    </Typography>
                    <Typography variant="body2" color="#ffed4e ">
                      Satisfaction Rate
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Slide>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                sx={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  borderRadius: 4,
                  p: 5,
                  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
                  }
                }}
              >
                {/* Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    background: `linear-gradient(135deg, ${alpha('#ffd700', 0.1)} 0%, transparent 50%)`,
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }}
                />

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)'
                    }}
                  >
                    <Person sx={{ fontSize: 40, color: '#000' }} />
                  </Box>
                  <Typography variant="h3" fontWeight={800} sx={{
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1
                  }}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="#ffed4e ">
                    Log in to your cinebook account
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

                <form onSubmit={handleSubmit}>
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
                          <Email sx={{ color: '#ffd700' }} />
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
                          borderColor: '#ffd700',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ffd700',
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
                        color: '#ffd700',
                      },
                    }}

                  />

                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#ffd700' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: '#ffd700' }}
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
                          borderColor: '#ffd700',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ffd700',
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
                        color: '#ffd700',
                      },
                    }}

                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <AutoAwesome /> : <Person />}
                    sx={{
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      color: '#000',
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)',
                        boxShadow: '0 16px 48px rgba(255, 215, 0, 0.5)',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        background: 'rgba(255, 215, 0, 0.3)',
                        color: 'rgba(0, 0, 0, 0.5)'
                      },
                      transition: 'all 0.3s ease',
                      mb: 3
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In to Your Account'}
                  </Button>

                  <Divider sx={{ borderColor: 'rgba(255, 215, 0, 0.2)', mb: 3 }}>
                    <Typography variant="body2" color="#ffed4e " sx={{ px: 2 }}>
                      New to CineBook?
                    </Typography>
                  </Divider>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate('/user/register')}
                    sx={{
                      borderColor: 'rgba(255, 215, 0, 0.5)',
                      color: '#ffd700',
                      fontWeight: 600,
                      py: 1.5,
                      borderRadius: 3,
                      '&:hover': {
                        borderColor: '#ffd700',
                        background: 'rgba(255, 215, 0, 0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Create Premium Account
                  </Button>
                </form>

              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

// Add the missing Grid import
import { Grid } from "@mui/material";

export default UserLogin;