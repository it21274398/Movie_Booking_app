import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Container,
  Chip,
  Fade,
  Card,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack, CalendarToday, AccessTime, ConfirmationNumber, EventSeat } from "@mui/icons-material";
import axios from "../api/axiosConfig";

const Showtimes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    try {
      const movieRes = await axios.get(`/movies/${id}`);
      const showtimeRes = await axios.get(`/showtimes/movie/${id}`);

      setMovie(movieRes.data);
      setShowtimes(showtimeRes.data.data || []);
    } catch (err) {
      console.log("Error loading showtimes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Group showtimes by date
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const date = new Date(showtime.showDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });


    if (!acc[date]) acc[date] = [];
    acc[date].push(showtime);

    return acc;
  }, {});

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)"
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={60}
            sx={{
              color: "#ffd700",
              mb: 2
            }}
          />
          <Typography variant="h6" sx={{ color: "#ffd700" ,mb: 20}}>
            Loading Showtimes...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert
          severity="error"
          sx={{
            background: "rgba(211, 47, 47, 0.1)",
            border: "1px solid #d32f2f",
            borderRadius: 3,
            color: "#fff",
            fontSize: "1.1rem"
          }}
        >
          Movie not found
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
        py: 4,
        mt: -10,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.02) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "#ffd700",
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              mb: 3,
              "&:hover": {
                background: "rgba(255, 215, 0, 0.2)",
                transform: "translateX(-4px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              background: "linear-gradient(45deg, #fff 30%, #ffd700 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              mb: 2,
            }}
          >
            🎬 Showtimes
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 700,
            }}
          >
            {movie.title}
          </Typography>
        </Box>

        {showtimes.length === 0 ? (
          <Fade in={!loading}>
            <Alert
              severity="info"
              sx={{
                background: "rgba(2, 136, 209, 0.1)",
                border: "1px solid rgba(2, 136, 209, 0.3)",
                borderRadius: 3,
                color: "#fff",
                fontSize: "1.1rem",
                py: 3,
                "& .MuiAlert-icon": {
                  color: "#ffd700",
                  fontSize: "1.5rem",
                },
              }}
            >
              🎭 No showtimes available for this movie. Check back later!
            </Alert>
          </Fade>
        ) : (
          <Fade in={!loading} timeout={800}>
            <Box>
              {/* Date Selection Tabs */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ffd700",
                    mb: 2,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CalendarToday /> Select Date
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {Object.keys(groupedShowtimes).map((date) => (
                    <Chip
                      key={date}
                      label={date}
                      onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                      sx={{
                        background: selectedDate === date
                          ? "linear-gradient(45deg, #ffd700, #ffed4e)"
                          : "rgba(255, 255, 255, 0.1)",
                        color: selectedDate === date ? "#000" : "#fff",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        py: 2,
                        px: 2,
                        border: selectedDate === date ? "none" : "1px solid rgba(255, 215, 0, 0.3)",
                        "&:hover": {
                          background: "rgba(255, 215, 0, 0.2)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Showtimes Grid */}
              <Grid container spacing={3}>
                {Object.entries(groupedShowtimes)
                  .filter(([date]) => !selectedDate || date === selectedDate)
                  .map(([date, dayShowtimes]) => (
                    <Grid item xs={12} key={date}>
                      <Paper
                        sx={{
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 215, 0, 0.2)",
                          borderRadius: 4,
                          p: 4,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {/* Date Header */}
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#ffd700",
                            fontWeight: 800,
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <EventSeat /> {date}
                        </Typography>

                        <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 3 }} />

                        {/* Showtimes for this date */}
                        <Grid container spacing={3}>
                          {dayShowtimes.map((showtime) => (
                            <Grid item xs={12} sm={6} md={4} key={showtime._id}>
                              <Card
                                sx={{
                                  background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,215,0,0.05) 100%)",
                                  border: "1px solid rgba(255, 215, 0, 0.2)",
                                  borderRadius: 3,
                                  p: 3,
                                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                  position: "relative",
                                  overflow: "hidden",
                                  "&:hover": {
                                    transform: "translateY(-8px) scale(1.02)",
                                    border: "1px solid rgba(255, 215, 0, 0.5)",
                                    boxShadow: `
                                      0 25px 50px rgba(0, 0, 0, 0.6),
                                      0 0 30px rgba(255, 215, 0, 0.2)
                                    `,
                                  },
                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "2px",
                                    background: "linear-gradient(90deg, #000000a1, #ffed4e, #0000008b)",
                                    transform: "scaleX(0)",
                                    transition: "transform 0.3s ease",
                                  },
                                  "&:hover::before": {
                                    transform: "scaleX(1)",
                                  },
                                }}
                              >
                                {/* Time */}
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                  <AccessTime sx={{ color: "#ffd700", mr: 1 }} />
                                  <Typography sx={{ color: "#ffd700", mr: 1 }}>Start from</Typography>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: "#fff",
                                      fontWeight: 800,
                                      fontSize: "1.3rem",
                                    }}
                                  >

                                    {showtime.showTime}
                                  </Typography>
                                </Box>

                                {/* Price */}
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                  <ConfirmationNumber sx={{ color: "#ffd700", mr: 1 }} />
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: "rgba(255, 255, 255, 0.9)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Rs. {showtime.price}
                                  </Typography>
                                </Box>

                                {/* Booked Seats */}
                                <Chip
                                  icon={<EventSeat />}
                                  label={`${showtime?.seats?.filter(s => s.isBooked)?.length || 0} Seats Booked`}

                                  sx={{
                                    background: "rgba(255, 215, 0, 0.1)",
                                    color: "#ffd700",
                                    border: "1px solid rgba(255, 215, 0, 0.3)",
                                    fontWeight: 600,
                                    mb: 3,
                                    "& .MuiChip-icon": {
                                      color: "#ffd700",
                                    },
                                  }}
                                />

                                {/* Select Seats Button */}
                                <Button
                                  fullWidth
                                  variant="contained"
                                  onClick={() => navigate(`/movie/${movie._id}/seats/${showtime._id}`)}
                                  sx={{
                                    background: "linear-gradient(45deg, #d2b300ff 0%, #bbaf3bff 100%)",
                                    color: "#000",
                                    fontWeight: 800,
                                    fontSize: "1rem",
                                    py: 1.5,
                                    borderRadius: 2,
                                    border: "2px solid transparent",
                                    backgroundClip: "padding-box",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    "&:before": {
                                      content: '""',
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      background: "linear-gradient(45deg, #b2a636ff 0%, #af9500ff 100%)",
                                      opacity: 0,
                                      transition: "opacity 0.3s ease",
                                    },
                                    "&:hover": {
                                      background: "#000000",            // button turns black
                                      color: "#ffd700",                 // text becomes gold
                                      borderColor: "#ffd700",          // border stays gold
                                      transform: "translateY(-2px)",   // same hover lift

                                    },
                                    "& .MuiButton-label": {
                                      position: "relative",
                                      zIndex: 1,
                                    },
                                  }}
                                >
                                  🎟️ Select Seats
                                </Button>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Showtimes;