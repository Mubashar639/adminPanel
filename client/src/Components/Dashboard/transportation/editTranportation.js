
import React from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker,Checkbox
} from "antd";

import { Updatetransport } from "../../../Redux/Epics/transportation";
import { connect } from "react-redux"
import moment from "moment"
const CheckboxGroup = Checkbox.Group;

const { Option } = Select
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      facilities: [],
      ticketPrice: {
        type: "aldult",
        price: "",
      },
      operationDays: "",
      pickUpLocation: {
        type: "",
        coordinates: [],

      },

      indeterminate: true,
      checkAll: false,
      plainOptions: []
    
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        name: nextProps.category.name,
        facilities: nextProps.category.facilities,
        ticketPrice: nextProps.category.ticketPrice,
        operationDays: nextProps.category.operationDays,
        pickUpLocation: nextProps.category.pickUpLocation,
        phone: nextProps.category.phone,
        id: nextProps.category._id
      };
    }
    return prevState;
  }



  resetSate = () =>
    this.setState({
      id: "",
      name: "",
      phone: "",
      facilities: [],
      ticketPrice: {
        type: "aldult",
        price: "",
      },
      operationDays: "",
      pickUpLocation: {
        type: "",
        coordinates: [],

      },

      indeterminate: true,
      checkAll: false,
      plainOptions: [],
      isModalInitialized: false

    });
    cancelHandler = () => {
      this.resetSate();
      this.props.closeEditModal();
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
  
    componentDidMount() {
      const plainOptions = this.props.facility && this.props.facility.facilities.map((facility) => facility.name)
      this.setState({
        plainOptions
      })
    }
  
    onChangeTime = (value, dateString) => {
      this.setState({ visitTime: value });
  
    }
  
    onOk = (value) => {
      this.setState({ visitTime: value });
    }
    onCheck = facilities => {
      this.setState({
        facilities,
        indeterminate: !!facilities.length && facilities.length < facilities.length,
        checkAll: facilities.length === this.state.plainOptions.length,
      });
    };
  
    onOkHandler = () => {
      this.props.dispatch(
        Updatetransport({
          ...this.state
        })
      );
      this.resetSate();
      this.props.closeEditModal()
    };
    onSellector = (e) => {
      let ticketPrice = { ...this.state.ticketPrice };
      ticketPrice.type = e;
  
      this.setState({
        ticketPrice
      })
    }
    onChangePrice = (e) => {
      let ticketPrice = { ...this.state.ticketPrice };
      const name = e.target.name;
      const value = e.target.value;
      ticketPrice[name] = value
      this.setState({
        ticketPrice
      })
    }
    onChangePosition = (e) => {
      let pickUpLocation = { ...this.state.pickUpLocation }
      let longi, lati = ""
      let coordinates = [...this.state.pickUpLocation.coordinates]
  
      if (e.target.name === "longi") {
        longi = e.target.value
        coordinates[0] = longi
      } else {
        lati = e.target.value
        coordinates[1] = lati
      }
      pickUpLocation.coordinates = coordinates
      this.setState({
        pickUpLocation
      })
    }
    resetSate = () =>
      this.setState({
        name: "",
        phone: "",
        facilities: [],
        ticketPrice: {
          type: "aldult",
          price: "",
        },
        operationDays: "",
        pickUpLocation: {
          type: "",
          coordinates: [],
  
        },
  
        indeterminate: true,
        checkAll: false,
        plainOptions: [],
        isModalInitialized: false,
  
      })
  
    onSellectorPostion = (e) => {
      let pickUpLocation = { ...this.state.pickUpLocation }
      pickUpLocation.type = e
      this.setState({
        pickUpLocation
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
              <h3> Tranport Name</h3>
              <Input placeholder="Enter your transport name" name="name" value={this.state.name}
                allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3> Select you Facilities </h3>
              <CheckboxGroup
                options={this.state.plainOptions}
                value={this.state.facilities}
                onChange={this.onCheck}
              />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row",
            alignItem: "center", justifyContent: "space-around"
          }}>
            <div>
              <h3> Phone</h3>
              <Input placeholder="Enter your Phone" value={this.state.phone}
                name="phone" allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3>  operation Days </h3>
              <Input placeholder="Enter your facility visit days" value={this.state.operationDays}
                name="operationDays" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>

            <div>
              <h3>  Select Age </h3>
              <div style={{ display: "flex", flexDirection: "row" }}>  <Select style={{ width: "200px" }} onSelect={this.onSellector} name="ticketPrice" value={this.state.ticketPrice.type}>
                <Option value="adult">aldult</Option>
                <Option value="child">child</Option>
              </Select>
                <Input placeholder="Enter Price" value={this.state.ticketPrice.price}
                  name="price" allowClear onChange={this.onChangePrice} />
              </div>
            </div>

          </div>
          <div style={{ display: "flex" }}>
            <div>
              <h3>  Select Location Type </h3>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Select style={{ width: "100px" }} onSelect={this.onSellectorPostion} name="type" defaultValue={this.state.pickUpLocation.type}>
                  <Option value="point">Point</Option>
                  <Option value="line">line</Option>
                </Select>
                <Input placeholder="enter logitute" value={this.state.pickUpLocation.coordinates[0]}
                  name="longi" allowClear onChange={this.onChangePosition} />
                <Input placeholder="Enter latitute" value={this.state.pickUpLocation.coordinates[1]}
                  name="lati" allowClear onChange={this.onChangePosition} />
              </div>
            </div>
          </div>
         </Modal>
         </div>
    );
  }
}
const mapStateToProps = state => ({
  facility: state.Facility,
});
export default connect(mapStateToProps)(EditCategory);
