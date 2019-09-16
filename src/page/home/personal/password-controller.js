import React from "react";

import { Form, Input, Button, message } from "antd";

import "../../../style/personal-password.css";
class PasswordController extends React.Component {
  state = {
    loading: false,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    return (
      <div className="con">
        <Form layout="formItemLayout">
          <Form.Item label="原密码" {...formItemLayout}>
            <Input
              placeholder="请输入原密码"
              type="password"
              onChange = {e => this.setState({ oldPassword: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="新密码" {...formItemLayout}>
            <Input
              placeholder="请输入新密码"
              type="password"
              onChange = {e => this.setState({ newPassword: e.target.value })}/>
          </Form.Item>
          <Form.Item label="确认密码" {...formItemLayout}>
            <Input
              placeholder="请重新输入新密码"
              type="password"
              onChange = {e => this.setState({ confirmPassword: e.target.value })}/>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button
              type='primary'
              onClick={this.submit}
              loading={this.state.loading}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  submit = () => {
    if (this.state.oldPassword !== this.state.newPassword) {
      message.error('新密码和确认密码需要一致');
      return;
    } else {
      // 发起修改密码的请求
    }
  }
}
export default PasswordController;
