import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Routes>
      <Route
        {...rest}
        render={props =>
          accessToken ? (
            <Component {...props} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>

  );
};

export default PrivateRoute;
