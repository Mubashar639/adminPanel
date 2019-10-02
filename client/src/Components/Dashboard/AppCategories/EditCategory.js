


import React from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker,Checkbox
} from "antd";

import { UpdateFacilities } from "../../../Redux/Epics/facilities";
import { connect } from "react-redux"
import moment from "moment"
const CheckboxGroup = Checkbox.Group;

const { Option } = Select
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone: "",
      sexValues: ["male", "female"],
      sexType: "male",
      securityLevel: "low",
      securityvalues: ["low", "medium", "mar"],
      day: ['Monday', 'Tuesday', 'Wendsday', 'Thursday', "Friday", 'SatureDay', "Sunday"],
      
      visitationDays:[], 
      visitTime: "",
      requirementForVisitation: ""
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        name: nextProps.category.name,
        visitationDays: nextProps.category.visitationDays,
        visitTime: nextProps.category.visitTime,
        requirementForVisitation: nextProps.category.requirementForVisitation,
        address: nextProps.category.address,
        phone: nextProps.category.phone,
        sexType: nextProps.category.sexType,
        id: nextProps.category._id
      };
    }
    return prevState;
  }



  resetSate = () =>
    this.setState({
      id: "",
      name: "",
      address: "",
      phone: "",
      sexValues: ["male", "female"],
      sexType: "male",
      securityLevel: "low",
      securityvalues: ["low", "medium", "mar"],
      visitationDays: "",
      visitTime: "",
      requirementForVisitation: "",
      isModalInitialized: false

    });
  inputChangehandler = e => this.setState({ [e.target.name]: e.target.value });
  onSellect = (e) => {
    this.setState({
      securityLevel: e
    })

  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    this.setState({
      [name]: value
    })
  };



  onChangeTime = (value, dateString) => {
    this.setState({ visitTime: value });

  }
  selectedDays = visitationDays => {
    this.setState({
      visitationDays,
      indeterminate: !!visitationDays.length && visitationDays.length < visitationDays.length,
      checkAll: visitationDays.length === this.state.day.length,
    });
    // console.log(visitationDays)
  };
  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
  onOkHandler = () => {
    this.props.dispatch(
      UpdateFacilities({
        ...this.state
      })
    );
    this.resetSate();
    this.props.closeEditModal();
  };
  onSellector = (e) => {
    // console.log(e)
    this.setState({
      sexType: e
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
          <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>
            <div>
              <h3> facility name</h3>
              <Input placeholder="Enter your facility name" name="name" value={this.state.name}
                allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3> address</h3>
              <Input placeholder="Enter your facility adress"
                name="address" allowClear onChange={this.onChange} value={this.state.address} />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row",
            alignItem: "center", justifyContent: "space-around"
          }}>
            <div>
              <h3> Phone</h3>
              <Input placeholder="Enter your Phone"
                name="phone" allowClear onChange={this.onChange} value={this.state.phone} />
            </div>
            <div style={{width:"300px"}}>
            <h3> Select you Visitation days </h3>
              <CheckboxGroup
                options={this.state.day}
                value={this.state.visitationDays}
                onChange={this.selectedDays}
              />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>
            <div>
              <h3>  visitation time </h3>
              <DatePicker showTime placeholder="Select Time" 
              defaultValue={moment(this.state.visitTime, 'YYYY-MM-DD')} 
               onChange={this.onChangeTime} onOk={this.onOk} />

            </div>
            <div>
              <h3>  Requirment for Visitation </h3>
              <Input placeholder="Enter your facility Requirement For Visitation"
                name="requirementForVisitation" allowClear onChange={this.onChange} value={this.state.requirementForVisitation} />
              <div style={{ display: 'flex', marginTop: "10px", justifyContent: "space-around" }}>
              </div>
            </div>
            <div>
              <h3>  Select Gander </h3>
              <Select style={{ width: "200px" }} onSelect={this.onSellector} name="sextype" defaultValue={this.state.sexType}>
                <Option value="male">male</Option>
                <Option value="female">Female</Option>
              </Select>
            </div>
            <div>
              <h3>  Select Security Leve </h3>
              <Select style={{ width: "200px" }} onSelect={this.onSellect} name="securityLevel" defaultValue={this.state.securityLevel}>
                {this.state.securityvalues.map((item, key) => (
                  <Option value={item} key={key}>{item}</Option>
                ))}

              </Select>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(EditCategory);
