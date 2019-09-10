import React from "react";

// 路由
import { BCG_ROOT_NAME, HOME } from "../constants/route-constants";

// 请求文件
import { launchRequest } from "../util/request";
import * as APIS from "../constants/api-constants";

// UI组件
import { Button, Input, Tag, Card } from "antd";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as userActions } from "../redux/user-model";

// 密码加密
import md5 from "md5";

class LoginController extends React.Component {
  state = {
    userName: "",
    passWord: ""
  };
  render() {
    return (
      <div>
        <Card style={{ width: 300 }}>
          <Input onChange={e => this.setState({ userName: e.target.value })} />
          <Input.Password
            onChange={e => this.setState({ passWord: e.target.value })}
          />
          <Button onClick={this.handleSubmit}>登录</Button>
        </Card>
      </div>
    );
  }

  // 登录函数
  handleSubmit = () => {
    // 提交表单
    let { userName, passWord } = this.state;

    launchRequest(APIS.USER_LOGIN, {
      userName,
      passWord: md5(passWord)
    }).then(data => {
      if (data) {
        this.props.recordUserId(data);
        // 需要放到token中
        this.props.history.push(`/${BCG_ROOT_NAME}/${HOME.path}`);
      }
    });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordUserId: params => {
      dispatch(userActions.recordUserId(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginController);
