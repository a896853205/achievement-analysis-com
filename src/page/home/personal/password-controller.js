import React from "react";

import { Form, Input, Tooltip, Icon, Button } from "antd";
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
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : null;
    const buttonItemLayout =
      formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : null;
    return (
      <div>
        <Form layout="horizontal">
          <Form.Item label="原密码" {...formItemLayout}>
            <Input placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item label="新密码" {...formItemLayout}>
            <Input placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item label="确认密码" {...formItemLayout}>
            <Input placeholder="请重新输入新密码" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default PasswordController;
