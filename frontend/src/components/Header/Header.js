import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../../helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";
const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState(0);
  const [activateTab, setActivateTab] = useState(false);
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();

  setTimeout(()=>{
    setActivateTab(true)
},100)

  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight={"auto"} marginLeft="auto">
          <Autocomplete
            onChange={handleChange}
            sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Across Multiple Movies"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
        <Tabs onChange={handleChange} value={value} textColor="inherit">
  {(!isAdminLoggedIn && !isUserLoggedIn && activateTab) ? (
    [
      <Tab key="auth" to="/auth" LinkComponent={NavLink} label="Auth" />,
      <Tab key="admin" to="/admin" LinkComponent={NavLink} label="Admin" />
    ]
  ) : null}

  {isUserLoggedIn && (
    [
      <Tab key="user" LinkComponent={Link} to="/user" label="User" />,
      <Tab
        key="logout-user"
        onClick={handleLogout} // Assuming handleLogout is a function to handle logout
        LinkComponent={Link}
        to="/"
        label="Logout"
      />
    ]
  )}

  {isAdminLoggedIn && (
    [
      <Tab key="profile" LinkComponent={Link} to="/profile" label="Profile" />,
      <Tab key="add" LinkComponent={Link} to="/add" label="Add Movie" />,
      <Tab
        key="logout-admin"
        onClick={handleLogout} // Assuming handleLogout is a function to handle logout
        LinkComponent={Link}
        to="/"
        label="Logout"
      />
    ]
  )}
</Tabs>
    </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
