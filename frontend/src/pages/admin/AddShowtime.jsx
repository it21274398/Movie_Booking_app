import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  Chip,
  Fade,
  Slide,
  alpha,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@mui/material";
import {
  Schedule,
  CalendarToday,
  AttachMoney,
  Theaters,
  Add,
  MovieFilter,
  LocationOn,
  ConfirmationNumber,
  AutoAwesome
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";

const AddShowtime = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cinemaHalls, setCinemaHalls] = useState(["Hall 1", "Hall 2", "Hall 3", "VIP Hall"]);
  const [timeSlots, setTimeSlots] = useState([
    "10:00", "13:00", "16:00", "19:00", "22:00"
  ]);

  const [form, setForm] = useState({
    showDate: "",
    showTime: "",
    price: "",
    cinemaHall: "Hall 1"
  });


  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    if (loading) return;
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await axios.post("/showtimes", {
        movie: movieId,
        cinemaHall: form.cinemaHall,
        showDate: form.showDate,
        showTime: form.showTime,
        price: Number(form.price)
      });

      setSuccess("🎬 Showtime added successfully!");
      setTimeout(() => {
        navigate(`/admin/showtimes/${movieId}`);
      }, 1500);
    } catch (err) {
      setLoading(false); 
      setError("Failed to add showtime. Please check all fields.");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const PriceTierChip = ({ price, label, color }) => (
    <Chip
      label={`${label}: Rs. ${price}`}
      clickable
      onClick={() => setForm(prev => ({ ...prev, price }))}
      sx={{
        background: form.price === price
          ? `linear-gradient(135deg, ${color}, ${alpha(color, 0.7)})`
          : `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`,
        color: form.price === price ? 'white' : color,
        border: `1px solid ${alpha(color, 0.3)}`,
        fontWeight: 600,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 16px ${alpha(color, 0.3)}`
        }
      }}
    />
  );

  if (loading) {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 3
      }}>
        <CircularProgress
          size={60}
          sx={{
            color: '#ffd700',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round'
            }
          }}
        />
        <Typography variant="h6" sx={{
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 600
        }}>
          Loading Movie Details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1200, margin: 'auto',height:'100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' ,mt:10}}>
        <Typography variant="h2" fontWeight={800} sx={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 2
        }}>
          Add New Showtime
        </Typography>
      
      </Box>

      <Grid container spacing={4}>
        {/* Form Section */}
        <Grid item xs={12} md={8}>
          <Slide in direction="right" timeout={500}>
            <Paper
              sx={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
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
                <Grid container spacing={3}>
                  {/* Movie Info Header */}
                  <Grid item xs={12}>
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: 3, mb: 3, p: 3,
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}>
                      {movie?.posterUrl && (
                        <Box
                          component="img"
                          src={movie.posterUrl}
                          alt={movie.title}
                          sx={{
                            width: 80,
                            height: 120,
                            borderRadius: 2,
                            objectFit: 'cover',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                          }}
                        />
                      )}
                      <Box>
                        <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                          {movie?.title}
                        </Typography>
                        <Typography variant="body1" color="white" gutterBottom>
                          {movie?.genre?.join(' • ')}
                        </Typography>
                        <Typography variant="body2" color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Theaters sx={{ fontSize: 18 }} />
                          {movie?.duration} mins • {movie?.rating}/10
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Showtime Details */}
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={700} sx={{
                      color: '#ffd700',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Schedule /> Showtime Details
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      label="Show Date"
                      name="showDate"
                      value={form.showDate}

                      fullWidth
                      required
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0]
                      }}
                      sx={{
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
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#ffd700',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{
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
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#ffd700',
                        },
                      }}>
                      <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Show Time</InputLabel>
                      <Select
                        name="showTime"
                        value={form.showTime}
                        label="Show Time"
                        onChange={handleChange}
                        required
                      >
                        {timeSlots.map((time) => (
                          <MenuItem key={time} value={time}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Schedule sx={{ color: '#ffd700', fontSize: 18 }} />
                              <Typography>{time}</Typography>
                              <Chip
                                label={time === "22:00" ? "Late" : time === "10:00" ? "Morning" : "Prime"}
                                size="small"
                                sx={{
                                  background: `linear-gradient(135deg, ${alpha('#ffd700', 0.2)}, ${alpha('#ffd700', 0.1)})`,
                                  color: '#ffd700',
                                  fontSize: '0.7rem'
                                }}
                              />
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{
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
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#ffd700',
                        },
                      }}>
                      <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Cinema Hall</InputLabel>
                      <Select
                        name="cinemaHall"
                        value={form.cinemaHall}
                        label="Cinema Hall"
                        onChange={handleChange}
                        required
                      >
                        {cinemaHalls.map((hall) => (
                          <MenuItem key={hall} value={hall}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOn sx={{ color: '#ffd700', fontSize: 18 }} />
                              <Typography>{hall}</Typography>
                              {hall === "VIP Hall" && (
                                <Chip
                                  label="VIP"
                                  size="small"
                                  sx={{
                                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                                    color: '#000',
                                    fontWeight: 700,
                                    fontSize: '0.7rem'
                                  }}
                                />
                              )}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label="Ticket Price"
                      name="price"
                      fullWidth
                      required
                      value={form.price}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
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
                        '& .MuiOutlinedInput-input': {
                          color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#ffd700',
                        },
                      }}
                    />
                  </Grid>

                  {/* Price Tiers */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 215, 0, 0.2)' }} />
                    <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ mb: 2 }}>
                      Quick Price Selection
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <PriceTierChip price="1200" label="Standard" color="#ffd700" />
                      <PriceTierChip price="1800" label="Premium" color="#4dabf5" />
                      <PriceTierChip price="2500" label="VIP" color="#00ff88" />
                      <PriceTierChip price="3500" label="Executive" color="#ff6b6b" />
                    </Box>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={() => navigate(`/admin/showtimes/${movieId}`)}
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
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={20} /> : <AutoAwesome />}
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
                            boxShadow: '0 12px 48px rgba(255, 215, 0, 0.4)',
                            transform: 'translateY(-2px)'
                          },
                          '&:disabled': {
                            background: 'rgba(255, 215, 0, 0.3)',
                            color: 'rgba(0, 0, 0, 0.5)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {submitting ? 'Creating Showtime...' : 'Create Showtime'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Slide>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={800}>
            <Paper
              sx={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                borderRadius: 4,
                p: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{
                color: '#ffd700',
                mb: 3,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                <MovieFilter /> Showtime Preview
              </Typography>

              {/* Movie Card Preview */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  borderRadius: 3,
                  p: 3,
                  mb: 3
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  {movie?.posterUrl && (
                    <Box
                      component="img"
                      src={movie.posterUrl}
                      alt={movie.title}
                      sx={{
                        width: 60,
                        height: 90,
                        borderRadius: 2,
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <Box>
                    <Typography variant="h6" fontWeight={600} color="white" noWrap>
                      {movie?.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {movie?.genre?.slice(0, 2).join(', ')}
                    </Typography>
                  </Box>
                </Box>

                {/* Showtime Details Preview */}
                <Box sx={{ space: 2 }}>
                  {form.showDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarToday sx={{ color: '#ffd700', fontSize: 18 }} />
                      <Typography variant="body2" color="white">
                        {new Date(form.showDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  )}

                  {form.showTime && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Schedule sx={{ color: '#ffd700', fontSize: 18 }} />
                      <Typography variant="body2" color="white" fontWeight={600}>
                        {form.showTime}
                      </Typography>
                      <Chip
                        label={form.showTime === "22:00" ? "Late Show" : form.showTime === "10:00" ? "Morning" : "Prime Time"}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))',
                          color: '#ffd700',
                          fontSize: '0.6rem'
                        }}
                      />
                    </Box>
                  )}

                  {form.cinemaHall && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn sx={{ color: '#ffd700', fontSize: 18 }} />
                      <Typography variant="body2" color="white">
                        {form.cinemaHall}
                      </Typography>
                    </Box>
                  )}

                  {form.price && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AttachMoney sx={{ color: '#ffd700', fontSize: 18 }} />
                      <Typography variant="h6" color="#ffd700" fontWeight={700}>
                        Rs. {form.price}
                      </Typography>
                      <Chip
                        label="Per Ticket"
                        size="small"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.6rem'
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Quick Stats */}
                <Box sx={{
                  p: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 215, 0, 0.1)'
                }}>
                  <Typography variant="body2" color="#ffd700" fontWeight={600} sx={{ mb: 1 }}>
                    Expected Revenue (80% occupancy):
                  </Typography>
                  <Typography variant="h6" color="white" fontWeight={700}>
                    Rs. {form.price ? Math.round(100 * 0.8 * form.price) : 0}
                  </Typography>
                </Box>
              </Card>

              {/* Help Text */}
              <Box sx={{
                p: 2,
                background: 'linear-gradient(135deg, rgba(77, 171, 245, 0.1), rgba(77, 171, 245, 0.05))',
                borderRadius: 2,
                border: '1px solid rgba(77, 171, 245, 0.2)'
              }}>
                <Typography variant="body2" color="#4dabf5" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ConfirmationNumber />
                  Pro Tip
                </Typography>
                <Typography variant="body2" color="white">
                  Prime time shows (16:00 - 22:00) typically have higher occupancy rates. Consider premium pricing for these slots.
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddShowtime;