import { Route, Navigate } from "react-router-dom";
import { Component } from "react";
import auth from "./auth-helper";

/**
 * PrivateRoute Component
 * 
 * This component is used to protect routes that require authentication. It acts as a higher-order
 * component that checks whether the user is authenticated before rendering the protected component.
 * 
 * If the user is authenticated (as determined by the `auth.isAuthenticated()` function), the 
 * specified component is rendered. Otherwise, the user is redirected to the `/signin` page for 
 * authentication.
 * 
 * This component is designed for use with React Router v6. It uses the `Route` component's `element` 
 * prop to conditionally render either the protected component or a redirect (`Navigate`).
 * 
 * Props:
 * - `element`: The component to render when the user is authenticated.
 * - `...rest`: Any additional props that should be passed to the `Route` component (e.g., `path`, `exact`).
 * 
 * Usage:
 * <PrivateRoute path="/protected" element={<ProtectedComponent />} />
 * 
 * Note:
 * - This component ensures that only authenticated users can access the routes wrapped with it.
 * - If authentication fails, users are redirected to the signin page to authenticate.
 */

function PrivateRoute({ element: Component, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        auth.isAuthenticated() ? (
          <Component />
        ) : (
          <Navigate to="/signin" replace />
        )
      }
    />
  );
}

export default PrivateRoute
