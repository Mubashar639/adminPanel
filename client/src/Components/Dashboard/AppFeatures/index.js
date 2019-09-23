import React from "react";
import { Row, Col, Typography, Button, Divider, Table } from "antd";
import { CategoriesModel } from "../../../shared";

import EditCategory from "./editOder";
import {connect} from "react-redux"
import {Getorders ,Deleteorders} from "../../../Redux/Epics/orderapic"
// import { deleteFacility } from "../../../../../../android3/android/servers/order server/controllers/ficilityController";

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
    Getorders()
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

  tableColumns = [
    {
      key: "orderNumber",
      title: "orderNumber",
      dataIndex: "orderNumber"
    },
    {
      key: "orderTrack",
      title: "orderTrack",
      dataIndex: "orderTrack"
    },
    {
      key: "orderDelete",
      title: "orderDelete",
      render: (text, record) => (
        <span>
          {record.orderDelete? 
          <span>deleted</span>:<span>not deleted</span>}
        </span>
      ),
    },
    {
      key: "order",
      title: "order",
      dataIndex: "order"
    },
   
    {
      title: 'orderDetail',
      key: 'orderDetail',
      render: (text, record) => (<span style={{display:"flex",flexDirection:'row'}} >
      {record.orderDetail.map((value,index)=> <span >
        {console.log(value)}
          <img style={{width:"50px"}} src={`http://localhost:5000/uploads/${value[0].image}`}/>
          <div>{value[0].name}</div>
      </span>)}</span>
      ),
    },
     {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={this.onRowClickHandler(record)}> Edit </a>
        <Divider type="vertical" />
        <a onClick={()=>this.props.dispatch(
          Deleteorders(record._id)
        )}>Delete</a>
      </span>
    ),
  },

  ];
// facilities
  render() {
    console.log(this.props.order)
    return (
      <div>
        <Row>
          <Col span={24}>
            <Typography.Title>My Order</Typography.Title>
          </Col>
          <Col>
            <Divider />
          </Col>
        </Row>
      
        <Row gutter={16}>
          <Col>
         {this.props.order ?  <Table
              dataSource={this.props.order.orders}
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
  order: state.Order
});
// export default AppCategories;
export default connect(mapStateToProps)(AppCategories);
