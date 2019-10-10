import React from "react";
import { PageHeader, Button, Form, Row, Col, Input, Tree, Spin } from "antd";
import { getCategories, postRootCategory, addChildCat } from "./Epics";
import {get_category} from "../../../Redux/Actions/authentication"
import {connect} from "react-redux"

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catName: "",
      selectedNode: null,
      tree: [],
      isLoading: false
    };
  }

  // getting initial list from server
  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      getCategories(data => this.setState({ tree: data, isLoading: false },()=>this.props.getCate(data)));
    });
  }

  //  adding sub category in the category

  addSubCatgory = () => {
    if (this.state.catName && this.state.selectedNode) {
      this.setState({ isLoading: true }, () => {
        addChildCat(
          this.state.selectedNode.path,
          {
            name: this.state.catName,
            path: this.state.selectedNode.path + "/" + this.state.catName,
            children: []
          },
          data => this.setState({ tree: data, isLoading: false },()=>this.props.getCate(data))
        );
      });
    }else{ alert ("Please Select the node and enter subCategory name ")}
  };
  // ............................................>

  // adding sibling category in the category list
  addSiblingCategory = () => {
    if (this.state.catName && this.state.selectedNode) {
      const parentPath = this.getParent(this.state.selectedNode);
      if (parentPath === "") {
        this.setState({ isLoading: true }, () => {
          this.postRootCat();
        });
      } else {
        this.setState({ isLoading: true }, () => {
          addChildCat(
            parentPath,
            {
              name: this.state.catName,
              path: this.state.selectedNode.path + "/" + this.state.catName,
              children: []
            },
            data => this.setState({ tree: data, isLoading: false },()=>this.props.getCate(data))
          );
        });
      }
    } else { alert ("Please enter category name")}
  };
  // ............................................>

  // adding roo category in the category list
  postRootCat = () => {
    if(this.state.catName ){
    this.setState({ isLoading: true }, () => {
      postRootCategory(
        {
          name: this.state.catName,
          path: "/" + this.state.catName
        },
        data => this.setState({ tree: data, isLoading: false, catName:"" },()=>this.props.getCate(data))
      );
    });
  }else { alert ("Please enter category name")}
};
  // ............................................>

  // category name change handler
  catNameChangeHandler = evt => {
    this.setState({ catName: evt.target.value });
  };
  // .............................>

  // getting root nodes from state
  getRootNodes = () => this.state.tree.filter(node => node.isRoot);
  // .......................................>

  // getting selected node by click it
  selectNode = (a, { node }) =>
 { console.log(node)
    this.setState({ selectedNode: node.props.target })};
  // .......................................>

  // getting child categories of a parent category
  getChildNodes = node => {
    if (!node.children) {
      return [];
    }
    return node.children.map(path => {
      if (this.state.tree.find(node => node.path === path)) {
        return this.state.tree.find(node => node.path === path);
      }
    });
  };
  // .........................................>

  // getting the parent path by clicking the child one
  getParent = node => node.path.slice(0, node.path.lastIndexOf("/"));
  // ...............................................>

  // Rendering sub tree using recursion
  RenderSubTree = props => {
    const { node } = props;
    return (
      <Tree.TreeNode key={node.name} target={node} title={node.name}>
        {this.getChildNodes(node).map(node =>
          this.RenderSubTree({ ...props, node: node })
        )}
      </Tree.TreeNode>
    );
  };
  // ...........................................

  // Rendering main tree component
  RenderTree = () => {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        <Tree onSelect={this.selectNode}>
          {rootNodes.map(node => this.RenderSubTree({ node: node }))}
        </Tree>
      </div>
    );
  };
  // ............................................>

  render() {
    return (
      <div>
        {/* <PageHeader
          style={{
            background: " #f8f8f8",
            borderTop: "1px solid #e3e3e3",
            borderBottom: "1px solid #e3e3e3",
          }}
          >
          </PageHeader> */}
        {/* <Row type="flex" justify="end">
          <Col span={4}>
            <Button type="danger">Save</Button>
          </Col>
        </Row> */}
        {this.state.tree.length !== 0 && (
          <Row>
            <Col style={{ marginTop: "10px" }}>
              <Button onClick={this.addSubCatgory} type="primary">
                Add SubCategory
              </Button>
            </Col>
          </Row>
        )}
        <Row>
          <Col style={{ marginTop: "10px" }}>
            <Button onClick={this.postRootCat} type="primary">
              Add Root Category
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            {this.state.isLoading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px"
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <this.RenderTree />
            )}
          </Col>
          <Col span={18}>
            <Form.Item
              required
              wrapperCol={{ span: 18 }}
              labelCol={{ span: 6 }}
              label="Category Name"
            >
              <Input
                onChange={this.catNameChangeHandler}
                value={this.state.catName}
                type="text"
                style={{ width: "60%" }}
                placeholder="Enter category name here"
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
  }
}

const  mapStateToProps = (state, ownProps) => {
  console.log(state.Category)
  return{
    category:state.Category.category
  }
}
const mapDispatchToProps = dispatch => ({
  getCate:(value)=>dispatch(get_category(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories) ;
