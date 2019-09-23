import React from "react";
import { Row, Col, Typography, Button, Divider, Table } from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./addTransportaion";
import EditCategory from "./editTranportation";
import {connect} from "react-redux"
import {GetTranport,DeleteTranport} from "../../../Redux/Epics/transportation"

class AppCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpan: false,
      categoriesModel: new CategoriesModel(),
      categoryToEdit: {},
      categories: []
    };
  }
componentDidMount(){
  this.props.dispatch(
    GetTranport()
  );
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
  onRowClickHandler = (category)=>()=>{
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
      title: "phone",
      dataIndex: "phone"
    },
    {
      key: "pickUpLocation",
      title: "pickUpLocation",
      render: (text, record) => (
        <span>
          {console.log(record)}
          {record.pickUpLocation.coordinates.map(value=> <a > {value}  </a>)}
        </span>)
    },
    {
      key: "facilities",
      title: "facilities",
      dataIndex: "facilities"
    },
    {
      key: "operationDays",
      title: "operationDays",
      dataIndex: "operationDays"
    },
    {
      key: "ticketPrice",
      title: "ticketPrice",
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
        <a onClick={()=>this.props.dispatch(
          DeleteTranport(record._id)
        )}>Delete</a>
      </span>
    ),
  },

  ];
// facilities
  render() {
    console.log(this.props.transport)
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
         {this.props.transport ?  <Table
              dataSource={this.props.transport.transports}
              pagination={false}
              columns={this.tableColumns}
              rowKey={record => record._id}
              // onRow={(record) => ({
              //   onClick: this.onRowClickHandler(record)
              // })}
            />:
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
  transport:state.Transport
});
// export default AppCategories;
export default connect(mapStateToProps)(AppCategories);
