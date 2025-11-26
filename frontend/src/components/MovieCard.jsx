import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const textColor = movie.status === "now-showing"
    ? "#00ff0dff"   // Neon green
    : "rgba(255, 0, 0, 1)";  // Red for coming soon

  const statusColor = movie.status === "now-showing"
    ? "#00ff1eff"   // Green
    : "#ff0000ff";  // Orange

  return (
    <Box sx={{ mt: 2 }}>
      <Card
        sx={{
          px: 2,
          pt: 2,
          backgroundColor: "#211f1fd8",
          border: "1px solid #ebce5a49",
          height: "100%",
          borderRadius: 4,
          overflow: "hidden",
          //width: "85%",
          maxWidth: "none",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            //background: "linear-gradient(90deg, #ffd700, #ffed4e, #ffd700)",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease",
            zIndex: 2,
          },
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            border: "1px solid #ffd70040",
            boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 215, 0, 0.1)
          `,
            "&:before": {
              transform: "scaleX(1)",
            },
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover Overlay */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(45deg, rgba(255,215,0,0.1) 0%, transparent 50%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </Fade>

        {/* Poster Container with Enhanced Effects */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={movie.posterUrl}
            alt={movie.title}
            sx={{
              transition: "all 0.5s ease",
              filter: isHovered
                ? "brightness(1.1) contrast(1.05)"
                : "brightness(0.95) contrast(1)",
              opacity: imageLoaded ? 1 : 0,
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <Box
              sx={{
                height: 340,
                background: "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
                backgroundSize: "200% 100%",
                animation: "loading 1.5s infinite",
                borderRadius: 2,
              }}
            />
          )}

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background: "linear-gradient(transparent 0%, #000000d8 90%)",
              opacity: isHovered ? 0.8 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />
        </Box>

        <CardContent sx={{ position: "relative", zIndex: 2, pt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                background: "linear-gradient(45deg, #fff 30%, #ffd700 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                lineHeight: 1.2,
                pr: 1,
              }}
            >
              {movie.title}
            </Typography>

            <Chip
              label={movie.status === "now-showing" ? "Now Showing" : "Coming Soon"}
              sx={{
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",

                // DYNAMIC TEXT COLOR
                color: textColor,

                // DYNAMIC BACKGROUND (same as before)
                background: `linear-gradient(
    135deg, 
    ${alpha(statusColor, 0.25)} 0%, 
    ${alpha(statusColor, 0.15)} 100%
  )`,

                border: `1px solid ${alpha(statusColor, 0.4)}`,

                boxShadow: `0 2px 30px ${alpha(statusColor, 0.4)}, inset 0 2px 4px rgba(255,255,255,0.3)`,

                borderRadius: "8px",
                backdropFilter: "blur(6px)",

                "& .MuiChip-label": {
                  px: 2,
                  color: textColor,  // DYNAMIC HERE
                  textShadow: "0 1px 2px rgba(255,255,255,0.2)",
                },

                transition: "all 0.3s ease",
              }}

            />


          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#cccccc",
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              ⏰{movie.duration} Minutes
            </Typography>

            {movie.rating && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255, 215, 0, 0.1)",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ffd700",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  ⭐ {movie.rating}/10
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(`/movie/${movie._id}`)}
            sx={{
              background: "#000000",            // button turns black
              color: "#ffd700",
              fontSize: "1rem",
              py: 0.5,
              borderRadius: 1.5,
              border: "1px solid #ffd700",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)",
                boxShadow: "10px 10px 30px rgba(0, 0, 0, 1)",
                color: "#000000",
                borderColor: "#ffd700",          // border stays gold
                transform: "translateY(-2px)",   // same hover lift
              },
            }}
          >
            View Details
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;