import {
  login_failed,
  login_loading,
  login_success
} from "../Actions/authentication";

import { message } from "antd";
import axios from "axios";
import { baseUrl, verifyToken } from "../../shared";


  const LoginActionCreater = creds => dispatch=>{
    const {email,password}=creds
  dispatch(login_loading());
  baseUrl
  .post('api/users/login', {
    email,
   password
 })
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const user = verifyToken();

        if (user) {
          dispatch(login_success(user));
          message.success("Hello "+ user.name );
        } else {
          message.error(res.message);
          dispatch(login_failed("Some thing went wrong"));
          // console.log(res)
        }
      }
    })
    .catch((err) => {
      message.error(err.message);
      dispatch(login_failed("Some thing went wrong"));
      console.log(err)
    });
};

export default LoginActionCreater;
