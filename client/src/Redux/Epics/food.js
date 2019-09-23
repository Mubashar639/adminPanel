import {
    // transport_failed,
    
  
    food_success,
    food_add,
    food_remove,
    food_update
    // transport_create,
  
  } from "../Actions/authentication";
  
  import { message } from "antd";
  import { baseUrl } from "../../shared";
  
  
  export const Getfood = () => dispatch => {
  
    baseUrl
      .get('api/food')
      .then(res => {
        if (res.status === 200) {

          dispatch(food_success(res.data.foods));
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
  
  
  export const Createfood = creds => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());

  const form = new FormData();
    form.append("name", creds.name);
    form.append("price",creds.price)
    form.append("photo",creds.photo)

    const token = localStorage.getItem("token");
  
    baseUrl
      .post('api/food',
        form
      , { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 201) {
          console.log(res.data)
          dispatch(food_add(res.data.food));
          message.success("photo added");
        } else {
          message.error(res.message);
          // console.log(res)
        }
      })
      .catch((err) => {
        message.error(err.message);
        // dispatch(login_failed("Some thing went wrong"));
        // console.log(err)
      });
  };
  
  export const Deletefood = creds => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const token = localStorage.getItem("token");
    baseUrl
      .delete('api/food/' + creds, { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 204) {
          dispatch(food_remove(creds));
          console.log(res.data)
          message.success("successfully Deleted");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  
  export const Updatefood = ({ id, ...creds }) => dispatch => {
    // const {email,password}=creds
    // dispatch(login_loading());
    const form = new FormData();
    form.append("name", creds.name);
    form.append("price",creds.price)
    form.append("photo",creds.photo)
    const token = localStorage.getItem("token");
    baseUrl
      .patch('api/food/' + id, 
      form,
       { headers: { "Authorization": `Bearer ${token}` } }
      )
      .then(res => {
        if (res.status === 200) {
          dispatch(food_update({id, updatedfood:res.data.food}));
          message.success("successfully updated");
        }
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err)
      });
  };
  