  
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
      <p>Go back to <Link to="/dashboard" >Hompage</Link></p>
    </Fragment>
  );
};

export default NotFound;