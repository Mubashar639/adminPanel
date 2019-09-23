
import React from "react";
import {
  Modal,
  Input,
  Select, DatePicker
} from "antd";
import {connect} from "react-redux"
import {CreateFacilities} from "../../../Redux/Epics/facilities" 
const { Option } = Select

class AddCategory extends React.Component {
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
      visitationDays: "",
      visitTime: "",
      requirementForVisitation: ""
    };
  }
  cancelHandler = () => {
    this.resetSate();
    this.props.closeModal();
  };
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



  onChangeTime=(value, dateString)=> {
    this.setState({ visitTime: value });

  }

  onOk=(value) =>{
    this.setState({ visitTime: value });
  }


  onOkHandler = () => {
    this.props.dispatch(
      CreateFacilities({
        ...this.state
      })
    );
    this.resetSate();
  };
  onSellector = (e) => {
    // console.log(e)
    this.setState({
      sexType: e
    })
  }
  resetSate = () =>
    this.setState({
      name: "",
      address: "",
      phone: "",
      sexType: "",
      sexValues: ["male", "female"],
      securityLevel: "",
      securityvalues: ["low", "medium", "mar"],
      visitationDays: "",
      visitTime: "",
      requirementForVisitation: ""
    })
  render() {
    // console.log(this.state.securityLevel)
    return (
      <div>
        <Modal
          visible={this.props.isModalOpen}
          onCancel={this.cancelHandler}
          title="Add New Facility"
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
              <h3> facility name</h3>
              <Input placeholder="Enter your facility name" name="name"
                allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3> address</h3>
              <Input placeholder="Enter your facility adress"
                name="address" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row",
            alignItem: "center", justifyContent: "space-around"
          }}>
            <div>
              <h3> Phone</h3>
              <Input placeholder="Enter your Phone"
                name="phone" allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3>  visitation Days </h3>
              <Input placeholder="Enter your facility visit days"
                name="visitationDays" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>
            <div>
              <h3>  visitation time </h3>
              <DatePicker showTime placeholder="Select Time" onChange={this.onChangeTime} onOk={this.onOk} />

            </div>
            <div>
              <h3>  Requirment for Visitation </h3>
              <Input placeholder="Enter your facility Requirement For Visitation"
                name="requirementForVisitation" allowClear onChange={this.onChange}  />
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
export default connect(null, null)(AddCategory)