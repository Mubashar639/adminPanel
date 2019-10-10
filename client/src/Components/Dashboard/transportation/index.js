import React from "react";
import { Row, Col, Typography, Button, Divider, Table, Input } from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./addTransportaion";
import EditCategory from "./editTranportation";
import { connect } from "react-redux"
import { GetTranport, DeleteTranport } from "../../../Redux/Epics/transportation"

class AppCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpan: false,
      categoriesModel: new CategoriesModel(),
      categoryToEdit: {},
      transports: [],
      filtertransports: []

    };
  }
  componentDidMount() {
    this.props.dispatch(
      GetTranport()
    );
  }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.transport !== this.props.transport) {
      this.setState({
        transports: this.props.transport.transports,
        filtertransports:this.props.transport.transports
      }, () => console.log(this.state.transpors))
    }
  }

  addCategory = category => {
    // adding new Category
    category.appName = this.props.app.appName;
    this.state.categoriesModel.addNewCategory(category);
    this.closeModal();
  };
  closeModal = () => this.setState({ isModalOpen: false });
  openModal = () => this.setState({ isModalOpen: true });

  openEditModal = () => this.setState({ isEditModalOpan: true });
  closeEditModal = () => this.setState({ isEditModalOpan: false });

  // shouldComponentUpdate(nextprops){
  //   if(nextprops.facility != this.props.facility){
  //     return true
  //   }else  return false
  // }
  onRowClickHandler = (category) => () => {
    this.setState({ categoryToEdit: category, isEditModalOpan: true });
  }

  //   facilities: []
  // name: "kjfaljdf"
  // operationDays: "2019-09-15T12:42:02.188Z"
  // phone: 36849756
  // pickUpLocation: {type: "point", coordinates: Array(2)}
  // ticketPrice: 1345
  tableColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone"
    },
    {
      key: "pickUpLocation",
      title: "Pickup Location",
      render: (text, record) => (
        <span>
          {record.pickUpLocation.map(value => <a > {value}  </a>)}
        </span>)
    },
    {
      key: "facilities",
      title: "Facilities",
      render: (text, record) => (
        <span>
         
          {record.facilities.map((value,index) => <a > {index+1+ " "+value+"  "} </a>)}
        </span>)
    },
    {
      key: "operationDays",
      title: "Operation Days",
      render: (text, record) => (
        <span>
         
          {record.operationDays.map((value,index) => <a > {index+1+ " "+value+"  "} </a>)}
        </span>)
    },
    {
      key: "ticketPrice",
      title: "Ticket Price",
      render: (text, record) => (
        <span>
          <a>{record.ticketPrice.price}</a>
        </span>)
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.onRowClickHandler(record)}> Edit </a>
          <Divider type="vertical" />
          <a onClick={() => this.props.dispatch(
            DeleteTranport(record._id)
          )}>Delete</a>
        </span>
      ),
    },

  ];
  onChangePrice = (e) => {
    let value = e.target.value
    const transports= [...this.state.filtertransports]
    const array=[...transports]
    const transport = array.filter((transport) => {
      if (transport.name.includes(value)) {
        return transport
      }
    })
    if (value) {
      this.setState({ transports: transport })
    }else
   {
      this.setState({ transports: array })
    }
  }
  // facilities
  render() {
    // console.log(this.props.transport)
    let { transports } = this.state

    return (
      <div>
        <Row>
          <Col span={24}>
            <Typography.Title>My Transportation</Typography.Title>
          </Col>
          <Col>
            <Divider />
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col style={{ marginTop: "5px" }}>
            <Button
              onClick={this.openModal}
              shape="circle"
              size="large"
              type="primary"
              icon="plus"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col>
            <Input placeholder="Enter name for Search"
              style={{ width: "300px" }} name="price"  onChange={this.onChangePrice} />
            {this.props.transport ? <Table
              dataSource={transports}
              pagination={false}
              columns={this.tableColumns}
              rowKey={record => record._id}
            // onRow={(record) => ({
            //   onClick: this.onRowClickHandler(record)
            // })}
            /> :
              <h1>No data</h1>
            }
          </Col>
        </Row>
        <AddCategory
          closeModal={this.closeModal}
          isModalOpen={this.state.isModalOpen}
          addCategory={this.addCategory}
          currencyVariationList={
            this.state.categoriesModel.currencyVariationList
          }
        />
        <EditCategory
          isEditModalOpen={this.state.isEditModalOpan}
          closeEditModal={this.closeEditModal}
          category={this.state.categoryToEdit}
          currencyVariation={this.state.categoriesModel.currencyVariation}
          editCategory={this.state.categoriesModel.editCategory}
          currencyVariationList={
            this.state.categoriesModel.currencyVariationList
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  facility: state.Facility,
  transport: state.Transport
});
// export default AppCategories;
export default connect(mapStateToProps)(AppCategories);
