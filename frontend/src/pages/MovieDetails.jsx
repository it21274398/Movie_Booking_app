import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Fade,
  Rating,
  Divider,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack, PlayArrow, Favorite, Share } from "@mui/icons-material";
import axios from "../api/axiosConfig";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`/movies/${id}`);

      setMovie(res.data.data || res.data.movie || res.data || null);
    } catch (err) {
      setError("Failed to load movie details");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",

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
            Loading Movie Magic...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !movie) {
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
          {error || "Movie not found"}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mt: -10,
        background: `
          linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',

          background: `url("${movie.posterUrl}") center/cover fixed`,
          opacity: 0.03,
          filter: "blur(10px)",
        },
      }}
    >
      {/* Back Button */}
      <Container sx={{ pt: 4 }}>
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
      </Container>

      <Container sx={{ py: 8, position: "relative", zIndex: 2 }}>
        <Fade in={!loading} timeout={800}>
          <Grid container spacing={6} alignItems="flex-start">
            {/* POSTER SECTION */}
            <Grid item xs={12} md={4.6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: `
                    0 20px 40px rgba(0, 0, 0, 0.6),
                    0 0 0 1px rgba(255, 215, 0, 0.1),
                    0 0 30px rgba(255, 215, 0, 0.1)
                  `,
                  transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
                  transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": {
                    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02)",
                    boxShadow: `
                      0 30px 60px rgba(0, 0, 0, 0.8),
                      0 0 0 1px rgba(255, 215, 0, 0.3),
                      0 0 50px rgba(255, 215, 0, 0.2)
                    `,

                  },
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    height: 550,
                    width: "100%",
                    display: imageLoaded ? "block" : "none",
                    transition: "all 0.5s ease",
                  }}
                />

                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 600,
                      background: "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
                      backgroundSize: "200% 100%",
                      animation: "loading 1.5s infinite",
                    }}
                  />
                )}

                {/* Poster Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(45deg, rgba(255,215,0,0.1) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <IconButton
                    onClick={() => {
                      if (movie.trailerUrl) {
                        window.open(movie.trailerUrl, "_blank");
                      } else {
                        alert("Trailer not available");
                      }
                    }}
                    sx={{
                      color: "#ffd700",
                      background: "rgba(0, 0, 0, 0.8)",
                      border: "2px solid #ffd700",
                      width: 60,
                      height: 60,
                      "&:hover": {
                        background: "#ffd700",
                        color: "#000",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <PlayArrow fontSize="large" />
                  </IconButton>

                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  fullWidth
                  startIcon={<Favorite />}
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    background: isFavorite
                      ? "rgba(255, 215, 0, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: isFavorite ? "#ffd700" : "#fff",
                    border: `1px solid ${isFavorite ? "#ffd700" : "rgba(255, 255, 255, 0.3)"}`,
                    borderRadius: 2,
                    py: 1.5,
                    "&:hover": {
                      background: "rgba(255, 215, 0, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>

                <Button
                  fullWidth
                  startIcon={<Share />}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: 2,
                    py: 1.5,
                    "&:hover": {
                      background: "rgba(255, 215, 0, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Share
                </Button>
              </Box>
            </Grid>

            {/* DETAILS SECTION */}
            <Grid item xs={12} md={7}>
              <Box sx={{ color: "white" }}>
                {/* Title with Gradient */}
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
                    lineHeight: 1.1,
                  }}
                >
                  {movie.title}
                </Typography>

                {/* Status and Rating Row */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
                  <Chip
                    label={movie.status === "now-showing" ? "🎬 Now Showing" : "🎭 Coming Soon"}
                    color={movie.status === "now-showing" ? "success" : "warning"}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      height: 32,
                      background: movie.status === "now-showing"
                        ? "linear-gradient(45deg, #4caf50, #66bb6a)"
                        : "linear-gradient(45deg, #ff9800, #ffb74d)",
                      color: "#000",
                      "& .MuiChip-label": {
                        px: 2,
                      },
                    }}
                  />

                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={movie.rating || 3.5}
                      precision={0.1}
                      readOnly
                      sx={{
                        color: "#ffd700",
                        "& .MuiRating-icon": {
                          fontSize: "1.8rem",
                        },
                      }}
                    />
                    <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                      {movie.rating || "4.5"}/10
                    </Typography>
                  </Box>
                </Box>

                {/* Genres */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: "#ffd700", mb: 2, fontWeight: 600 }}>
                    🎭 GENRES
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {movie?.genre?.map((g, idx) => (
                      <Chip
                        key={idx}
                        label={g}
                        sx={{
                          background: "rgba(255, 215, 0, 0.1)",
                          color: "#ffd700",
                          border: "1px solid rgba(255, 215, 0, 0.3)",
                          fontWeight: 600,
                          textTransform: "capitalize",
                          fontSize: "0.9rem",
                          py: 2,
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

                <Divider sx={{ borderColor: "rgba(255, 215, 0, 0.3)", mb: 4 }} />

                {/* Description */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ color: "#ffd700", mb: 2, fontWeight: 700 }}>
                    📖 SYNOPSIS
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {movie.description}
                  </Typography>
                </Box>

                {/* Movie Info Grid */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                        ⏱️
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Duration
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                        {movie.duration} min
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                        🎫
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Type
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                        {movie.type || "Feature"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                        🌍
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Language
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                        {movie.language || "-"}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ color: "#ffd700", fontWeight: 700 }}>
                        🎭
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Age Rating
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                        {movie.ageRating || "PG-15"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* CTA Button */}
                {movie.status === "now-showing" ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/movie/${movie._id}/showtimes`)}
                    sx={{
                      background: "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)",
                      color: "#000",
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      py: 2.5,
                      px: 6,
                      borderRadius: 3,
                      border: "2px solid transparent",
                      backgroundClip: "padding-box",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)",

                      "&:hover": {
                        background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)',
                        color: '#ffd700',
                        border: '1px solid rgba(255, 217, 0, 0.81)',
                        boxShadow: '0 12px 48px rgba(255, 217, 0, 0.24)',
                        transform: "translateY(-4px) scale(1.02)",

                      },
                      "& .MuiButton-label": {
                        position: "relative",
                        zIndex: 1,
                      },
                    }}
                  >
                    🎟️ Book Tickets Now
                  </Button>
                ) : (
                  <Alert
                    severity="info"
                    sx={{
                      width: "fit-content",
                      background: "rgba(2, 136, 209, 0.1)",
                      border: "1px solid rgba(2, 136, 209, 0.3)",
                      borderRadius: 3,
                      color: "#fff",
                      fontSize: "1.1rem",
                      py: 2,
                      px: 4,
                    }}
                  >
                    🎭 Coming Soon - Stay Tuned!
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default MovieDetails;