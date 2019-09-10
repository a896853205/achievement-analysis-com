import React from 'react';

// UI组件
import { Layout, Menu, Col } from "antd";
// 路由
import { Link } from "react-router-dom";
import { LOGIN, INDEX } from "../constants/route-constants"
// css
import '../style/header.css';
// 关于数据模块交互
import { connect } from "react-redux";

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
              >首页</Link>
            </Menu.Item>
            {
              this.props.user.uuid ?
                (<Menu.Item key="1">专业测评</Menu.Item>)
                :
                undefined
            }
            {
              this.props.user.uuid ?
                (<SubMenu
                  key="sub1"
                  title={
                    <span>
                      <span>志愿填报</span>
                    </span>
                  }
                >
                  <Menu.Item key="2">模拟填报</Menu.Item>
                  <Menu.Item key="3">正式填报</Menu.Item>
                </SubMenu>)
                :
                undefined
            }
            {
              this.props.user.uuid ?
                (<SubMenu
                  key="sub2"
                  title={
                    <span>
                      <span>新高考3+1+2</span>
                    </span>
                  }
                >
                  <Menu.Item key="4">高考政策</Menu.Item>
                  <Menu.Item key="5">高考快讯</Menu.Item>
                </SubMenu>)
                :
                undefined
            }
          </Menu>
        </Col>
        <Col span={1} offset={12}>
          {
            this.props.user.uuid ?
              (<span>{this.props.user.nickname}</span>)
              :
              (<Link
                to={{
                  pathname: `${LOGIN.path}`
                }}
              >登录</Link>)
          }
        </Col>
      </Header>
    );
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return {
    user,
  }
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderController);