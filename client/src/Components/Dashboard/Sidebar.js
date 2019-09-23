import React from "react";
import { Menu, Icon } from "antd";
const Sidebar = props =>(
  <Menu
    mode="inline"
    onSelect={({ key }) => props.changeProfRoute(key)}
    style={{ height: "100%" }}
    theme={props.selectedTheme}
    defaultSelectedKeys={["appCategories"]}
  >
    <Menu.Item key="appCategories">
      <Icon type="file-search" />
      <span className="nav-text"> Facilities </span>
    </Menu.Item>
    <Menu.Item key="appTheme">
      <Icon type="bg-colors" />
      <span className="nav-text"> Tranportation </span>
    </Menu.Item>
    <Menu.Item key="appAccounts">
      <Icon type="user" />
      <span className="nav-text"> Product </span>
    </Menu.Item>
    <Menu.Item key="appFeatures">
      <Icon type="ordered-list" />
      <span className="nav-text"> Order </span>
    </Menu.Item>
    
    {/* <Menu.Item key="appOder">
      <Icon type="bg-colors" />
      <span className="nav-text"> Order </span>
    </Menu.Item> */}
  </Menu>
);

export default Sidebar;
