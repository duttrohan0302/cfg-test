import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Register from '../Components/Auth/Register';
import Login from '../Components/Auth/Login';

import PrivateRoute from './PrivateRoute';
import DefaultLayoutRoute from './DefaultLayout';
import DashBoard from '../Components/DashBoard';
import NotFound from '../Components/NotFound';


const Routes = ({auth,isAuthenticated}) => {
  return (
    // <section className="container">
      <Switch>
        <DefaultLayoutRoute exact path="/register" component={Register} />
        <DefaultLayoutRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        {/* <PrivateRoute exact path="/myProfile" component={DashBoard} /> */}

        {
          isAuthenticated ?
          <PrivateRoute component={NotFound} />
          :
          <DefaultLayoutRoute component={NotFound} />

        }
      </Switch>
    /* </section> */
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);
