import React, { useEffect, useState } from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@mui/material';

import { list } from './api-user';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  },
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  }
}));

function User() {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal

    list(signal).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    })

    return function cleanup() {
      abortController.abort();
    }
  }, []);
  return (
    <Paper className={classes.root} elevation={4}> 
      <Typography variant='h6' className={classes.title}>
        All Users
      </Typography>
      <List dense>
        { users && users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </Paper>
  
  )
}

export default User;
