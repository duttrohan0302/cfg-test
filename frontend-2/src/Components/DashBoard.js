import React,{ useState, useEffect } from "react";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';
// import auth from "../Reducers/auth";

const DashBoard = ({user,isAuthenticated}) => {

  return(
  <div>
    This is the dashboard, this means you're signed in
    <p>Your user details:</p>  
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
  </div>)
}

  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

  });
  
  export default connect(mapStateToProps)(DashBoard);