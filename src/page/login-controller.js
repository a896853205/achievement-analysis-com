import React from "react";

//样式文件
import "../style/login-controller.css";

// 路由
// import { BCG_ROOT_NAME } from "../constants/route-constants";

// 请求文件
import { launchRequest } from "../util/request";
import * as APIS from "../constants/api-constants";

// UI组件
import { Button, Input, Form, Card } from "antd";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as userActions } from "../redux/user-model";

// 密码加密
import md5 from "md5";

class LoginController extends React.Component {
  state = {
    userName: "",
    passWord: "",
    loading: false
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="back">
        <Card className="test" style={{ width: 300 }}>
          <div className="login-title">智赢</div>
          <div className="login-sub-title">祝你智取未来</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item className="form-item">
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "请输入用户名"
                  }
                ]
              })(
                <Input
                  className="login-input"
                  onChange={e => this.setState({ userName: e.target.value })}
                  size="large"
                  placeholder="手机号或卡号"
                />
              )}
            </Form.Item>
            <Form.Item className="form-item">
              {getFieldDecorator("passWord", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码"
                  }
                ]
              })(
                <Input.Password
                  className="login-input"
                  onChange={e => this.setState({ passWord: e.target.value })}
                  size="large"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                className="login-button"
                htmlType="submit"
                type="primary"
                size="large"
                loading={this.state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  // 登录函数
  handleSubmit = e => {
    e.preventDefault(); //阻止button submit的默认行为
    this.setState({
      loading: true
    });
    //表单验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { userName, passWord } = values;
        // 提交表单
        let data = await launchRequest(APIS.USER_LOGIN, {
          userName,
          passWord: md5(passWord)
        });
        if (data) {
          this.props.recordUser(data.user);
          // 需要放到token中
          this.setState({
            loading: false
          });
          this.props.history.push(`/`);
        } else {
          this.setState({
            loading: false
          });
        }
      } else {
        this.setState({
          loading: false
        });
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
)(Form.create({})(LoginController));
