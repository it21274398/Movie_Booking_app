import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  Chip,
  Fade,
  Slide,
  alpha,
  Divider,
  InputAdornment,
  Tooltip
} from "@mui/material";
import {
  Edit,
  Theaters,
  Schedule,
  Description,
  AddPhotoAlternate,
  CloudUpload,
  MovieFilter,
  Star,
  PlayArrow,
  Group,
  AutoAwesome
} from "@mui/icons-material";
import axios from "../../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    posterUrl: "",
    genre: "",
    duration: "",
    description: "",
    status: "now-showing",
    director: "",
    rating: "",
    cast: "",
    trailerUrl: ""
  });

  const [posterPreview, setPosterPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        const movie = res.data;

        setForm({
          title: movie.title || "",
          posterUrl: movie.posterUrl || "",
          genre: movie.genre?.join(", ") || "",
          duration: movie.duration || "",
          description: movie.description || "",
          status: movie.status || "now-showing",
          director: movie.director || "",
          rating: movie.rating || "",
          cast: movie.cast?.join(", ") || "",
          trailerUrl: movie.trailerUrl || ""
        });

        setPosterPreview(movie.posterUrl || "");
      } catch (err) {
        console.log("Error fetching movie:", err);
        setError("Failed to load movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("poster", file);

      const res = await axios.post("/movies/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const path = res.data.filePath;
      setPosterPreview(path);
      setForm((prev) => ({ ...prev, posterUrl: path }));
    } catch (err) {
      console.log("Upload failed:", err);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");

    try {
      await axios.put(`/movies/${id}`, {
        title: form.title,
        posterUrl: form.posterUrl,
        genre: form.genre.split(",").map((g) => g.trim()),
        duration: Number(form.duration),
        description: form.description,
        status: form.status,
        director: form.director,
        rating: form.rating,
        cast: form.cast.split(",").map((c) => c.trim()),
        trailerUrl: form.trailerUrl
      });

      setSuccess("🎬 Movie updated successfully!");
      setTimeout(() => navigate("/admin/movies"), 1500);
    } catch (err) {
      setLoading(false); 
      setError("Failed to update movie. Please check all fields.");
    }
  };

  const StatusChip = ({ status }) => (
    <Chip
      label={status === 'now-showing' ? 'Now Showing' : 'Coming Soon'}
      sx={{
        background: status === 'now-showing' 
          ? 'linear-gradient(135deg, #00ff88, #00cc6a)'
          : 'linear-gradient(135deg, #4dabf5, #339af0)',
        color: 'white',
        fontWeight: 700,
        fontSize: '0.75rem'
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
          Loading Movie Data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1200, margin: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={800} sx={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
           mt: 8,
            mb: 2
          
        }}>
          Edit Movie
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Refine your cinematic masterpiece
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
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={700} sx={{ 
                      color: '#ffd700',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Edit /> Edit Movie Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Movie Title"
                      name="title"
                      fullWidth
                      required
                      value={form.title}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Theaters sx={{ color: '#ffd700' }} />
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
                    <TextField
                      label="Director"
                      name="director"
                      fullWidth
                      value={form.director}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Rating"
                      name="rating"
                      type="number"
                      inputProps={{ step: "0.1", min: "0", max: "10" }}
                      fullWidth
                      value={form.rating}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Star sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Media Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 215, 0, 0.2)' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ 
                      color: '#ffd700',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <AddPhotoAlternate /> Update Media
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                        border: '2px dashed rgba(255, 215, 0, 0.3)',
                        borderRadius: 3,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#ffd700',
                          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                          transform: 'translateY(-2px)'
                        }
                      }}
                      onClick={() => document.getElementById('poster-upload').click()}
                    >
                      <input
                        id="poster-upload"
                        accept="image/*"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />
                      <CloudUpload sx={{ fontSize: 48, color: '#ffd700', mb: 2 }} />
                      <Typography variant="h6" color="#ffd700" gutterBottom>
                        {uploading ? 'Uploading...' : 'Update Poster Image'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click to browse or drag and drop
                      </Typography>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Trailer URL"
                      name="trailerUrl"
                      fullWidth
                      value={form.trailerUrl}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PlayArrow sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Details Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 215, 0, 0.2)' }} />
                    <Typography variant="h5" fontWeight={700} sx={{ 
                      color: '#ffd700',
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Description /> Movie Details
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Genre (comma separated)"
                      name="genre"
                      fullWidth
                      required
                      value={form.genre}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Duration (minutes)"
                      name="duration"
                      type="number"
                      fullWidth
                      required
                      value={form.duration}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 3,
                        '&:hover fieldset': { borderColor: '#ffd700' },
                        '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                      }
                    }}>
                      <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status</InputLabel>
                      <Select
                        name="status"
                        value={form.status}
                        label="Status"
                        onChange={handleChange}
                      >
                        <MenuItem value="now-showing">
                          <StatusChip status="now-showing" />
                        </MenuItem>
                        <MenuItem value="coming-soon">
                          <StatusChip status="coming-soon" />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cast (comma separated)"
                      name="cast"
                      fullWidth
                      value={form.cast}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Group sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Movie Description"
                      name="description"
                      fullWidth
                      required
                      multiline
                      rows={5}
                      value={form.description}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                            <Description sx={{ color: '#ffd700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 3,
                          '&:hover fieldset': { borderColor: '#ffd700' },
                          '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                        }
                      }}
                    />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        onClick={() => navigate("/admin/movies")}
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
                      <Tooltip title="Save all changes to this movie" arrow>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          type="submit"
                          startIcon={<AutoAwesome />}
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
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Update Movie
                        </Button>
                      </Tooltip>
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
                <MovieFilter /> Live Preview
              </Typography>

              {posterPreview ? (
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    mb: 3,
                    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 12px 48px rgba(255, 215, 0, 0.3)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="450"
                    image={posterPreview}
                    alt="Poster preview"
                  />
                </Card>
              ) : (
                <Box
                  sx={{
                    height: 300,
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(255, 215, 0, 0.3)',
                    mb: 3
                  }}
                >
                  <Typography color="text.secondary" textAlign="center">
                    Poster Preview
                    <br />
                    <Typography variant="body2" component="span">
                      Upload an image to see preview
                    </Typography>
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="h6" fontWeight={700} color="white" gutterBottom>
                  {form.title || "Movie Title"}
                </Typography>
                {form.director && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Directed by {form.director}
                  </Typography>
                )}
                {form.rating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Star sx={{ color: '#ffd700', fontSize: 20 }} />
                    <Typography variant="body2" color="#ffd700" fontWeight={600}>
                      {form.rating}/10
                    </Typography>
                  </Box>
                )}
                {form.genre && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                    {form.genre.split(',').map((genre, idx) => (
                      <Chip
                        key={idx}
                        label={genre.trim()}
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
                )}
                {form.status && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <StatusChip status={form.status} />
                    {form.duration && (
                      <Chip
                        icon={<Schedule sx={{ fontSize: 16 }} />}
                        label={`${form.duration} mins`}
                        size="small"
                        sx={{
                          background: `linear-gradient(135deg, ${alpha('#4dabf5', 0.2)}, ${alpha('#4dabf5', 0.1)})`,
                          color: '#4dabf5',
                          border: `1px solid ${alpha('#4dabf5', 0.3)}`,
                          fontWeight: 500
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditMovie;