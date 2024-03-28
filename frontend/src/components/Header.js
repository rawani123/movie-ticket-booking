import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0); // Initialize value state to 0
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Set the active tab index based on the current route
    switch (location.pathname) {
      case "/movies":
        setValue(0);
        break;
      case "/admin":
        setValue(1);
        break;
      case "/auth":
        setValue(2);
        break;
      case "/user":
        setValue(3);
        break;
      case "/add":
        setValue(4);
        break;
      case "/user-admin":
        setValue(5);
        break;
      default:
        setValue(0); // Set default index for unknown routes
    }
  }, [location.pathname]);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, newValue) => {
    setValue(newValue); // Update value state when tab changes
    const movie = movies.find((m) => m.title === e.target.innerText);
    if (isUserLoggedIn && movie) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton component={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Multiple Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
          >
            <Tab component={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && [
              <Tab
                key="admin"
                component={Link}
                to="/admin"
                label="Admin"
              />,
              <Tab
                key="auth"
                component={Link}
                to="/auth"
                label="Auth"
              />,
            ]}
            {isUserLoggedIn && [
              <Tab
                key="profile"
                component={Link}
                to="/user"
                label="Profile"
              />,
              <Tab
                key="logout-user"
                onClick={() => logout(false)}
                component={Link}
                to="/"
                label="Logout"
              />,
            ]}
            {isAdminLoggedIn && [
              <Tab
                key="add"
                component={Link}
                to="/add"
                label="Add Movie"
              />,
              <Tab
                key="profile-admin"
                component={Link}
                to="/user-admin"
                label="Profile"
              />,
              <Tab
                key="logout-admin"
                onClick={() => logout(true)}
                component={Link}
                to="/"
                label="Logout"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
