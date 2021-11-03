import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ component, ...rest }) => {
    return (
        <Route
          {...rest}
          key='route'
          component={component}
        />
    );
};
PublicRoute.propTypes = {
  component: PropTypes.any
};

export default PublicRoute;