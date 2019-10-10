import React from "react";
import { Row, Col, Typography, Button, Divider, Table ,Input} from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./addfood";
import EditCategory from "./editfood";
import {connect} from "react-redux"
import {Getfood,Deletefood} from "../../../Redux/Epics/food"
import { Url } from "../../../shared";

// import { deleteFacility } from "../../../../../../android3/android/servers/order server/controllers/ficilityController";

class ApFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpan: false,
      categoriesModel: new CategoriesModel(),
      categoryToEdit: {},
      categories: [],
      filterfoods:[],
      food:[],
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
  
    this.setState({ categoryToEdit: category, isEditModalOpan: true });
  }
 
  onChangePrice = (e) => {
    let value = e.target.value
    const transports= [...this.state.filterfoods]
    const array=[...transports]
    const transport = array.filter((transport) => {
      if (transport.name.includes(value)) {
        return transport
      }
    })

    if (value) {
  
      this.setState({ foods: transport })
    } else {
      this.setState({ foods: transports })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.food !== this.props.food) {
      this.setState({
        foods: this.props.food.foods,
        filterfoods:this.props.food.foods
      })
    }
  }

  tableColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price"
    },
    {
      key: "category",
      title: "Category",
      render: (text, record) => (
        <span>
         { record.path[0].split("/")[1]}
        </span>
      ),
    },
    {
      key: "subcategory",
      title: "Sub Category",
      // title: "Category",
      render: (text, record) => (
        <span>
         { record.path[0].split("/")[2]}
        </span>
      ),
    },
    {
      title: 'Image',
      key: 'image',
      render: (text, record) => (
        <span>
          <img style={{width:"100px"}} src={`${Url}/uploads/${record.image}`}/>
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
    // console.log(this.props.food)
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
          <Input placeholder="Enter name for Search"
              style={{ width: "300px" }} name="price"  onChange={this.onChangePrice} />
         {this.props.food ?  <Table
              dataSource={this.state.foods}
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
