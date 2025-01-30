import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../auth/auth-helpers";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? {color: "#ff4081"} : { color: "#ffffff"};
  }

  const handleSignOut = () => {
    auth.clearJWT(() => {
      navigate('/');
    })
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Mern Skeleton
        </Typography>
        <Link to='/'>
          <IconButton aria-label="Home" style={isActive('/')}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive("/users")}>
            Users
          </Button>
        </Link>
        <Link to="/users/:userId">
          <Button style={isActive("/user/:userId")}>
            Profile
          </Button>
        </Link>
        {
          !auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
              <Button style={isActive('signup')}>
                  Sign up
                </Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive('signin')}>
                  Sign in
                </Button>
              </Link>
            </span>
          )
        }
        {
          auth.isAuthenticated() && (
            <span>
              <Link to={`user/${auth.isAuthenticated().user._id}`}>
                <Button style={isActive(`/user/${auth.isAuthenticated().user._id}`)}>
                  My profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </span>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Menu;
