import {
    // transport_failed,
    
  
    transport_success,
    transport_add,
    transport_remove,
    transport_update
    // transport_create,
  
  } from "../Actions/authentication";
  
  import { message } from "antd";
  import { baseUrl } from "../../shared";
  
  
  export const GetTranport = () => dispatch => {
  
    baseUrl
      .get('api/transportation')
      .then(res => {
        if (res.status === 200) {

          dispatch(transport_success(res.data.data.transport));
          message.success("success");
          console.log(res.data)
        }
      })
      .catch((err) => {
        message.error(err.message);
        // dispatch(transport_failed("Some thing went wrong"));
        console.log(err)
      });
  };
  
  
  export const CreateTransport = creds => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
  
    baseUrl
      .post('api/transportation', {
        ...creds
      }, { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 201) {
          console.log(res.data)
          dispatch(transport_add(res.data.data.transport));
          message.success("transport added");
        } else {
          message.error(res.message);
          // console.log(res)
        }
      })
      .catch((err) => {
        message.error(err.message);
        // dispatch(login_failed("Some thing went wrong"));
        console.log(err)
      });
  };
  
  export const DeleteTranport = creds => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
    baseUrl
      .delete('api/transportation/' + creds, { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 204) {
          dispatch(transport_remove(creds));
          console.log(res.data)
          message.success("successfully Deleted");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  
  export const Updatetransport = ({ id, ...creds }) => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
    baseUrl
      .patch('api/transportation/' + id, 
      { ...creds },
       { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 200) {
          dispatch(transport_update({id, updatedtransport:res.data.transport}));
          message.success("successfully updated");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  