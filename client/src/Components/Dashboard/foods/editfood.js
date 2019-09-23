


import React from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker
} from "antd";
import { Updatefood } from "../../../Redux/Epics/food";
import { connect } from "react-redux"

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photo:"",
      price:"",
      id:""
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        name: nextProps.category.name,
        price: nextProps.category.price,
        photo: nextProps.category.image,
        id: nextProps.category._id
      };
    }
    return prevState;
  }


  onOkHandler = () => {
    console.log(this.state)
    // const form = new FormData();
    // form.append("name", this.state.name);
    // // form.append("price", this.state.price)
    // // form.append("photo", this.state.photo)
    // console.log(form)
    
    this.props.dispatch(
        Updatefood({...this.state})
    );
    this.resetSate();
    this.props.closeEditModal()
  };


  resetSate = () =>
    this.setState({
      id: "",
      name: "",
      price: "",
      photo:"",
      isModalInitialized: false

    });

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    this.setState({
      [name]: value
    })
  };
  filehandler = (e) => {
    // const files = Array.from(e.target.files)
    const photo = e.target.files[0]
    this.setState({photo})
  }

  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
    
  render() {
    return (
      <div>
        <Modal
          visible={this.props.isEditModalOpen}
          onCancel={this.cancelHandler}
          title="Edit facility"
          maskClosable={false}
          width="80%"
          onOk={this.onOkHandler}
        >
           <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>
            <div>
              <h3> food name</h3>
              <Input placeholder="Enter your facility name" name="name" value={this.state.name}
                allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3> Price</h3>
              <Input placeholder="Enter your facility adress" value={this.state.price}
                name="price" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div>
            {/* <input type="file" name="myImage" accept="image/*" /> */}
            <input type="file" ref="image" name="photo" accept="image/*"  onChange={this.filehandler} />
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(EditCategory);
