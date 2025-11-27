import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Paper,
  Grid,
  Card,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Slide,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar
} from "@mui/material";
import {
  Search,
  FilterList,
  Receipt,
  CalendarToday,
  Schedule,
  EventSeat,
  AttachMoney,
  Person,
  Theaters,
  TrendingUp,
  Download,
  Visibility,
  MoreVert
} from "@mui/icons-material";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import axios from "../../api/axiosConfig";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [stats, setStats] = useState({ 
    total: 0, 
    revenue: 0, 
    average: 0, 
    today: 0 
  });

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/bookings/");
      const bookingsData = res.data.data || [];
      setBookings(bookingsData);
      calculateStats(bookingsData);
    } catch (err) {
      console.log("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const total = bookingsData.length;
    const revenue = bookingsData.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const average = total > 0 ? revenue / total : 0;
    const today = bookingsData.filter(booking => {
      const bookingDate = new Date(booking.createdAt).toDateString();
      const todayDate = new Date().toDateString();
      return bookingDate === todayDate;
    }).length;

    setStats({ total, revenue, average, today });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailDialog(true);
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.movie?.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.seats.some(seat => seat.toLowerCase().includes(search.toLowerCase()))
  );

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(color, 0.2)}`
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ 
            background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.8)})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 0.5
          }}>
            {value}
          </Typography>
          <Typography variant="h6" fontWeight={500} color="lightgray" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="lightgray">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );

  const getStatusColor = (showDate, showTime) => {
    const now = new Date();
    const showDateTime = new Date(`${showDate}T${showTime}`);
    return showDateTime < now ? '#ff6b6b' : '#00ff88';
  };

  const getStatusText = (showDate, showTime) => {
    const now = new Date();
    const showDateTime = new Date(`${showDate}T${showTime}`);
    return showDateTime < now ? 'Completed' : 'Upcoming';
  };

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'G';
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
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
          fontWeight: 600,
           mb: 2
        }}>
          Loading Bookings...
        </Typography>
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}>
            Booking Management
          </Typography>
         
          {/* Statistics Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Bookings"
                value={stats.total}
                subtitle="All time bookings"
                icon={<Receipt sx={{ color: '#ffd700', fontSize: 32 }} />}
                color="#ffd700"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Revenue"
                value={`Rs. ${stats.revenue.toLocaleString()}`}
                subtitle="Gross earnings"
                icon={<AttachMoney sx={{ color: '#00ff88', fontSize: 32 }} />}
                color="#00ff88"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Average Booking"
                value={`Rs. ${Math.round(stats.average).toLocaleString()}`}
                subtitle="Per transaction"
                icon={<TrendingUp sx={{ color: '#4dabf5', fontSize: 32 }} />}
                color="#4dabf5"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Today's Bookings"
                value={stats.today}
                subtitle="New today"
                icon={<CalendarToday sx={{ color: '#ff6b6b', fontSize: 32 }} />}
                color="#ff6b6b"
              />
            </Grid>
          </Grid>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by user, movie, or seats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#ffd700' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 3,
                minWidth: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#ffd700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffd700',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                }
              }}
            />

            <Chip
              icon={<FilterList />}
              label={`${filteredBookings.length} bookings found`}
              sx={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                color: '#ffd700',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                fontWeight: 600
              }}
            />
          </Box>
        </Box>

        {/* Bookings Table */}
        <Paper
          sx={{
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 215, 0, 0.1)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)'
              }}>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person /> Customer
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Theaters /> Movie & Show
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeat /> Seats
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoney /> Payment
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday /> Booking Date
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={500} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MoreVert /> Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredBookings.map((booking, index) => {
                const showtimeDate = new Date(booking.showtime?.showDate).toLocaleDateString();
                const bookingDate = new Date(booking.createdAt).toLocaleString();
                const statusColor = getStatusColor(booking.showtime?.showDate, booking.showtime?.showTime);
                const statusText = getStatusText(booking.showtime?.showDate, booking.showtime?.showTime);

                return (
                  <Slide in timeout={500 + (index * 100)} direction="up" key={booking._id}>
                    <TableRow
                      sx={{
                        '&:hover': {
                          background: 'rgba(255, 215, 0, 0.05)',
                          transform: 'scale(1.01)',
                          transition: 'all 0.3s ease'
                        },
                        borderBottom: '1px solid rgba(255, 215, 0, 0.05)'
                      }}
                    >
                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              background: `linear-gradient(135deg, #4dabf5, ${alpha('#4dabf5', 0.7)})`,
                              fontWeight: 600,
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                            }}
                          >
                            {getInitials(booking.user?.email)}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight={500} color="lightgray">
                              {booking.user?.email || "Guest"}
                            </Typography>
                            <Typography variant="caption" color="lightgray">
                              ID: {booking._id?.substring(0, 8)}...
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Box>
                          <Typography variant="body1" fontWeight={500} color="lightgray" sx={{ mb: 0.5 }}>
                            {booking.movie?.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 16, color: '#ffd700' }} />
                            <Typography variant="body2" color="lightgray">
                              {showtimeDate}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule sx={{ fontSize: 16, color: '#ffd700' }} />
                            <Typography variant="body2" color="lightgray">
                              {booking.showtime?.showTime}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="body1" color="lightgray" fontWeight={600}>
                            {booking.seats.length} seats
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {booking.seats.slice(0, 3).map((seat, idx) => (
                              <Chip
                                key={idx}
                                label={seat}
                                size="small"
                                sx={{
                                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                                  color: '#ffd700',
                                  border: '1px solid rgba(255, 215, 0, 0.3)',
                                  fontSize: '0.7rem'
                                }}
                              />
                            ))}
                            {booking.seats.length > 3 && (
                              <Chip
                                label={`+${booking.seats.length - 3}`}
                                size="small"
                                sx={{
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  color: 'text.secondary',
                                  fontSize: '0.7rem'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Box>
                          <Typography variant="h6" color="#00ff88" fontWeight={700} sx={{ mb: 0.5 }}>
                            Rs. {booking.totalPrice.toLocaleString()}
                          </Typography>
                          <Chip
                            label={statusText}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, ${alpha(statusColor, 0.2)}, ${alpha(statusColor, 0.1)})`,
                              color: statusColor,
                              border: `1px solid ${alpha(statusColor, 0.3)}`,
                              fontWeight: 500
                            }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Typography variant="body1" color="lightgray" fontWeight={500} sx={{ mb: 0.5 }}>
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Typography>
                        <Typography variant="caption" color="lightgray">
                          {new Date(booking.createdAt).toLocaleTimeString()}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Tooltip title="View Details" arrow>
                            <IconButton
                              onClick={() => handleViewDetails(booking)}
                              sx={{
                                background: 'linear-gradient(135deg, rgba(77, 171, 245, 0.2), rgba(77, 171, 245, 0.1))',
                                border: '1px solid rgba(77, 171, 245, 0.3)',
                                color: '#4dabf5',
                                '&:hover': {
                                  background: 'rgba(77, 171, 245, 0.3)',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download Receipt" arrow>
                            <IconButton
                              sx={{
                                background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))',
                                border: '1px solid rgba(0, 255, 136, 0.3)',
                                color: '#00ff88',
                                '&:hover': {
                                  background: 'rgba(0, 255, 136, 0.3)',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Slide>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        {/* Booking Details Dialog */}
        <Dialog
          open={detailDialog}
          onClose={() => setDetailDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(255, 215, 0, 0.2)'
            }
          }}
        >
          {selectedBooking && (
            <>
              <DialogTitle sx={{ 
                color: '#ffd700', 
                fontWeight: 700,
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent)',
                py: 3
              }}>
                Booking Details
              </DialogTitle>
              <DialogContent sx={{ py: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="#ffd700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person /> Customer Information
                    </Typography>
                    <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Typography variant="body1" color="lightgray" sx={{ mb: 1 }}>
                        <strong>Email:</strong> {selectedBooking.user?.email || "Guest"}
                      </Typography>
                      <Typography variant="body1" color="white">
                        <strong>Booking ID:</strong> {selectedBooking._id}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="#ffd700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Theaters /> Movie Information
                    </Typography>
                    <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Typography variant="body1" color="lightgray" sx={{ mb: 1 }}>
                        <strong>Movie:</strong> {selectedBooking.movie?.title}
                      </Typography>
                      <Typography variant="body1" color="lightgray">
                        <strong>Showtime:</strong> {new Date(selectedBooking.showtime?.showDate).toLocaleDateString()} at {selectedBooking.showtime?.showTime}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="#ffd700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventSeat /> Seat Details
                    </Typography>
                    <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Typography variant="body1" color="lightgray" sx={{ mb: 1 }}>
                        <strong>Total Seats:</strong> {selectedBooking.seats.length}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {selectedBooking.seats.map((seat, idx) => (
                          <Chip
                            key={idx}
                            label={seat}
                            sx={{
                              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))',
                              color: '#000',
                              fontWeight: 600
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="#ffd700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney /> Payment Information
                    </Typography>
                    <Box sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Typography variant="h5" color="#00ff88" fontWeight={700} sx={{ mb: 1 }}>
                        Rs. {selectedBooking.totalPrice.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="lightgray">
                        Paid on {new Date(selectedBooking.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 4, px: 4 }}>
                <Button
                  onClick={() => setDetailDialog(false)}
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 215, 0, 0.5)',
                    color: '#ffd700',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      borderColor: '#ffd700',
                      background: 'rgba(255, 215, 0, 0.1)'
                    }
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  sx={{
                    background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                    color: '#000',
                    fontWeight: 700,
                    px: 4,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00cc6a, #00ff88)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Download Receipt
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default AdminBookings;