import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Components/Spinner';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Alert from '../Components/Alert';
// import SideBar from '../Components/SideBar';

const PrivateLayout = (props) => {
    
    // console.log(props.location)
    return (
        <div id="wrapper">
            <div className="container-fluid p-0 min-vh-100"
              style={{overflowX:'hidden'}}
            >
              <NavBar/>
                <div id="page-wrapper">
                  <div className="row">
                    {/* <SideBar /> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 pb-10"  style={{margin:'40px'}}>
                      <Alert />
                      {props.children}
                    </div>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : isAuthenticated ? (
          <PrivateLayout >
            <Component {...props} />
          </PrivateLayout>
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