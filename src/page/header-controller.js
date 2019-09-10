import React from 'react';

// UI组件
import { Layout, Menu, Col } from "antd";
// 路由
import { Link } from "react-router-dom";
import { LOGIN, INDEX } from "../constants/route-constants"
// css
import '../style/header.css';

const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderController extends React.Component {
  render() {
    return (
      <Header className="header">
        <Col span={3}>
          <div>这里是LOGO</div>
        </Col>
        <Col span={8}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="0">
              <Link
                to={{
                  pathname: `/${INDEX.path}`
                }}
              >
              首页</Link>
            </Menu.Item>
            <Menu.Item key="1">专业测评</Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>志愿填报</span>
                </span>
              }
            >
              <Menu.Item key="2">模拟填报</Menu.Item>
              <Menu.Item key="3">正式填报</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>新高考3+1+2</span>
                </span>
              }
            >
              <Menu.Item key="4">高考政策</Menu.Item>
              <Menu.Item key="5">高考快讯</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={1} offset={12}>
          <Link
            to={{
              pathname: `${LOGIN.path}`
            }}
          >
            登录
          </Link>
        </Col>
      </Header>
    );
  }
}
export default HeaderController;