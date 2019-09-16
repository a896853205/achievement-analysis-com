import React from "react";

import { Form, Input, Button } from "antd";

import "../../../style/personal-password.css";
class PasswordController extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: "horizontal"
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

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
            <Input placeholder="请输入原密码" type="password" />
          </Form.Item>
          <Form.Item label="新密码" {...formItemLayout}>
            <Input placeholder="请输入新密码" type="password" />
          </Form.Item>
          <Form.Item label="确认密码" {...formItemLayout}>
            <Input placeholder="请重新输入新密码" type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={this.state.loading}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default PasswordController;
