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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
