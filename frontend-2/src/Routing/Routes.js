import React from 'react';
import { Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Register from '../Components/Auth/Register';
import Login from '../Components/Auth/Login';

import PrivateRoute from './PrivateRoute';
import DefaultLayoutRoute from './DefaultLayout';
import DashBoard from '../Components/DashBoard';
import NotFound from '../Components/NotFound';
import Myprofile from '../Components/Myprofile';
import Myeducation from '../Components/Myeducation';
import Mydetails from '../Components/Mydetails';
import Projectindex from '../Components/Projectindex';


const Routes = ({auth,isAuthenticated}) => {
  return (
    // <section className="container">
      <Switch>
        <DefaultLayoutRoute exact path="/register" component={Register} />
        <DefaultLayoutRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <PrivateRoute exact path="/myProfile" component={Myprofile} />
        <PrivateRoute exact path="/myEducation" component={Myeducation} />
        <PrivateRoute exact path="/myDetails" component={Mydetails} />
        <PrivateRoute exact path="/projectIndex" component={Projectindex} />
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
