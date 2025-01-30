import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useParams } from "react-router-dom";

import auth from "../auth/auth-helper";
import { remove } from "./api-user";

function DeleteUser() {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { userId } = useParams();

  const toggleDialog = () => setOpen(prevOpen => !prevOpen);

  const deleteAccount = async () => {
    try {
      const jwt = auth.isAuthenticated();
      const data = await remove({ userId }, { t: jwt.token });

      if (data?.error) {
        console.error("Error in DeleteUser component:", data.error);
      } else {
        auth.clearJWT(() => console.log("Account deleted"));
        setRedirect(true);
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <IconButton aria-label="Delete" onClick={toggleDialog} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;
