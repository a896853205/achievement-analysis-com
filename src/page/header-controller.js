import React from "react";
import { withRouter } from "react-router-dom";

// UI组件
import { Row, Menu, Col, Dropdown, Icon } from "antd";

// 路由
import { Link } from "react-router-dom";

// css
import "../style/header.css";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as userActions } from "../redux/user-model";

// 路由
import {
  PERSONAL,
  VOLUNTARY,
  BCG_ROOT_NAME,
  QUESTIONNAIRE,
  LOGIN,
  INDEX,
  REGISTER,
  BASIC,
  PASSWORD,
  MY_VOLUNTARY,
  SEARCH_SCHOOL,
  SEARCH_MAJOR
} from "../constants/route-constants";

const { SubMenu } = Menu;

class HeaderController extends React.Component {
  render() {
    let userMenu = (
      <Menu>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}`
            }}
          >
            修改个人
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}`
            }}
          >
            修改密码
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={{
              pathname: `/${BCG_ROOT_NAME}/${PERSONAL.path}/${MY_VOLUNTARY.path}`
            }}
          >
            我的志愿
          </Link>
        </Menu.Item>
        <Menu.Item onClick={this.handleSignOut}>注销</Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="gray-background">
          <div className="index-mini-header-box page-inner-width-box">
            <span>
              <span>全国服务热线:</span> <span>123-456-7890</span>
            </span>
            <ul className="index-mini-header-ul">
              <li>代理商加盟</li>
              <li>小程序</li>
              <li>微信</li>
              <li>手机APP</li>
              <li>帮助</li>
            </ul>
          </div>
        </div>
        <div className="index-logo-box page-inner-width-box">
          <div className="img-logo-box">
            <img
              className="img-logo"
              src="/images/header/logo-color.png"
              alt="logo"
            />
            <img
              className="img-title-logo"
              src="/images/header/title-logo-color.png"
              alt="文字logo"
            />
          </div>
          <div className="index-search-box">
            <input className="index-search-input" type="text" />
            <button className="index-search-button">
              <span className="search-bottom-top-text">搜索</span>
              <Icon
                className="search-bottom-bottom-text"
                style={{ fontSize: "25px", marginTop: "3px" }}
                type="search"
              />
            </button>
            <button className="index-search-button">
              <span className="search-bottom-top-text">开通</span>
              <span className="search-bottom-bottom-text">VIP</span>
            </button>
          </div>
        </div>
        <Row className="page-inner-width-box">
          <Col span={22}>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="0">
                <Link
                  to={{
                    pathname: `/${INDEX.path}`
                  }}
                >
                  首页
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    新高考 <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="1">
                  <Link
                    to={
                      this.props.user.uuid
                        ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                        : `/${LOGIN.path}`
                    }
                  >
                    高考资讯
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={"/"}>智能选择</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={"/"}>按专业选科目</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to={"/"}>按科目选专业</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to={"/"}>按大学选专业</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <Link
                  to={
                    this.props.user.uuid
                      ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`
                      : `/${LOGIN.path}`
                  }
                >
                  学业测评
                </Link>
              </Menu.Item>

              <SubMenu
                key="sub2"
                title={
                  <span>
                    填志愿 <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="7">
                  <Link
                    to={
                      this.props.user.uuid
                        ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                        : `/${LOGIN.path}`
                    }
                  >
                    模拟填报
                  </Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to={"/"}>正式填报</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to={"/"}>院校优先</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to={"/"}>专业优先</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to={"/"}>指定院校</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    智课堂 <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="12">
                  <Link to={"/"}>志愿讲堂</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to={"/"}>高考提分</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to={"/"}>大学展播</Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub4"
                title={
                  <span>
                    数据查询 <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="15">
                  <Link to={`/${SEARCH_SCHOOL.path}`}>院校资讯</Link>
                </Menu.Item>
                <Menu.Item key="16">
                  <Link to={`/${SEARCH_MAJOR.path}`}>专业百科</Link>
                </Menu.Item>
                <Menu.Item key="17">
                  <Link to={"/"}>排名集锦</Link>
                </Menu.Item>
                <Menu.Item key="18">
                  <Link to={"/"}>高考百科</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="19">
                <Link to={"/"}>专家资讯</Link>
              </Menu.Item>
              <Menu.Item key="20">
                <Link to={"/"}>社区</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} className="header-personal-box">
            {this.props.user.uuid ? (
              <Dropdown overlay={userMenu}>
                <span className="user-menu-span">
                  {this.props.user.nickname} <Icon type="down" />
                </span>
              </Dropdown>
            ) : (
              <div>
                <Link
                  to={{
                    pathname: `/${REGISTER.path}`
                  }}
                >
                  注册
                </Link>
                |
                <Link
                  to={{
                    pathname: `/${LOGIN.path}`
                  }}
                >
                  登录
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    let pathArr = this.props.location.pathname.split("/"),
      token = "token";

    // 需要将第一位pop掉 例:'/login' => '['login']'
    pathArr.pop();

    // 非后台页页需要再判断location中是否有TOKEN
    if (pathArr[0] !== "background") {
      // 其他页需要再判断location中是否有TOKEN,有token就请求,没token就什么都不干
      token = window.localStorage.getItem("token");
    }

    // 如果是后台的才需要进行判断
    if (!this.props.user.uuid && token) {
      this.props.getUser();
      if (pathArr[0]) {
        this.props.history.push(`/${LOGIN.path}`);
      }
    }
  }

  // 注销函数
  handleSignOut = () => {
    localStorage.clear();
    this.props.clearUser();
    this.props.history.push(`/${LOGIN.path}`);
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store["userStore"];
  let { user } = userStore;

  return {
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(userActions.getUser());
    },
    clearUser: () => {
      dispatch(userActions.clearUser());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderController)
);
