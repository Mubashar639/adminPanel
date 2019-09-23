import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
{/* <Private path='/dashboard' component={AppDetail} /> */}

const Private = ({ user, path, ...props }) => {
  if (user) {
   return  <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = store => ({
  user: store.Login.user
});

export default connect(mapStateToProps)(Private);
