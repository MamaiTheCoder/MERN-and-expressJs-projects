import React, { useCallback, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Icon
} from '@mui/material';
import auth from './auth-helper';
import { signin } from './api-auth';

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
    marginTop: theme.spacing(2),
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
}))

function Signin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation(); // Fixed this line
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const { email, password, error, redirectToReferrer } = values;

  // Extracting the redirect path (from location.state)
  const { from } = location.state || { from: { pathname: '/' } };

  const handleChange = useCallback((name) => (event) => {
    setValues((prevValues) => ({ ...prevValues, [name]: event.target.value }));
  }, []);

  const clickSubmit = useCallback(() => {
    const user = { email, password };

    signin(user)
      .then((data) => {
        if (data.error) {
          setValues((prevValues) => ({ ...prevValues, error: data.error }));
        } else {
          auth.authenticate(data, () => {
            setValues((prevValues) => ({ ...prevValues, error: '', redirectToReferrer: true }));
          });
        }
      })
      .catch((err) => {
        setValues((prevValues) => ({ ...prevValues, error: 'An unexpected error occurred' }));
      });
  }, [email, password]);

  // Use useEffect to handle the redirect after the state updates
  useEffect(() => {
    if (redirectToReferrer) {
      navigate(from.pathname, { replace: true });
    }
  }, [redirectToReferrer, navigate, from.pathname]); // Dependency array ensures this runs when redirectToReferrer changes

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
        </Typography>

        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />

        {error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
export default Signin
