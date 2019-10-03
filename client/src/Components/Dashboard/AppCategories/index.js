import React from "react";
import { Row, Col, Typography, Button, Divider, Table,Input } from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import {connect} from "react-redux"
import {GetFacilities,DeleteFacilities} from "../../../Redux/Epics/facilities"
// import { deleteFacility } from "../../../../../../android3/android/servers/order server/controllers/ficilityController";
import {createStructuredSelector} from "reselect"
import {FacilitySelector} from "../../../Redux/slector/facility"
class AppCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpan: false,
      categoriesModel: new CategoriesModel(),
      categoryToEdit: {},
      filterfacilities: [],
      facilities:[]
    };
  }
componentDidMount(){
  this.props.dispatch(
    GetFacilities()
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
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.facility !== this.props.facility) {
      this.setState({
        facilities: this.props.facility,
        filterfacilities:this.props.facility
      })
    }
  }
  onChangePrice = (e) => {
    let value = e.target.value
    const transports= [...this.state.filterfacilities]
    const array=[...transports]
    const transport = array.filter((transport) => {
      if (transport.name.includes(value)) {
        return transport
      }
    })

    if (value) {
  
      this.setState({ facilities: transport })
    } else {
      this.setState({ facilities: transports })
    }
  }
  tableColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address"
    },
    {
      key: "securityLevel",
      title: "Security Level",
      dataIndex: "securityLevel"
    },
    {
      key: "sexType",
      title: "Sex Type",
      dataIndex: "sexType"
    },
    {
      key: "visitationDays",
      title: "Visitation Days",
      render: (text, record) =>{
        return (
        <span>
          {record.visitationDays.map((value,index) => <a > {index+1+ " "+value+"  "} </a>)}
        </span>)}
    },
    
    {
      key: "visitTime",
      title: "Visit Time",
      dataIndex: "visitTime"
    },
     {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={this.onRowClickHandler(record)}> Edit </a>
        <Divider type="vertical" />
        <a onClick={()=>this.props.dispatch(
          DeleteFacilities(record._id)
        )}>Delete</a>
      </span>
    ),
  },

  ];
// facilities
  render() {
    // console.log(this.props.facility)
    return (
      <div>
        <Row>
          <Col span={24}>
            <Typography.Title>My Facilties</Typography.Title>
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
         {this.props.facility ?  <Table
              dataSource={this.state.facilities}
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
const mapStateToProps = createStructuredSelector({
  facility: FacilitySelector
});
// export default AppCategories;
export default connect(mapStateToProps)(AppCategories);
