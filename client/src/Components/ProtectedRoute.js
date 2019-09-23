import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
{/* <Protected exact path='/' component={SignIn} /> */}

const Protected = ({ user, ...props }) => {
  if (!user) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/dashboard" />;
  }
};
const mapStateToProps = store => ({
  user: store.Login.user
});

export default connect(mapStateToProps)(Protected);
