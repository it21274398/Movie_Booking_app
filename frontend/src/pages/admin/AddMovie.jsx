import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Fade,
  Slide,
  alpha,
  useTheme,
  InputAdornment,
  Divider
} from "@mui/material";
import {
  AddPhotoAlternate,
  Theaters,
  Schedule,
  Group,
  Link,
  Description,
  Star,
  PlayArrow,
  CloudUpload,
  MovieFilter
} from "@mui/icons-material";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [form, setForm] = useState({
    title: "",
    posterUrl: "",
    genre: "",
    duration: "",
    description: "",
    status: "now-showing",
    releaseDate: "",
    cast: "",
    trailerUrl: "",
    
  });

  const [posterPreview, setPosterPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/movies", {
        title: form.title,
        posterUrl: form.posterUrl,
        genre: form.genre.split(",").map((g) => g.trim()),
        duration: Number(form.duration),
        description: form.description,
        status: form.status,
        releaseDate: form.releaseDate,
        cast: form.cast.split(",").map((c) => c.trim()),
        trailerUrl: form.trailerUrl,
     
      });

      setSuccess("🎬 Movie added successfully!");
      setTimeout(() => navigate("/admin/movies"), 1500);

    } catch (err) {
      console.log(err);
      setError("Failed to add movie. Please check all required fields.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("poster", file);

      const res = await axios.post("/movies/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosterPreview(res.data.filePath);
      setForm(prev => ({ ...prev, posterUrl: res.data.filePath }));
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const steps = ['Basic Info', 'Media & Details', 'Final Review'];

  const StatusChip = ({ status }) => (
    <Chip
      label={status === 'now-showing' ? 'Now Showing' : 'Coming Soon'}
      sx={{
        background: status === 'now-showing' 
          ? 'linear-gradient(135deg, #00ff88, #00cc6a)'
          : 'linear-gradient(135deg, #4dabf5, #339af0)',
        color: 'white',
        fontWeight: 700,
        fontSize: '0.75rem',
        px: 1
      }}
    />
  );

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1200, margin: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight={800} sx={{
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 2
        }}>
          Add New Movie
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Create a cinematic masterpiece for your audience
        </Typography>

        {/* Progress Steps */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          {steps.map((step, index) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: index === activeStep 
                    ? 'linear-gradient(135deg, #ffd700, #ffed4e)'
                    : index < activeStep
                    ? 'linear-gradient(135deg, #00ff88, #00cc6a)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: index <= activeStep ? '#000' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: 700,
                  border: index === activeStep ? '2px solid #ffd700' : 'none'
                }}
              >
                {index + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  mr: 2,
                  color: index <= activeStep ? '#ffd700' : 'rgba(255, 255, 255, 0.5)',
                  fontWeight: index === activeStep ? 700 : 400
                }}
              >
                {step}
              </Typography>
              {index < steps.length - 1 && (
                <Box sx={{ 
                  width: 40, 
                  height: 2, 
                  background: 'rgba(255, 215, 0, 0.3)',
                  mr: 2
                }} />
              )}
            </Box>
          ))}
        </Box>
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
                      <Theaters /> Basic Information
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
                      required
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
                      <AddPhotoAlternate /> Media & Content
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
                        {uploading ? 'Uploading...' : 'Upload Poster Image'}
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
                    <TextField
                      label="Release Date"
                      name="releaseDate"
                      type="date"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      value={form.releaseDate}
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

                  <Grid item xs={12}>
                    <TextField
                      label="Cast (comma separated)"
                      name="cast"
                      fullWidth
                      required
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

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      startIcon={<MovieFilter />}
                      sx={{
                        background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                        color: '#000',
                        fontWeight: 700,
                        py: 2,
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
                      Create Movie Masterpiece
                    </Button>
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
                textAlign: 'center'
              }}>
                Live Preview
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
                    height="400"
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
                      Will appear here
                    </Typography>
                  </Typography>
                </Box>
              )}

              {form.title && (
                <Box>
                  <Typography variant="h6" fontWeight={700} color="white" gutterBottom>
                    {form.title}
                  </Typography>
                  {form.director && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Directed by {form.director}
                    </Typography>
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
                  {form.status && <StatusChip status={form.status} />}
                </Box>
              )}
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMovie;