import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';

//..rest any custom props 
const PrivateRoute = ({ component: Component ,auth: { isAuthenticated, loading },...rest }) => (
  
    <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });


  

export default connect(mapStateToProps)(PrivateRoute);
