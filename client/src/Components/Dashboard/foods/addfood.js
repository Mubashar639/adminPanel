
import React from "react";
import {
  Modal,
  Input,
  Select, DatePicker
} from "antd";
import { connect } from "react-redux"
import { Createfood } from "../../../Redux/Epics/food"
const { Option } = Select

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "sadfa",
      price: "asdfa",
      photo: ""
    };
  }
  cancelHandler = () => {
    this.resetSate();
    this.props.closeModal();
  };

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

  onOk = (value) => {
    this.setState({ visitTime: value });
  }


  onOkHandler = () => {
    console.log(this.state)
    // const form = new FormData();
    // form.append("name", this.state.name);
    // // form.append("price", this.state.price)
    // // form.append("photo", this.state.photo)
    // console.log(form)
    
    this.props.dispatch(
      Createfood({...this.state})
    );
    this.resetSate();
  };

  resetSate = () =>
    this.setState({
      name: "",
      pirce: "",
      photo: "",

    })
  render() {
    // console.log(this.state.securityLevel)
    return (
      <div>
        <Modal
          visible={this.props.isModalOpen}
          onCancel={this.cancelHandler}
          title="Add New Food"
          destroyOnClose={true}
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
export default connect(null, null)(AddCategory)