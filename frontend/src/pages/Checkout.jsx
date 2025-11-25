import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Container,
  Grid,
  Fade,
  IconButton,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  ConfirmationNumber,
  EventSeat,
  CalendarToday,
  AccessTime,
  LocalMovies,
  Payment,
  CheckCircle,
} from "@mui/icons-material";
import axios from "../api/axiosConfig";

const Checkout = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, showtime, selectedSeats } = location.state || {};
  const [processing, setProcessing] = useState(false);

  if (!movie || !showtime || !selectedSeats) {
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
          Invalid booking session. Please go back and select seats again.
        </Alert>
      </Container>
    );
  }

  const ticketPrice = showtime.price || 1200;
  const totalPrice = selectedSeats.length * ticketPrice;
  const serviceFee = 100 // 2% service fee
  const finalTotal = totalPrice + serviceFee;

  const handleConfirmBooking = async () => {
    setProcessing(true);
    try {
      const res = await axios.post("/bookings", {
        movie: movie._id,
        showtime: showtime._id,
        seats: selectedSeats,
      });

      navigate("/my-bookings", { state: { success: true } });

    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        navigate("/user/login", {
          state: { message: "Please login to continue booking" }
        });
        return;
      }

      console.log("Booking failed:", error);
    } finally {
      setProcessing(false);
    }
  };


  const steps = ['Seat Selection', 'Review & Payment', 'Confirmation'];

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
       // mt:-10,
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
              textAlign: "center",
            }}
          >
            🎟️ Checkout
          </Typography>
        </Box>

        <Fade in={true} timeout={800}>
          <Grid container spacing={4} justifyContent="center">
            {/* Progress Stepper */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  borderRadius: 4,
                  p: 4,
                  mb: 4,
                }}
              >
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: '#fff',
                            fontWeight: 600,
                            '&.Mui-completed': {
                              color: '#ffd700',
                            },
                            '&.Mui-active': {
                              color: '#ffd700',
                            },
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
            </Grid>

            {/* Booking Summary */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  borderRadius: 4,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Movie Header */}
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <LocalMovies sx={{ color: "#ffd700", fontSize: "2.5rem" }} />
                      {movie.title}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                      <Chip
                        icon={<CalendarToday />}
                        label={new Date(showtime.showDate).toLocaleDateString()}
                        sx={{
                          background: "rgba(255, 215, 0, 0.1)",
                          color: "#ffd700",
                          border: "1px solid rgba(255, 215, 0, 0.3)",
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        icon={<AccessTime />}
                        label={showtime.showTime}
                        sx={{
                          background: "rgba(255, 215, 0, 0.1)",
                          color: "#ffd700",
                          border: "1px solid rgba(255, 215, 0, 0.3)",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 4 }} />

                  {/* Seats Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#ffd700",
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <EventSeat /> Selected Seats
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                      {selectedSeats.map((seat, index) => (
                        <Chip
                          key={seat}
                          icon={<ConfirmationNumber />}
                          label={seat}
                          sx={{
                            background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                            color: "#000",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            py: 2,
                            "& .MuiChip-icon": {
                              color: "#000",
                            },
                            transform: "scale(1)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 4 }} />

                  {/* Price Breakdown */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#ffd700",
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Payment /> Price Breakdown
                    </Typography>

                    <Box sx={{ background: "rgba(255, 215, 0, 0.05)", borderRadius: 3, p: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                          Tickets ({selectedSeats.length} × Rs. {ticketPrice})
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                          Rs. {totalPrice.toLocaleString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                          Service Fee
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                          Rs. {serviceFee.toLocaleString()}
                        </Typography>
                      </Box>

                      <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", my: 2 }} />

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                          Total Amount
                        </Typography>
                        <Typography variant="h5" sx={{ color: "#ffd700", fontWeight: 800 }}>
                          Rs. {finalTotal.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Confirm Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleConfirmBooking}
                    disabled={processing}
                    sx={{
                      background: "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)",
                      color: "#000",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      py: 2.5,
                      borderRadius: 3,
                      border: "2px solid #0f0f0fff",
                      backgroundClip: "padding-box",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      
                      "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                       
                          background: "linear-gradient(45deg, #030303ff 0%, #000000ff 100%)",
                         color: "#ffd700",
                            border: "2px solid #ffd700",
                        boxShadow: `
                          0 20px 40px rgba(0, 0, 0, 0.35),
                          0 0 0 1px rgba(255, 215, 0, 0.2)
                        `,
                        
                      },
                      "& .MuiButton-label": {
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      },
                    }}
                  >
                    {processing ? (
                      <>
                        <CircularProgress size={18} sx={{ color: "#000" }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle /> Confirm Booking
                      </>
                    )}
                  </Button>

                  {/* Security Note */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      textAlign: "center",
                      mt: 3,
                      fontStyle: "italic",
                    }}
                  >
                    🔒 Your payment is secure and encrypted
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Info Sidebar */}
            <Grid item xs={12} md={4}>
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
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffd700",
                    mb: 3,
                    fontWeight: 700,
                  }}
                >
                  📋 Booking Summary
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                    Movie
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                    {movie.title}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                    Date & Time
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                    {new Date(showtime.showDate).toLocaleDateString()} • {showtime.showTime}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                    Seats Selected
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                    {selectedSeats.length} seats
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", my: 3 }} />

                <Box>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                    Total Amount
                  </Typography>
                  <Typography variant="h5" sx={{ color: "#ffd700", fontWeight: 800 }}>
                    Rs. {finalTotal.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>

              {/* Help Card */}
              <Paper
                sx={{
                  background: "rgba(255, 215, 0, 0.05)",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  borderRadius: 4,
                  p: 3,
                  mt: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffd700",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  💡 Need Help?
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                  • Tickets are non-refundable
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                  • Arrive 15 minutes before showtime
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  • Present booking confirmation at counter
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default Checkout;