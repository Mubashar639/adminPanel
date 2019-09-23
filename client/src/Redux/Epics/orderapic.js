import {
  
    order_success,
    order_add,
    order_remove,
    order_update
    // order_create,
  
  } from "../Actions/authentication";
  
  import { message } from "antd";
  import { baseUrl } from "../../shared";
  
  
  export const Getorders = () => dispatch => {
    // dispatch(order_loading());
    baseUrl
      .get('api/order/all')
      .then(res => {
        if (res.status === 200) {
  
          dispatch(order_success(res.data.orders));
          message.success("success");
          // console.log(res)
        }
      })
      .catch((err) => {
        message.error(err.message);
        // dispatch(order_failed("Some thing went wrong"));
        console.log(err)
      });
  };
  
  
  export const Deleteorders = creds => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
    baseUrl
      .delete('api/order/delete/' + creds, { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 200) {
          dispatch(order_remove(creds));
          console.log(res.data)
          message.success("successfully Deleted");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  
  export const Updateorders = ({ id, ...creds }) => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
    baseUrl
      .patch('api/order/ChangeStatus/' + id, 
      { ...creds },
       { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 200) {
          dispatch(order_update({id, updatedorder:res.data.order}));
          message.success("successfully updated");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  