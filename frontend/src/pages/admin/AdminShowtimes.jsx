import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Alert,
  Card,
  Grid,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Fade,
  Slide,
  alpha,
  Avatar
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Schedule,
  CalendarToday,
  AttachMoney,
  EventSeat,
  Theaters,
  TrendingUp,
  Visibility,
  AutoAwesome
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";

const AdminShowtimes = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [stats, setStats] = useState({ total: 0, totalRevenue: 0, totalBookings: 0 });

  const fetchShowtimes = async () => {
    try {
      const showtimeRes = await axios.get(`/showtimes/movie/${movieId}`);
      const movieRes = await axios.get(`/movies/${movieId}`);

      setMovie(movieRes.data || movieRes.data?.data || []);
      const showtimesData = showtimeRes.data?.data || showtimeRes.data || [];
      setShowtimes(showtimesData);

      // Calculate statistics
      calculateStats(showtimesData);
    } catch (err) {
      setError("Failed to load showtimes");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (showtimesList) => {
    const total = showtimesList.length;
    let totalRevenue = 0;
    let totalBookings = 0;

    showtimesList.forEach(showtime => {
      const bookedCount = showtime.seats?.filter(seat => seat.isBooked).length || 0;
      totalBookings += bookedCount;
      totalRevenue += bookedCount * showtime.price;
    });

    setStats({ total, totalRevenue, totalBookings });
  };

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const handleDeleteClick = (showtime) => {
    setSelectedShowtime(showtime);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedShowtime) return;

    try {
      await axios.delete(`/showtimes/${selectedShowtime._id}`);
      fetchShowtimes();
      setDeleteDialog(false);
      setSelectedShowtime(null);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

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
          <Typography variant="h6" fontWeight={600} color="white" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
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

  const getShowtimeStatus = (showDate, showTime) => {
    const now = new Date();
    const showDateTime = new Date(`${showDate}T${showTime}`);
    return showDateTime < now ? 'completed' : 'upcoming';
  };

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
          Loading Showtimes...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          {movie?.posterUrl && (
            <Avatar
              src={movie.posterUrl}
              sx={{
                width: 80,
                height: 120,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)'
              }}
              variant="rounded"
            />
          )}
          <Box>
            <Typography variant="h3" fontWeight={800} sx={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 1
            }}>
              Manage Showtimes
            </Typography>
            <Typography variant="h5" color="white" fontWeight={600}>
              {movie?.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {movie?.genre?.join(' • ')}
            </Typography>
          </Box>
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

        {/* Statistics Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Showtimes"
              value={stats.total}
              subtitle="Scheduled screenings"
              icon={<Schedule sx={{ color: '#ffd700', fontSize: 32 }} />}
              color="#ffd700"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Revenue"
              value={`Rs. ${stats.totalRevenue}`}
              subtitle="From all showtimes"
              icon={<AttachMoney sx={{ color: '#00ff88', fontSize: 32 }} />}
              color="#00ff88"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              subtitle="Seats reserved"
              icon={<EventSeat sx={{ color: '#4dabf5', fontSize: 32 }} />}
              color="#4dabf5"
            />
          </Grid>
        </Grid>

        {/* Add Showtime Button */}
        <Tooltip title="Add a new showtime for this movie" arrow>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate(`/admin/showtimes/${movieId}/add`)}
           sx={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                color: '#000',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)',
                  color: '#ffd700',
                   border: '1px solid rgba(255, 217, 0, 0.81)',
                  boxShadow: '0 12px 48px rgba(255, 217, 0, 0.24)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
          >
            Add New Showtime
          </Button>
        </Tooltip>
      </Box>

      {/* Showtimes Table */}
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
                <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday /> Date
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule /> Time
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney /> Price
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventSeat /> Bookings
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                <Typography variant="h6" fontWeight={600} color="#ffd700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesome /> Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {showtimes.map((showtime, index) => {
              const formattedDate = new Date(showtime.showDate).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              const bookedCount = showtime.seats?.filter(seat => seat.isBooked).length || 0;
              const totalSeats = showtime.seats?.length || 0;
              const status = getShowtimeStatus(showtime.showDate, showtime.showTime);

              return (
                <Slide in timeout={500 + (index * 100)} direction="up" key={showtime._id}>
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
                      <Box>
                        <Typography variant="body1" fontWeight={600} color="white">
                          {formattedDate}
                        </Typography>
                        <Chip
                          label={status === 'completed' ? 'Completed' : 'Upcoming'}
                          size="small"
                          sx={{
                            background: status === 'completed' 
                              ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1))'
                              : 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1))',
                            color: status === 'completed' ? '#ff6b6b' : '#00ff88',
                            border: `1px solid ${status === 'completed' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(0, 255, 136, 0.3)'}`,
                            fontWeight: 500,
                            mt: 0.5
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Typography variant="h6" color="#ffd700" fontWeight={700}>
                        {showtime.showTime}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Chip
                        icon={<AttachMoney sx={{ fontSize: 16 }} />}
                        label={`Rs. ${showtime.price}`}
                        sx={{
                          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                          color: '#ffd700',
                          border: '1px solid rgba(255, 215, 0, 0.3)',
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box>
                          <Typography variant="body1" fontWeight={600} color="#ffd700">
                            {bookedCount} / {totalSeats}
                          </Typography>
                          <Typography variant="body2" color="#ffd700">
                            {totalSeats > 0 ? Math.round((bookedCount / totalSeats) * 100) : 0}% filled
                          </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, maxWidth: 80 }}>
                          <Box
                            sx={{
                              height: 6,
                              background: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: 3,
                              overflow: 'hidden'
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                background: `linear-gradient(135deg, ${bookedCount > 0 ? '#00ff88' : '#ffd700'}, ${bookedCount > 0 ? '#00cc6a' : '#ffed4e'})`,
                                width: `${totalSeats > 0 ? (bookedCount / totalSeats) * 100 : 0}%`,
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Edit Showtime" arrow>
                          <IconButton
                            onClick={() => navigate(`/admin/showtimes/${movieId}/edit/${showtime._id}`)}
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
                            <Edit />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Showtime" arrow>
                          <IconButton
                            onClick={() => handleDeleteClick(showtime)}
                            sx={{
                              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 107, 107, 0.1))',
                              border: '1px solid rgba(255, 107, 107, 0.3)',
                              color: '#ff6b6b',
                              '&:hover': {
                                background: 'rgba(255, 107, 107, 0.3)',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>

                        {/* <Tooltip title="View Details" arrow>
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
                            <Visibility />
                          </IconButton>
                        </Tooltip> */}
                      </Box>
                    </TableCell>
                  </TableRow>
                </Slide>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: {
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(255, 107, 107, 0.3)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#ff6b6b', 
          fontWeight: 700,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), transparent)',
          py: 3
        }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" color="white" sx={{ mb: 2 }}>
            Are you sure you want to delete this showtime?
          </Typography>
          {selectedShowtime && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" color="#ffd700" fontWeight={700} sx={{ mb: 1 }}>
                {new Date(selectedShowtime.showDate).toLocaleDateString()} at {selectedShowtime.showTime}
              </Typography>
              <Typography variant="body2" color="#ffd700" sx={{ mb: 2 }} fontSize={20}>
                This will remove all associated bookings and cannot be undone.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 4, px: 4 }}>
          <Button
            onClick={() => setDeleteDialog(false)}
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
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
           sx={{
                background: 'linear-gradient(135deg, #f50000ff, #a33232ff)',
                color: 'black',
                fontWeight: 700,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #090909ff, #2e2e2eff)',
                   color: 'red',
                  transform: 'translateY(-2px)'
                }
              }}
          >
            Delete Showtime
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminShowtimes;