import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";
import { useSelector } from "react-redux";
import MainPage from "./MainPage";


const Movies = () => {
  const [movies, setMovies] = useState();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {movies &&
  movies.map((movie, index) => {
    if (isAdminLoggedIn || !isUserLoggedIn  ) {
      return (
        <MainPage
          id={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          releaseDate={movie.releaseDate}
          key={index}
        />
      );
    } else {
      return (
        <MovieItem
          key={index}
          id={movie._id}
          posterUrl={movie.posterUrl}
          releaseDate={movie.releaseDate}
          title={movie.title}
        />
      );
    }
  })}

      </Box>
    </Box>
  );
};

export default Movies;
