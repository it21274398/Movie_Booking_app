import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Container,
  Fade,
  Chip,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import {
  Download,
  Share,
  QrCode2,
  CalendarToday,
  AccessTime,
  EventSeat,
  ConfirmationNumber,
  LocalMovies,
} from "@mui/icons-material";
import axios from "../api/axiosConfig";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);

  const location = useLocation();
  const success = location.state?.success;

  const fetchBookings = async () => {
    try {
      const res = await axios.get("bookings/me");
      setBookings(res.data.data || []);
      console.log("BOOKING:", booking);

    } catch (err) {
      console.log("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleBookingExpansion = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const downloadTicket = async (booking) => {
    try {
      const doc = new jsPDF("portrait", "pt", "A4");

      // Header Background
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, 600, 120, "F");

      // Title
      doc.setFontSize(28);
      doc.setTextColor("#FFD700");
      doc.text(" Movie Ticket", 40, 60);

      doc.setFontSize(14);
      doc.setTextColor("#FFFFFF");
      doc.text(`Booking ID: ${booking._id}`, 40, 90);

      // Movie Poster
      if (booking.movie?.posterUrl) {
        try {
          const imgData = await convertImageToBase64(booking.movie.posterUrl);
          doc.addImage(imgData, "JPEG", 40, 140, 150, 220);
        } catch (err) {
          console.log("Poster failed to load:", err);
        }
      }

      // Movie Details Table
      autoTable(doc, {
        startY: 140,
        margin: { left: 210 },
        theme: "striped",
        styles: {
          fillColor: [0, 0, 0],
          textColor: "#FFD700",
          fontSize: 12,
          halign: "left",
        },
        bodyStyles: {
          textColor: "#FFF",
        },
        body: [
          ["Movie", booking.movie?.title || "N/A"],
          [" Date", new Date(booking.showtime?.showDate).toLocaleDateString()],
          [" Time", booking.showtime?.showTime],
          [" Seats", booking.seats?.join(", ")],
          [" Total Price", `Rs. ${booking.totalPrice?.toLocaleString()}`],
        ],
      });

      // QR Code placeholder
      doc.setFontSize(12);
      doc.setTextColor("#FFD700");
      doc.text("Scan QR at theater", 40, 400);
      doc.rect(40, 420, 130, 130);
      doc.setFontSize(10);
      doc.text("QR CODE", 85, 490);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor("#FFD700");
      doc.text("Thank you for choosing CineBook!", 40, 780);

      // Save file
      doc.save(`ticket_${booking._id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };

      img.onerror = (err) => reject(err);
    });
  };

  const shareBooking = (booking) => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `My booking for ${booking.movie?.title}`,
        text: `I'm watching ${booking.movie?.title} on ${new Date(booking.showtime?.showDate).toLocaleDateString()} at ${booking.showtime?.showTime}`,
      });
    } else {
      console.log("Web Share API not supported");
    }
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
            Loading Your Bookings...
          </Typography>
        </Box>
      </Box>
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
        mt:-10
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

      <Container sx={{ position: "relative", zIndex: 2, maxWidth: "1400px!important" }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
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
            🎟️ My Bookings
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Your cinematic journey awaits
          </Typography>
        </Box>

        {success && (
          <Fade in={true}>
            <Alert
              severity="success"
              sx={{
                mb: 4,
                background: "rgba(76, 175, 80, 0.1)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                borderRadius: 3,
                color: "#fff",
                fontSize: "1.1rem",
                "& .MuiAlert-icon": {
                  color: "#4caf50",
                  fontSize: "1.5rem",
                },
              }}
            >
              🎉 Booking confirmed successfully! Your tickets are ready.
            </Alert>
          </Fade>
        )}

        {bookings.length === 0 ? (
          <Fade in={!loading}>
            <Paper
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                borderRadius: 4,
                p: 8,
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#ffd700",
                  mb: 3,
                  fontWeight: 700,
                }}
              >
                🎭 No Bookings Yet
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 4,
                }}
              >
                Start your cinematic adventure by booking your first movie!
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="/"
                sx={{
                  background: "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  py: 2,
                  px: 4,
                  borderRadius: 3,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(255, 215, 0, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                🎬 Explore Movies
              </Button>
            </Paper>
          </Fade>
        ) : (
          <Fade in={!loading} timeout={800}>
            <Grid container spacing={4}>
              {bookings.map((booking) => (
                <Grid item xs={12} key={booking._id}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 215, 0, 0.2)",
                      borderRadius: 4,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        border: "1px solid rgba(255, 215, 0, 0.4)",
                        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                      {/* Poster Section */}
                      <CardMedia
                        component="img"
                        image={booking.movie?.posterUrl}
                        alt={booking.movie?.title}
                        sx={{
                          borderRadius: 3,
                          m: 1.5,
                          width: { xs: "100%", md: 300 },
                          height: { xs: 300, md: "100%" },
                          objectFit: "cover",
                        }}
                      />

                      {/* Content Section */}
                      <Box sx={{ flex: 1, p: 4 }}>
                        {/* Header Row */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                          <Box>
                            <Typography
                              variant="h4"
                              sx={{
                                color: "#fff",
                                fontWeight: 800,
                                mb: 1,
                              }}
                            >
                              {booking.movie?.title}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                              <Chip
                                icon={<CalendarToday />}
                                label={
                                  booking.showtime?.showDate
                                    ? new Date(booking.showtime.showDate).toLocaleDateString()
                                    : "No date"
                                }
                                sx={{
                                  background: "rgba(255, 215, 0, 0.1)",
                                  color: "#ffd700",
                                  border: "1px solid rgba(255, 215, 0, 0.3)",
                                  fontWeight: 600,
                                }}
                              />

                              <Chip
                                icon={<AccessTime />}
                                label={booking.showtime?.showTime || "No time"}
                                sx={{
                                  background: "rgba(255, 215, 0, 0.1)",
                                  color: "#ffd700",
                                  border: "1px solid rgba(255, 215, 0, 0.3)",
                                  fontWeight: 600,
                                }}
                              />


                            </Box>
                          </Box>

                          {/* Action Buttons */}
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={() => downloadTicket(booking)}
                              sx={{
                                color: "#ffd700",
                                background: "rgba(255, 215, 0, 0.1)",
                                border: "1px solid rgba(255, 215, 0, 0.3)",
                                "&:hover": {
                                  background: "rgba(255, 215, 0, 0.2)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              <Download />
                            </IconButton>
                            <IconButton
                              onClick={() => shareBooking(booking)}
                              sx={{
                                color: "#ffd700",
                                background: "rgba(255, 215, 0, 0.1)",
                                border: "1px solid rgba(255, 215, 0, 0.3)",
                                "&:hover": {
                                  background: "rgba(255, 215, 0, 0.2)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              <Share />
                            </IconButton>
                          </Box>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 3 }} />

                        {/* Booking Details */}
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#ffd700",
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <EventSeat /> Seat Information
                              </Typography>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {booking.seats.map((seat) => (
                                  <Chip
                                    key={seat}
                                    label={seat}
                                    sx={{
                                      background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                                      color: "#000",
                                      fontWeight: 800,
                                      fontSize: "0.9rem",
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#ffd700",
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <ConfirmationNumber /> Payment Details
                              </Typography>
                              <Typography variant="body1" sx={{ color: "#fff", fontWeight: 600 }}>
                                Total Paid: <span style={{ color: "#ffd700" }}>Rs. {booking.totalPrice?.toLocaleString()}</span>
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: "#ffd700",
                                  mb: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <LocalMovies /> Booking Info
                              </Typography>
                              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 1 }}>
                                Booking ID: <strong style={{ color: "#ffd700" }}>{booking._id}</strong>
                              </Typography>
                              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                                Booked on: {new Date(booking.createdAt).toLocaleDateString()} at {new Date(booking.createdAt).toLocaleTimeString()}
                              </Typography>
                            </Box>

                            {/* QR Code Placeholder */}
                            <Box
                              sx={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 215, 0, 0.3)",
                                borderRadius: 2,
                                p: 2,
                                textAlign: "center",
                              }}
                            >
                              <QrCode2 sx={{ fontSize: 60, color: "#ffd700", mb: 1 }} />
                              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                Scan at theater
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                       
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}

        {/* Stats Footer */}
        {bookings.length > 0 && (
          <Fade in={!loading}>
            <Paper
              sx={{
                background: "rgba(255, 215, 0, 0.05)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                borderRadius: 4,
                p: 4,
                mt: 6,
                textAlign: "center",
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
                🎊 Your Movie Journey
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                You've booked {bookings.length} movie{bookings.length !== 1 ? 's' : ''} with us!
                Total spent: <strong style={{ color: "#ffd700" }}>
                  Rs. {bookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0).toLocaleString()}
                </strong>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default MyBookings;