import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import axios from "../api/axiosConfig";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("/movies");
        setMovies(res.data || []);   // PURE ARRAY
      } catch (error) {
        console.log("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box sx={{
          mt:-10,
          ml:3,
          px: { xs: 2, sm: 3, md: 6 }, pb: 5, background: `
          linear-gradient(135deg, #1e1c1cff 0%, #1a1a1a 50%, #131212ff 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
        `,
        }}>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>

  );
};

export default Home;
