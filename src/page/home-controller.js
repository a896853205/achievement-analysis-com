import React from 'react';

// 请求文件
import { launchRequest } from "../util/request";
import * as APIS from "../constants/api-constants";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as userActions } from "../redux/user-model";

class HomeController extends React.Component {
  render() {
    return (
      <div>登录成功页</div>
    );
  }

  componentDidMount () {

    if (!this.props.user.uuid) {
      launchRequest(APIS.GET_USER_INFO, {})
      .then(data => {

        if (data) {
          this.props.recordUser(data);
        } else {
          this.props.history.push('/login');
        }
      });
    }
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
  return {
    recordUser: params => {
      dispatch(userActions.recordUser(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeController);