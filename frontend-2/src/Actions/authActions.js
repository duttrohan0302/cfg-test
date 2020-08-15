import api from '../Utils/api';
import { setAlert } from './alertActions';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

import setAuthToken from "../Utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { history } from '../Helpers';

// Load User
export const loadUser = (decoded) => async dispatch => {
  try {
    dispatch({
      type: USER_LOADED,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    
    history.push('/login')

  } catch (err) {
    console.log(err)
    const errors = err.response.data;

    // if(errors){
    //   for (const [key, value] of Object.entries(errors)) {
    //     dispatch(setAlert(`${value}`, 'danger'))
    //   }
  
    // }

    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });
  }
};

// Login User- Get user token
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/login', body);
    console.log(res.data)

    const { token } = res.data;

    // Set token to local storage
    localStorage.setItem("token", token);
    
    // Set token to auth header
    setAuthToken(token);

    const decoded = jwt_decode(token);

    dispatch(loadUser(decoded));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    

  } catch (err) {
    console.log(err)
    if(err.response){
      const errors = err.response.data;
      console.log(errors)
      dispatch({
        type: LOGIN_FAIL,
        payload: errors
      });
    }

    // if(errors){
    //   for (const [key, value] of Object.entries(errors)) {
    //     dispatch(setAlert(value, 'danger'))
    //   }
    // }


  }
};

// Logout
export const logout = () => (dispatch) => {

    // Remove token from localStorage
    localStorage.removeItem("token");
    //   // Remove auth header for future requests
    setAuthToken(false);
    dispatch({
        type:LOGOUT
    })
}


