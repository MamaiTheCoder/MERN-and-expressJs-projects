import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
// import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Typography
} from "@mui/material";
import { Navigate, useParams, Link } from 'react-router-dom';

import auth from '../auth/auth-helper';
import { read } from './api-user';
import DeleteUser from './DeleteUser';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}));

function Profile() {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();
    read({ userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    }
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/signin" />
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={values.email} />
          {
            auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id} &&
            (
              <ListItemSecondaryAction>
                <Link to={"/user/edit" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon/>
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Joined: " + (
            new Date(user.created)).toDateString}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={user.about}
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default Profile;
