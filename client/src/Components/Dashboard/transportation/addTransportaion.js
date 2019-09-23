
import React from "react";
import {
  Modal,
  Input,
  Select, DatePicker, Checkbox
} from "antd";
import { connect } from "react-redux"
import { CreateTransport } from "../../../Redux/Epics/transportation"
const { Option } = Select
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple', 'Orange'];

const CheckboxGroup = Checkbox.Group;
class AddCategory extends React.Component {
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
    }
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
      CreateTransport({
        ...this.state
      })
    );
    this.resetSate();
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
      plainOptions: []

    })

  onSellectorPostion = (e) => {
    let pickUpLocation = { ...this.state.pickUpLocation }
    pickUpLocation.type = e
    this.setState({
      pickUpLocation
    })
  }
  render() {
    console.log(this.state)
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
              <h3> Tranport Name</h3>
              <Input placeholder="Enter your transport name" name="name"
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
              <Input placeholder="Enter your Phone"
                name="phone" allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3>  operation Days </h3>
              <Input placeholder="Enter your facility visit days"
                name="operationDays" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>

            <div>
              <h3>  Select Age </h3>
              <div style={{ display: "flex", flexDirection: "row" }}>  <Select style={{ width: "200px" }} onSelect={this.onSellector} name="ticketPrice" defaultValue={this.state.ticketPrice.type}>
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
export default connect(mapStateToProps, null)(AddCategory)