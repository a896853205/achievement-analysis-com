import React from "react";

//样式文件
import "../style/login-controller.css";

// 路由
import { BCG_ROOT_NAME } from "../constants/route-constants";

// 请求文件
import { launchRequest } from "../util/request";
import * as APIS from "../constants/api-constants";

// UI组件
import { Button, Input, Card } from "antd";

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
      <div className="back">
        <Card className="test" style={{ width: 300 }}>
          <div className="login-title">智赢</div>
          <div className="login-sub-title">祝你智取未来</div>
          <Input
            className="login-input"
            onChange={e => this.setState({ userName: e.target.value })}
            size="large"
            placeholder="手机号或卡号"
          />
          <Input.Password
            className="login-input"
            onChange={e => this.setState({ passWord: e.target.value })}
            size="large"
            placeholder="密码"
          />
          <Button
            className="login-button"
            onClick={this.handleSubmit}
            type="primary"
            size="large"
          >
            登录
          </Button>
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
        this.props.recordUser(data.user);
        // 需要放到token中
        this.props.history.push(`/${BCG_ROOT_NAME}/`);
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
    recordUser: params => {
      dispatch(userActions.recordUser(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginController);
