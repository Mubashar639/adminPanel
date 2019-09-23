import React from "react";
import { Row, Col, Typography, Button, Divider, Table } from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./addfood";
import EditCategory from "./editfood";
import {connect} from "react-redux"
import {Getfood,Deletefood} from "../../../Redux/Epics/food"
// import { deleteFacility } from "../../../../../../android3/android/servers/order server/controllers/ficilityController";

class ApFood extends React.Component {
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
    Getfood()
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
    alert(category.image)
    this.setState({ categoryToEdit: category, isEditModalOpan: true });
  }

  tableColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "price",
      title: "price",
      dataIndex: "price"
    },
    {
      title: 'image',
      key: 'image',
      render: (text, record) => (
        <span>
          <img style={{width:"100px"}} src={`http://localhost:5000/uploads/${record.image}`}/>
        </span>
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
          Deletefood(record._id)
        )}>Delete</a>
      </span>
    ),
  },

  ];
// facilities
  render() {
    console.log(this.props.food)
    return (
      <div>
        <Row>
          <Col span={24}>
            <Typography.Title>My Foods</Typography.Title>
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
         {this.props.food ?  <Table
              dataSource={this.props.food.foods}
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
  food: state.Foods
});
// export default ApFood;
export default connect(mapStateToProps)(ApFood);
