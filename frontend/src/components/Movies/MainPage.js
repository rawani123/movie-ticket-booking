import {
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  const MainPage = ({ title, releaseDate, posterUrl, id }) => {
    return (
      <Card
        sx={{
          margin: 2,
          width: 270,
          height: 300,
          borderRadius: 5,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <img height={"70%"} width="100%" src={posterUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default MainPage;
  