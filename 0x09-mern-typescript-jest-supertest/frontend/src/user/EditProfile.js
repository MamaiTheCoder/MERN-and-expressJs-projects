import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper';
import { Navigate, useParams } from 'react-router-dom';
import { update } from './api-user';

function EditProfile() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    about: '',
    photo: '',
    open: false,
    error: '',
    redirectToProfile: false
  });
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  const clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    };

    update({userId}, {t: jwt.token}, user).then(
      (data) => {
        if (data && data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({...values, userId: data._id, redirectToProfile: true});
        }
      }
    );
  };

  if (values.redirectToProfile) {
    return <Navigate to={`/user/${values.userId}`} />
  }

  return (
    <div>
      
    </div>
  )
}

export default EditProfile;
