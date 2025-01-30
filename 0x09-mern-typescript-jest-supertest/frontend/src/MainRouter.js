import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './core/Home';
import User from './user/User';
import Signup from './user/Signup'
import Signin from './auth/Signin';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import EditProfile from './user/EditProfile';

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<User />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/user/edit/:userId" element={<EditProfile />} />
      </Route>
      <Route path="/user/:userId" element={<Profile />} />
    </Routes>
  
  
  )
}

export default MainRouter;
