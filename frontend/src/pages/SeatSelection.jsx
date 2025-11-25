import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Container,
  Fade,
  IconButton,
  Card,
  Chip,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack, Chair, ConfirmationNumber, EventSeat, LocalMovies } from "@mui/icons-material";
import axios from "../api/axiosConfig";

const SeatSelection = () => {
  const { id, showtimeId } = useParams();
  const navigate = useNavigate();

  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const fetchShowtime = async () => {
    try {
      const res = await axios.get(`/showtimes/details/${showtimeId}`);
      setShowtime(res.data);
    } catch (err) {
      console.log("Error loading seats:", err);
    } finally {
      setLoading(false);
    }
  };

  const bookedSeats = showtime?.seats?.filter((s) => s.isBooked).map((s) => s.seatNumber) || [];

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  useEffect(() => {
    fetchShowtime();
  }, [showtimeId]);

  const handleContinue = () => {
    navigate(`/checkout/${showtimeId}`, {
      state: {
        movie: showtime.movie,
        showtime: showtime,
        selectedSeats: selectedSeats,
      },
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
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
          <Typography variant="h6" sx={{ color: "#ffd700" }}>
            Loading Seat Map...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!showtime) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert
          severity="error"
          sx={{
            background: "rgba(211, 47, 47, 0.1)",
            border: "1px solid #d32f2f",
            borderRadius: 3,
            color: "#fff"
          }}
        >
          Showtime not found
        </Alert>
      </Container>
    );
  }

  // Group seats by row for better organization
  const seatRows = {};
  showtime.seats.forEach(seatObj => {
    const row = seatObj.seatNumber.match(/[A-Z]/)[0];
    if (!seatRows[row]) {
      seatRows[row] = [];
    }
    seatRows[row].push(seatObj);
  });

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
        <Box sx={{ mb: 4, ml: -30 }}>
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
              mt: -8,
              ml: 50,
              background: "linear-gradient(45deg, #fff 30%, #ffd700 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 8px rgba(0,0,0,0.5)",
              mb: 10,
            }}
          >
            🎬 Select Your Seats
          </Typography>
        </Box>

        <Fade in={!loading} timeout={800}>
          <Grid container spacing={4}>



            {/* Seat Selection Area */}
            <Grid item xs={12} md={9}>
              <Box sx={{ textAlign: "center" }}>
                {/* Cinema Screen */}
                <Box
                  sx={{
                    width: "90%",
                    height: "8px",
                    background: "linear-gradient(90deg, #333333ac 0%, #ffd700 50%, #333333a6 100%)",
                    borderRadius: "8px",
                    margin: "0 auto 40px",
                    position: "relative",
                    boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)",
                    "&::before": {
                      content: '"SCREEN"',
                      position: "absolute",
                      top: "20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "#ffd700",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      letterSpacing: "2px",
                    },
                  }}
                />

                {/* Seat Legend */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, background: "#2e7d32", borderRadius: "4px" }} />
                    <Typography variant="body2" sx={{ color: "#fff" }}>Selected</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, background: "#d32f2f", borderRadius: "4px" }} />
                    <Typography variant="body2" sx={{ color: "#fff" }}>Booked</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, background: "#ffd700", borderRadius: "4px" }} />
                    <Typography variant="body2" sx={{ color: "#fff" }}>Available</Typography>
                  </Box>
                </Box>

                {/* Seat Grid */}
                <Box sx={{ maxWidth: 1000, margin: "0 auto" }}>
                  {Object.entries(seatRows).map(([row, seats]) => (
                    <Box key={row} sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#ffd700",
                          fontWeight: 700,
                          mb: 1,
                          textAlign: "center"
                        }}
                      >
                        Row {row}
                      </Typography>
                      <Grid container spacing={1} justifyContent="center">
                        {seats.map((seatObj) => {
                          const seat = seatObj.seatNumber;
                          const isBooked = seatObj.isBooked;
                          const isSelected = selectedSeats.includes(seat);
                          const isHovered = hoveredSeat === seat;

                          return (
                            <Grid item key={seat}>
                              <Box
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                sx={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: "8px",
                                  background: isBooked
                                    ? "linear-gradient(135deg, #d32f2f, #c62828)"
                                    : isSelected
                                      ? "linear-gradient(135deg, #2e7d32, #4caf50)"
                                      : "linear-gradient(135deg, #ffd700, #ffed4e)",
                                  cursor: isBooked ? "not-allowed" : "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: isBooked ? "#fff" : "#000",
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                  transform: isHovered && !isBooked ? "scale(1.1)" : "scale(1)",
                                  boxShadow: isSelected
                                    ? "0 0 20px rgba(46, 125, 50, 0.6)"
                                    : isHovered && !isBooked
                                      ? "0 0 15px rgba(255, 215, 0, 0.8)"
                                      : "0 4px 8px rgba(0, 0, 0, 0.3)",
                                  position: "relative",
                                  overflow: "hidden",
                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "rgba(255, 255, 255, 0.1)",
                                    opacity: isHovered && !isBooked ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                  },
                                  "&:hover": {
                                    transform: isBooked ? "scale(1)" : "scale(1.1)",
                                  },
                                }}
                              >
                                <Chair sx={{
                                  fontSize: "1.5rem",
                                  color: isBooked ? "#fff" : isSelected ? "#fff" : "#000",
                                }} />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    position: "absolute",
                                    bottom: 2,
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    color: isBooked ? "#fff" : isSelected ? "#fff" : "#000",
                                  }}
                                >
                                  {seat}
                                </Typography>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  ))}
                </Box>

                {/* Aisle Indicators */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, px: 4 }}>
                  <Typography variant="body2" sx={{ color: "#ffd700", fontWeight: 600 }}>
                    ← AISLE
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffd700", fontWeight: 600 }}>
                    AISLE →
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Movie & Showtime Info */}
            <Grid item xs={12} md={2}>
              <Card
                sx={{

                  width: "180%",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  borderRadius: 4,
                  p: 4,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  position: "sticky",
                  top: 100,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {showtime.movie?.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                  <Chip
                    icon={<EventSeat />}
                    label={`${new Date(showtime.showDate).toLocaleDateString()} • ${showtime.showTime}`}
                    sx={{
                      background: "rgba(255, 215, 0, 0.1)",
                      color: "#ffd700",
                      border: "1px solid rgba(255, 215, 0, 0.3)",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 3 }} />

                {/* Price Info */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    <ConfirmationNumber sx={{ color: "#ffd700", mr: 1, verticalAlign: 'middle' }} />
                    Price per ticket:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                    Rs. {showtime.price}
                  </Typography>
                </Box>

                {/* Selected Seats Summary */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ color: "#ffd700", mb: 2, fontWeight: 700 }}>
                    🎯 Selected Seats
                  </Typography>

                  {selectedSeats.length > 0 ? (
                    <Box>
                      <Typography variant="body1" sx={{ color: "#fff", mb: 2, fontWeight: 600 }}>
                        {selectedSeats.join(", ")}
                      </Typography>
                      <Typography variant="h5" sx={{ color: "#ffd700", fontWeight: 800 }}>
                        Total: Rs. {selectedSeats.length * showtime.price}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", fontStyle: "italic" }}>
                      No seats selected yet
                    </Typography>
                  )}
                </Box>

                {/* Continue Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={selectedSeats.length === 0}
                  onClick={handleContinue}
                  sx={{
                    background: selectedSeats.length > 0
                      ? "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: selectedSeats.length > 0 ? "#000" : "rgba(255, 255, 255, 0.5)",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    py: 2,
                    mt: 3,
                    borderRadius: 3,
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "1px",

                    "&:hover:not(:disabled)": {
                      background: "rgba(0, 0, 0, 1)",
                      color: "#ffd700",
                      transform: "translateY(-3px)",
                      border: "1px solid #ffd700",
                    },
                    "& .MuiButton-label": {
                      position: "relative",
                      zIndex: 1,
                    },
                  }}
                >
                  🎟️ Continue to Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default SeatSelection;