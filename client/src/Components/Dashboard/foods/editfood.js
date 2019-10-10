


import React from "react";
import {
  Modal,
  Input,
  Select,
  DatePicker
} from "antd";
import { Updatefood } from "../../../Redux/Epics/food";
import { connect } from "react-redux"
const { Option } = Select
const { TextArea } = Input;
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photo:"",
      price:"",
      id:"",
      category: "select category",
      path: "select Subcategory",
      description:""
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        name: nextProps.category.name,
        price: nextProps.category.price,
        photo: nextProps.category.image,
        category: nextProps.category.path[0].split('/')[1],
        subcategory: nextProps.category.path[0].split('/')[2],
        description: nextProps.category.description,


        id: nextProps.category._id
      };
    }
  
    return prevState;
  }


  onOkHandler = () => {
    console.log(this.state)
    // const form = new FormData();
    // form.append("name", this.state.name);
    // // form.append("price", this.state.price)
    // // form.append("photo", this.state.photo)
    // console.log(form)
    
    this.props.dispatch(
        Updatefood({...this.state})
    );
    this.resetSate();
    this.props.closeEditModal()
  };


  resetSate = () =>
    this.setState({
      id: "",
      name: "",
      price: "",
      photo:"",
      category:"",
      subcategory:"",
      isModalInitialized: false

    });

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    this.setState({
      [name]: value
    })
  };
  onsubcate = (e) => {
    // console.log(e)

    let array = []
    array.push(e)
    this.setState({ path: array })
  }
  onSellector = (e) => {


    const selectedCategory = this.props.categorymy.filter(item => item.path === e)
    this.setState({
      category: selectedCategory[0],
      path: "select Subcategory"
    }, () => console.log(this.state.category))
  }
  filehandler = (e) => {
    // const files = Array.from(e.target.files)
    const photo = e.target.files[0]
    this.setState({photo})
  }

  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
    
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
        > <div style={{
          display: "flex", flexDirection: "row", alignItem: "center",
          justifyContent: "space-around"
        }}>
          <div>
              <h3> Select Category </h3>
              <Select style={{ width: "200px" }} onSelect={this.onSellector} name="category" defaultValue={this.state.category}>
                {
                  this.props.categorymy.map((item, key) => {
                    if (item.isRoot) {
                      return (
                        <Option key={key} value={item.path}>{item.name}</Option>
                      )
                    }
                  })
                }
              </Select>
            </div>
            <div>
              {/* "select category" */}
               <div>
                <h3> Select Sub Category </h3>
                <Select style={{ width: "200px" }} onSelect={this.onsubcate} name="subcategory" defaultValue={this.state.subcategory}>
                  { this.state.category.children&&
                    this.state.category.children.map((item, key) => {
                      return (
                        <Option key={key} value={item}>{item.split("/")[2]}</Option>
                      )
                    })
                  }
                </Select>
              </div>
            </div>
        </div>
           <div style={{
            display: "flex", flexDirection: "row", alignItem: "center",
            justifyContent: "space-around"
          }}>
            <div>
              <h3> food name</h3>
              <Input placeholder="Enter your facility name" name="name" value={this.state.name}
                allowClear onChange={this.onChange} />
            </div>
            <div>
              <h3> Price</h3>
              <Input placeholder="Enter your facility adress" value={this.state.price}
                name="price" allowClear onChange={this.onChange} />
            </div>
          </div>
          <div>
          <div style={{
              display: "flex", flexDirection: "row", 
              justifyContent: "space-around", alignItems:"center"
            }}>
              <div>
                <h3> food Description</h3>
                <TextArea placeholder="Enter your food description" style={{width:"200px", height:"150px"}} name="description" value={this.state.description}
                  allowClear onChange={this.onChange} />
              </div>
            {/* <input type="file" name="myImage" accept="image/*" /> */}
            <input type="file" ref="image" name="photo" accept="image/*"  onChange={this.filehandler} />
          </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  categorymy: state.Category.category
})
export default connect(mapStateToProps, null)(EditCategory);
