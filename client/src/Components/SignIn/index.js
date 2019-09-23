import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Icon,
  Typography,
  Checkbox,
  Button
} from "antd";
import { Link } from "react-router-dom";
import { emailPattern } from "../../shared";
import { connect } from "react-redux";
import SiginActionCreater from "../../Redux/Epics/login";

const mapStateToProps = state => ({
  login: state.Login
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailIsValid: false,
      emailHelp: "",
      emailValidateStatus: "",

      password: "",
      passwordIsValid: false,
      passwordHelp: "",
      passwordValidateStatus: "",

      rememberMe: false
    };
  }
  onChangeValidator = (name, value) => {
    switch (name) {
      case "password":
        if (value.trim() === "") {
          this.setState({
            passwordValidateStatus: "error",
            passwordHelp: "Enter your password!",
            passwordIsValid: false
          });
        } else {
          this.setState({
            passwordValidateStatus: "success",
            passwordHelp: "",
            passwordIsValid: true
          });
        }
        break;
      case "email":
        if (!emailPattern.test(value)) {
          this.setState({
            emailValidateStatus: "error",
            emailHelp: "Enter a valid Email address!",
            emailIsValid: false
          });
        } else {
          this.setState({
            emailValidateStatus: "success",
            emailHelp: "",
            emailIsValid: true
          });
        }
        break;
    }
  };

  onChangeHandler = evt => {
    const { name, value, checked } = evt.target;

    if (name !== "rememberMe") {
      this.setState({ [name]: value }, () =>
        this.onChangeValidator(name, value)
      );
    } else {
      this.setState({ [name]: checked });
    }
  };

  onSubmitHandler = evt => {
    evt.preventDefault();
    let isFormValid = true;
    if (!this.state.emailIsValid) {
      isFormValid = false;
      this.setState({
        emailValidateStatus: "error",
        emailHelp: "Enter your Email !"
      });
    }

    if (!this.state.passwordIsValid) {
      isFormValid = false;
      this.setState({
        passwordIsValid: false,
        passwordHelp: "Enter your password !",
        passwordValidateStatus: "error"
      });
    }

    if (isFormValid) {
      const { email, password, rememberMe } = this.state;
      this.props.dispatch(
        SiginActionCreater({
          email,
          password,
          rememberMe
        })
      );
    } else {
      console.log("Validation Error");
    }
  };


  render() {
    if(this.props.login.user){
      this.props.history.push("/dashboard");
    }
    return (
      <div className="login-container">
        <Card bordered style={{ borderRadius: "10px" }}>
          <div style={{ textAlign: "center" }}>
            <Typography.Title level={1}>SIGN IN</Typography.Title>
          </div>
          <Form colon={false} onSubmit={this.onSubmitHandler}>
            <Form.Item
              validateStatus={this.state.emailValidateStatus}
              help={this.state.emailHelp}
              hasFeedback
              label="Email"
            >
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeHandler}
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="Enter your Email"
              />
            </Form.Item>
            <Form.Item
              validateStatus={this.state.passwordValidateStatus}
              help={this.state.passwordHelp}
              hasFeedback
              label="Password"
            >
              <Input
                value={this.state.password}
                onChange={this.onChangeHandler}
                type="password"
                name="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,0.25)" }} />
                }
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Checkbox
                  name="rememberMe"
                  onChange={this.onChangeHandler}
                  checked={this.state.rememberMe}
                >
                  Remember me
                </Checkbox>
                <a href="#">Forgot Password</a>
              </div>
              <div>
                <Button
                  loading={this.props.login.isLoading}
                  disabled={this.props.login.isLoading}
                  style={{ width: "100%" }}
                  htmlType="submit"
                  type="primary"
                >
                  Sign In
                </Button>
              </div>
              <div>
                Or <Link to="/signup">Create Account !</Link>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Signin);
