import React from "react";

// UI组件
import { Form, Input, Radio, InputNumber, Button, Select } from "antd";

// 请求文件
import { launchRequest } from "../../../util/request";
import * as APIS from "../../../constants/api-constants";
import * as DominConfigs from "../../../constants/domin-constants";

// CSS
import "../../../style/basic.css";

const { Option } = Select;

class BasicController extends React.Component {
  state = {
    loading: false,
    provinceList: []
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
      },
      optionList = this.state.provinceList.map(provinceItem => {
        return (
          <Option key={provinceItem.id} value={provinceItem.id}>
            {provinceItem.province_name}
          </Option>
        );
      }); // 地区的list

    let yearsList = [];
    for (let i = -1; i < 3; i++) {
      yearsList.push(
        <Option
          key={new Date().getFullYear() - i}
          value={new Date().getFullYear() - i}
        >
          {new Date().getFullYear() - i}
        </Option>
      );
    }

    return (
      <div className="basic-info">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item label="地区">
            <Select>{optionList}</Select>
          </Form.Item>
          <Form.Item label="考试年份">
            <Select>{yearsList}</Select>
          </Form.Item>
          <Form.Item label="性别">
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="科系">
            <Radio.Group>
              <Radio value="1">理科</Radio>
              <Radio value="2">文科</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="分数">
            <InputNumber />
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

  componentDidMount = async () => {
    let data = await launchRequest(
      APIS.GET_ADDRESS_OPTION,
      {},
      DominConfigs.REQUEST_TYPE.GET
    );

    this.setState({
      provinceList: data.provinceList
    });
  };

  // 保存
	handleSubmit = (e) => {
		e.preventDefault(); //阻止button submit的默认行为

    console.log('aaaaa');
	};
}

export default BasicController;
