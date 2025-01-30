import { useState, useEffect, useCallback } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography 
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import { create } from './api-user';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}));

function Signup() {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    open: false,
    error: ''
  });

  const handleChange = useCallback((name) => (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: event.target.value
    }));
  }, []);

  const handleSubmit = async () => {
    const { name, email, password } = values;
    const user = { name: name || undefined, email: email || undefined, password: password || undefined };

    try {
      const data = await create(user);
      if (data.error) {
        setValues((prevValues) => ({ ...prevValues, error: data.error }));
      } else {
        setValues((prevValues) => ({ ...prevValues, error: '', open: true }));
      }
    } catch (err) {
      setValues((prevValues) => ({ ...prevValues, error: 'An unexpected error occurred' }));
    }
  };

  // Example of using useEffect to handle side effects:
  useEffect(() => {
    if (values.open) {
      console.log("Account created successfully, dialog opened.");
    }
  }, [values.open]); // This runs when 'open' state changes

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>Sign Up</Typography>
          
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          
          <TextField
            id="email"
            label="Email"
            type="email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />

          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={values.open} disableBackdropClick>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>New account successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup
