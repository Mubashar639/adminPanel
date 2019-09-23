import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppDetail from "./Dashboard";
import SignIn from "./SignIn";
import Private from "./PrivateRoute";
import Protected from "./ProtectedRoute";
import { verifyToken } from "../shared";
import { login_success } from "../Redux/Actions/authentication";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let keys = ["/dashboard", "/"];
    const selectedKey = keys.find(key =>
      nextProps.location.pathname.toLowerCase().startsWith(key)
    );
    return {
      ...prevState,
      selectedKey
    };
  }

  componentDidMount() {
    const user = verifyToken();
    if (user) {
      this.props.dispatch(dispatch => dispatch(login_success(user)));
    }
  }

  render() {
    return (

      <Switch>
        {/* <Private path='/dashboard/sales/orders' component={Orders} /> */}
        <Private path='/dashboard' component={AppDetail} />
        <Protected exact path='/' component={SignIn} />
      </Switch>
    );
  }
}

const mapStateToProps = store => ({
  user: store.Login.user
});
export default withRouter(connect(mapStateToProps)(Main));
