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
  Card,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Tooltip,
  Fade,
  Slide,
  alpha,
  useTheme
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Theaters,
  Schedule,
  Star,
  Visibility,
  MovieFilter,
  TrendingUp,
  Group
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout.jsx";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, upcoming: 0 });
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchMovies = async () => {
    try {
      const res = await axios.get("/movies");
      setMovies(res.data || []);
      calculateStats(res.data || []);
    } catch (error) {
      console.log("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (moviesList) => {
    const total = moviesList.length;
    const active = moviesList.filter(movie => movie.status === 'active').length;
    const upcoming = moviesList.filter(movie => movie.status === 'upcoming').length;
    setStats({ total, active, upcoming });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMovie) return;

    try {
      await axios.delete(`/movies/${selectedMovie._id}`);
      fetchMovies();
      setDeleteDialog(false);
      setSelectedMovie(null);
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
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
            color: 'transparent'
          }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {title}
          </Typography>
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
          Loading Movies...
        </Typography>
      </Box>
    );
  }

  return (
<Box sx={{ py: 4, width: '100%', maxWidth: 'none', margin: 0, px: 0 }}>

      <AdminLayout>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mt: -10,
            mb: 2
          }}>
            Movie Management
          </Typography>


          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Movies"
                value={stats.total}
                icon={<Theaters sx={{ color: '#ffd700', fontSize: 32 }} />}
                color="#ffd700"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Active Screenings"
                value={stats.active}
                icon={<Visibility sx={{ color: '#00ff88', fontSize: 32 }} />}
                color="#00ff88"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Upcoming Releases"
                value={stats.upcoming}
                icon={<Schedule sx={{ color: '#4dabf5', fontSize: 32 }} />}
                color="#4dabf5"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Avg Rating"
                value="4.5"
                icon={<Star sx={{ color: '#ff6b6b', fontSize: 32 }} />}
                color="#ff6b6b"
              />
            </Grid>
          </Grid>

          {/* Add Movie Button */}
          <Tooltip title="Add a new movie to your catalog" arrow>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/admin/movies/add")}
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
              Add New Movie
            </Button>
          </Tooltip>
        </Box>

        {/* Movies Table */}
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
                background: 'linear-gradient(135deg, rgba(80, 68, 0, 0.1) 0%, rgba(151, 129, 3, 0.05) 100%)'
              }}>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700">
                    Poster
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700">
                    Movie Details
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700">
                    Genre
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700">
                    Duration
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 3, borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                  <Typography variant="h6" fontWeight={600} color="#ffd700">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {movies.map((movie, index) => (
                <Slide in timeout={500 + (index * 100)} direction="up" key={movie._id}>
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
                      <Box
                        sx={{
                          width: 150,
                          height: 180,
                          borderRadius: 3,
                          overflow: 'hidden',
                          position: 'relative',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.53)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05) rotate(2deg)',
                            boxShadow: '0 12px 48px rgba(147, 168, 63, 0.3)'
                          }
                        }}
                      >
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="white" sx={{ mb: 0.5 }}>
                          {movie.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {movie.director}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Star sx={{ color: '#ffd700', fontSize: 25 }} />
                          <Typography variant="body2" color="#ffd700" fontWeight={600}>
                            {movie.rating || '4.5'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {movie.genre?.slice(0, 3).map((genre, idx) => (
                          <Chip
                            key={idx}
                            label={genre}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, ${alpha('#ffd700', 0.2)}, ${alpha('#ffd700', 0.1)})`,
                              color: '#ffd700',
                              border: `1px solid ${alpha('#ffd700', 0.3)}`,
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Chip
                        icon={<Schedule sx={{ fontSize: 25 }} />}
                        label={`${movie.duration} mins`}
                        sx={{
                          background: `linear-gradient(135deg, ${alpha('#4dabf5', 0.2)}, ${alpha('#4dabf5', 0.1)})`,
                          color: '#4dabf5',
                          border: `1px solid ${alpha('#4dabf5', 0.3)}`,
                          fontWeight: 500
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ borderColor: 'rgba(255, 215, 0, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Edit Movie" arrow>
                          <IconButton
                            onClick={() => navigate(`/admin/movies/edit/${movie._id}`)}
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

                        <Tooltip title="Delete Movie" arrow>
                          <IconButton
                            onClick={() => handleDeleteClick(movie)}
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

                        <Tooltip title="Manage Showtimes" arrow>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<MovieFilter />}
                            onClick={() => navigate(`/admin/showtimes/${movie._id}`)}
                            sx={{
                              borderColor: 'rgba(255, 215, 0, 0.5)',
                              ml: 10,
                              color: '#ffd700',
                              fontWeight: 600,
                              '&:hover': {
                                borderColor: '#ffd700',
                                background: 'rgba(255, 215, 0, 0.1)',
                                transform: 'translateY(-2px)'
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Showtimes
                          </Button>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                </Slide>
              ))}
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
              Are you sure you want to delete
            </Typography>
            <Typography variant="h5" color="#ffd700" fontWeight={700} sx={{ mb: 3 }}>
              {selectedMovie?.title}
            </Typography>
            <Typography variant="body2" color="#ffd700" sx={{ mb: 2 }} fontSize={25}>
              This action cannot be undone and will remove all associated showtimes and bookings.
            </Typography>
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
              Delete Movie
            </Button>
          </DialogActions>
        </Dialog>
      </AdminLayout>
    </Box>
  );
};

export default AdminMovies;