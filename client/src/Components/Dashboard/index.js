import React from "react";
import {
  PageHeader,
  Col,
  Row,
  Layout,
  Typography,
  Menu,
  Icon,
  Modal
} from "antd";
import Sidebar from "./Sidebar";
import AppAccounts from "./foods";
import AppCategories from "./AppCategories";
import { AppsList } from "../../shared";
import AppTheme from "./transportation";
import AppFeatures from "./AppFeatures";

class AppDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {},
      selectedKey: "appCategories",
      isCollapsed: false,
      isAppleModalOpen: false,
      isAndroidModalOpen: false
    };
  }

  changeTheme = (appName, selectedTheme) => {
    const app = AppsList.find(app => app.appName === appName);
    app.selectedTheme = selectedTheme;
    this.setState({ app });
  };

  changeProfRoute = key => this.setState({ selectedKey: key });

  openAndroidModal = () => this.setState({ isAndroidModalOpen: true });
  closeAndroidModal = () => this.setState({ isAndroidModalOpen: false });

  openAppleModal = () => this.setState({ isAndroidModalOpen: true });
  closeAppleModal = () => this.setState({ isAndroidModalOpen: false });

  componentDidMount() {
    const app = AppsList.find(app => app.appName === "Mobile App Admin Panal");
    this.setState({
      app
    });
  }

  collapseSidebar = broken => this.setState({ isCollapsed: broken });

  profRouteRenderer = () => {
    const { app } = this.state;
    const { selectedKey } = this.state;
    if (selectedKey === "appCategories") return <AppCategories app={app} />;
    if (selectedKey === "appAccounts") return <AppAccounts app={app} />;
    if (selectedKey === "appTheme") return <AppTheme app={app} />;
    if (selectedKey === "appFeatures") return <AppFeatures app={app} />;
    if (selectedKey === "appOrder") return <AppAccounts app={app} />;

  };

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Row style={{ marginBottom: "5px" }}>
          <Col span={18}>
            <PageHeader
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px"
              }}
              onBack={() => this.props.history.goBack(1)}
              title={
                <Typography.Text>{this.state.app.appName}</Typography.Text>
              }
            />
          </Col>
          <Col
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "white"
            }}
            span={6}
          >
          </Col>
        </Row>
        <Layout>
          <Layout.Sider
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsed={this.state.isCollapsed}
            onBreakpoint={this.collapseSidebar}
          >
            <Sidebar
              selectedTheme={this.state.app.selectedTheme}
              changeProfRoute={this.changeProfRoute}
            />
          </Layout.Sider>
          <Layout.Content style={{ marginLeft: "5px" }}>
            {this.profRouteRenderer()}
          </Layout.Content>
        </Layout>
        <Modal
          title="Android"
          visible={this.state.isAndroidModalOpen}
          onCancel={this.closeAndroidModal}
        />
        <Modal
          title="IOS"
          visible={this.state.isAppleModalOpen}
          onCancel={this.closeAppleModal}
        />
      </div>
    );
  }
}

// const AppDetail = ()=><h1>App Detail</h1>
export default AppDetail;
