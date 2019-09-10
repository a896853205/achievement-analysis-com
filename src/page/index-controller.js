import React from "react";

import "../style/index-controller.css";
// 路由
import { Link } from "react-router-dom";
import { LOGIN } from "../constants/route-constants";

import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button } from "antd";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class IndexController extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header className="header">
          <Col span={3}>
            <div>这里是LOGO</div>
          </Col>
          <Col span={8}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
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
      </Layout>
    );
  }
}
export default IndexController;
