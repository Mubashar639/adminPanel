


import React from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker
} from "antd";
import { Updateorders } from "../../../Redux/Epics/orderapic";
import { connect } from "react-redux"

const { Option } = Select
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderTrack: "",
      orderTrackValues: ["processing", "dispatched", "delivered", "toCustomer"],
      order: "",
      orderValues: ["pending", "completed", "cancled", "toCustomer"],
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        orderTrack: nextProps.category.orderTrack,
        order: nextProps.category.order,
        id: nextProps.category._id
      };
    }
    return prevState;
  }



  resetSate = () =>
    this.setState({
      orderTrack: "",
      orderTrackValues: ["processing", "dispatched", "delivered", "toCustomer"],
      order: "",
      orderValues: ["pending", "completed", "cancled", "toCustomer"],

      isModalInitialized: false

    });
  inputChangehandler = e => this.setState({ [e.target.name]: e.target.value });
  onSellect = (e) => {
    this.setState({
      orderTrack: e
    })

  }


  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
  onOkHandler = () => {
    this.props.dispatch(
      Updateorders({
        ...this.state
      })
    );
    this.resetSate();
    this.props.closeEditModal();
  };
  onSellector = (e) => {
    // console.log(e)
    this.setState({
      order: e
    })
  }
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
          <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-around" }}>
            <div>
              <h3>  Select Order Status </h3>
              <Select style={{ width: "200px" }} onSelect={this.onSellect} name="orderTrack" defaultValue={this.state.orderTrack}>
                {this.state.orderTrackValues.map((item, key) => (
                  <Option value={item} key={key}>{item}</Option>
                ))}

              </Select>
            </div>
            <div>
              <h3>  Select order Track Status </h3>
              <Select style={{ width: "200px" }} onSelect={this.onSellector} name="order" defaultValue={this.state.order}>
                {this.state.orderValues.map((value, index) => (
                  <Option value={value} key={index}>{value}</Option>
                )
                )}
              </Select>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(EditCategory);
