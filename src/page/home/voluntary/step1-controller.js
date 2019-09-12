import React from 'react';

// UI组件
import {
  Form,
  Input,
  Radio,
  InputNumber,
  Button,
} from 'antd';

// 请求文件
import { launchRequest } from "../../../util/request";
import * as APIS from "../../../constants/api-constants";

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

class Step1Controller extends React.Component {
  state = {
    loading: false,
  }
  render() {
    const { getFieldDecorator } = this.props.form,
      formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      },
      isConfirm = !!this.props.user.confirm;


    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="姓名">
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input placeholder="请输入姓名" disabled={isConfirm} />)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Radio.Group disabled={isConfirm}>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="科系">
            {getFieldDecorator('accountCategory', {
              rules: [
                {
                  required: true,
                  message: '请选择科系',
                },
              ],
            })(
              <Radio.Group disabled={isConfirm}>
                <Radio value="1">理科</Radio>
                <Radio value="2">文科</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="分数">
            {getFieldDecorator('score', {
              rules: [
                {
                  required: true,
                  message: '请输入分数',
                },
              ],
            })(
              <InputNumber disabled={isConfirm} />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            {
              isConfirm ?
                (<Button type="primary" onClick={this.props.nextStep}> 下一步 </Button>)
                :
                (
                  <Button type="primary" htmlType="submit" loading={this.state.loading}>
                    保存 并 下一步
                  </Button>
                )
            }
          </Form.Item>
        </Form>
      </div >
    )
  }

  // 保存并下一步
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    // 表单验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 提交表单
        await launchRequest(APIS.SET_USER_INFO, values);
        await this.setState({
          loading: false,
        })
        // 向redux提交下一步的申请.
        this.props.nextStep();
      }
      else {
        this.setState({
          loading: false,
        });
      }
    })
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
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({
  name: 'saveBasicInfo',
  mapPropsToFields(props) {
    let user = props.user;
    return {
      nickname: Form.createFormField({
        value: user.nickname,
      }),
      gender: Form.createFormField({
        value: user.gender,
      }),
      accountCategory: Form.createFormField({
        value: user.account_category,
      }),
      score: Form.createFormField({
        value: user.score,
      }),
    }
  }
})(Step1Controller));