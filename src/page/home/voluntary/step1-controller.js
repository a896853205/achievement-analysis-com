import React from 'react';

// UI组件
import { Form, Input, Radio, InputNumber, Button, Select } from 'antd';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';
import { actions as userActions } from '../../../redux/user-model';

const { Option } = Select;

class Step1Controller extends React.Component {
  state = {
    loading: false,
    // 查询分数位次的按钮和展示数据的地方
    provinceList: [],
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
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
    for (let i = 0; i < 3; i++) {
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
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label='姓名'>
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名'
                }
              ]
            })(<Input placeholder='请输入姓名' />)}
          </Form.Item>
          <Form.Item label='地区'>
            {getFieldDecorator('addressProvince', {
              rules: [
                {
                  required: true,
                  message: '请选择地区'
                }
              ]
            })(<Select>{optionList}</Select>)}
          </Form.Item>
          <Form.Item label='考试年份'>
            {getFieldDecorator('examYear', {
              rules: [
                {
                  required: true,
                  message: '请选择考试年份'
                }
              ]
            })(<Select>{yearsList}</Select>)}
          </Form.Item>
          <Form.Item label='性别'>
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别'
                }
              ]
            })(
              <Radio.Group>
                <Radio value='1'>男</Radio>
                <Radio value='2'>女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='科系'>
            {getFieldDecorator('accountCategory', {
              rules: [
                {
                  required: true,
                  message: '请选择科系'
                }
              ]
            })(
              <Radio.Group>
                <Radio value='1'>理科</Radio>
                <Radio value='2'>文科</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='分数'>
            {getFieldDecorator('score', {
              rules: [
                {
                  required: true,
                  message: '请输入分数'
                }
              ]
            })(<InputNumber />)}
            <Button
              type='primary'
              onClick={this.handleClickGetScore}
              loading={this.props.meLoading}
            >
              查询位次/线差
            </Button>
            <div>
              {this.props.me ? (
                <div>
                  <span>{this.props.me.fitCurrent.year}年</span>
                  <span> 分数: {this.props.me.fitCurrent.score}</span>
                  <span> 位次: {this.props.me.fitCurrent.rank}</span>
                </div>
              ) : (
                undefined
              )}
            </div>
            <div>
              {this.props.me ? (
                <div>
                  <span>{this.props.me.fitOld.year}年</span>
                  <span> 分数: {this.props.me.fitOld.score}</span>
                  <span> 位次: {this.props.me.fitOld.rank}</span>
                  <span> {this.props.me.lotsScoreDifferMsg}</span>
                </div>
              ) : (
                undefined
              )}
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={this.state.loading}
            >
              保存 并 下一步
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

  // 查询当年位次和去年的分数和位次
  handleClickGetScore = e => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.getMeScoreRank(values);
      } else {
        this.setState({
          Scoreloading: false
        });
      }
    });
  };

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
        this.props.getMeScoreRank(values);
        await this.setState({
          loading: false
        });
        // 向redux提交下一步的申请.
        this.props.nextStep();
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
  const userStore = store['userStore'],
    voluntaryStore = store['voluntaryStore'];

  let { user } = userStore,
    { me, meLoading } = voluntaryStore;

  return {
    user,
    me,
    meLoading
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    },
    getMeScoreRank: (params) => {
      dispatch(voluntaryActions.getMeScoreRank(params));
    },
    recordUser: (params) => {
      dispatch(userActions.recordUser(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Form.create({
    name: 'saveBasicInfo',
    mapPropsToFields(props) {
      let user = props.user;
      return {
        nickname: Form.createFormField({
          value: user.nickname
        }),
        gender: Form.createFormField({
          value: user.gender
        }),
        accountCategory: Form.createFormField({
          value: user.accountCategory
        }),
        score: Form.createFormField({
          value: user.score
        }),
        addressProvince: Form.createFormField({
          value: user.addressProvince
        }),
        examYear: Form.createFormField({
          value: user.examYear
        })
      };
    }
  })(Step1Controller)
);
