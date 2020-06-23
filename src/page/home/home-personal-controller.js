import React from "react";
import { Route, Switch } from "react-router-dom";
// 关于数据模块交互
import { connect } from 'react-redux';
// 自定义组件
import BasicController from "./personal/basic-controller";
import PasswordController from "./personal/password-controller";
import MyVoluntaryController from "./personal/my-voluntary-controller";

// UI组件
import { Menu, Icon } from "antd";

// 路由
import { Link } from "react-router-dom";
import {
  BCG_ROOT_NAME,
  PERSONAL,
  BASIC,
  PASSWORD,
  MY_VOLUNTARY
} from "../../constants/route-constants";

// CSS
import "../../style/home-personal.css";
class HomePersonalController extends React.Component {
  render() {

    return (
      <div className="personal-box">
        <div className="slidebar">
          <div className="aus-user">
            <img
              className="aus-user-thumb"
              src="/images/logo.jpg"
              alt=""
            />
            <p className="aus-user-name">
              {this.props.user.roleCode === 2 ?(
                <img src='/vip/user-vip-logo.png' alt='' className='aus-user-name user-vip-logo'/>
              ) : null}
              {this.props.user.nickname ? this.props.user.nickname : '智赢规划'}
            </p>
          </div>
          <Menu
            className="personl-menu"
            selectedKeys={[this.props.match.params.type || BASIC.path]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item key={BASIC.path} className="personl-menu-item">
              <Link to={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}/${this.props.user.score>0?1:0}`}>
                <Icon type="user" />
                基本信息
              </Link>
            </Menu.Item>
            <Menu.Item key={PASSWORD.path} className="personl-menu-item">
              <Link to={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}/1`}>
                <Icon type="key" />
                修改密码
              </Link>
            </Menu.Item>
            <Menu.Item key={MY_VOLUNTARY.path} className="personl-menu-item">
              <Link to={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${MY_VOLUNTARY.path}/${this.props.user.score>0?1:0}`}>
                <Icon type="schedule" />
                我的志愿
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <div className="personal-contant">
          <Switch>
            <Route
              path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${BASIC.path}/:score`}
              exact
              component={BasicController}
            />
            <Route
              path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${PASSWORD.path}/:score`}
              exact
              component={PasswordController}
            />
            <Route
              path={`/${BCG_ROOT_NAME}/${PERSONAL.path}/${MY_VOLUNTARY.path}/:score`}
              exact
              component={MyVoluntaryController}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const { user } = store['userStore'];
  return {
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePersonalController);
