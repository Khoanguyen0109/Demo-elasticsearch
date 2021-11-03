import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_AUTH } from '../pages/Login/routes';
import { useAuthDataContext } from '../Auth/AuthContext';
import { CircularProgress } from '@mui/material';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const PrivateRoute = ({ component, routerRoles, ...rest }) => {
  const { currentUser, fetchingUser, token } = useAuthDataContext();
  //   const finalComponent = user ? component : <Redirect to= />;
  // return null;
  // console.log('private', fetchingUser, currentUser, token);
  if (fetchingUser && token) {
    return <CircularProgress color='primary' />;
  }
  if (isEmpty(currentUser)) {
    let to = ROUTE_AUTH.LOGIN;
    if (rest.to) {
      to = rest.to;
    }
    return <Redirect to={to} />;
  }
  const hasPermission = !!currentUser;
  if (!hasPermission) {
    return (
      <ErrorPage
        errorCode='403'
        shortDescription='forbidden'
        detailDescription='no_permission'
        isNotFoundPage={false}
      />
    );
  }
  return <Route {...rest} component={component} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  routerRoles: PropTypes.array,
};
export default PrivateRoute;
