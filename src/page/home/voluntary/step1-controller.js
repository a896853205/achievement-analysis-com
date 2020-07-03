import React from 'react';

// UI组件
import {
  Form,
  Input,
  Radio,
  InputNumber,
  Button,
  Select,
  Cascader
} from 'antd';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';
import { actions as userActions } from '../../../redux/user-model';
import { BCG_ROOT_NAME, VOLUNTARY } from '../../../constants/route-constants';

const { Option } = Select;

class Step1Controller extends React.Component {
  state = {
    loading: false,
    // 查询分数位次的按钮和展示数据的地方
    optionList: [],
    highSchoolList: [{ code: '其他', highSchoolName: '其他' }]
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2, offset: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        }
      };
    // optionList = this.state.provinceList.map(provinceItem => {
    //   return (
    //     <Option key={provinceItem.code} value={provinceItem.code}>
    //       {provinceItem.name}
    //     </Option>
    //   );
    // }); // 地区的list

    let yearsList = [];
    yearsList.push(
      <Option key={2019} value={2019}>
        2019
      </Option>
    );
    /*yearsList.push(
      <Option key={2020} value={2020}>
        2020
      </Option>
    );*/

    let highSchoolOption = this.state.highSchoolList.map(item => (
      <Option key={item.code} value={item.highSchoolName}>
        {item.highSchoolName}
      </Option>
    ));

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
          <Form.Item label='电话'>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='电子邮箱'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '请输入正确的邮箱'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='地区'>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请选择地区'
                }
              ]
            })(
              <Cascader
                loadData={this.loadAddress}
                options={this.state.optionList}
                // changeOnSelect
                onChange={this.getHightSchool}
              />
            )}
          </Form.Item>
          <Form.Item label='所在高中'>
            {getFieldDecorator('highSchool', {
              rules: [
                {
                  required: true,
                  message: '请选择所在高中'
                }
              ]
            })(<Select>{highSchoolOption}</Select>)}
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
                },
                {
                  message: '请输入正确的分数',
                  validator: (rule, value) => value > 0 && value <= 750
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
                  <span>
                    {this.props.me.fitCurrent.year}年实际分数:
                    {this.props.user.score}{' '}
                  </span>
                  <span>
                    {this.props.me.fitCurrent.year}年位次:
                    {this.props.me.fitCurrent.rank}{' '}
                  </span>
                  <span>
                    {this.props.me.fitCurrent.year}年
                    {this.props.me.currentLotsScoreDifferMsg}
                  </span>
                </div>
              ) : (
                undefined
              )}
            </div>
            <div>
              {this.props.me ? (
                <div>
                  <span>
                    {this.props.me.fitOld.year}年映射分数:
                    {this.props.me.fitOld.score}{' '}
                  </span>
                  <span>
                    {this.props.me.fitOld.year}年映射位次:
                    {this.props.me.fitOld.rank}{' '}
                  </span>
                  <span>
                    {this.props.me.fitOld.year}年
                    {this.props.me.lotsScoreDifferMsg}
                  </span>
                </div>
              ) : (
                undefined
              )}
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
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
    let optionList = await this.getAddress();
    let selectedOption = optionList.find(
      item => item.value === this.props.user.provinceCode
    );
    if (selectedOption) {
      await this.loadAddress([selectedOption]);
      let selectedCityOption = selectedOption.children.find(
        item => item.value === this.props.user.cityCode
      );
      if (selectedCityOption) {
        await this.loadAddress([selectedOption, selectedCityOption]);
      }
    }

    await this.getHightSchool(this.props.form.getFieldValue('address'));
    await this.setState({
      optionList
    });
  };

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  getAddress = async (addressType = 'province', code) => {
    let { provinceList, cityList, areaList } = await launchRequest(
      APIS.GET_ADDRESS_OPTION,
      { addressType, code },
      DominConfigs.REQUEST_TYPE.GET
    );

    if (addressType === 'province') {
      return provinceList.map(item => {
        return {
          value: item.code,
          label: item.name,
          isLeaf: false
        };
      });
    } else if (addressType === 'city') {
      return cityList.map(item => {
        return {
          value: item.code,
          label: item.name,
          isLeaf: false
        };
      });
    } else if (addressType === 'area') {
      return areaList.map(item => {
        return {
          value: item.code,
          label: item.name
        };
      });
    }
  };

  getHightSchool = async value => {
    if (value[2]) {
      let highSchoolList = await launchRequest(APIS.GET_HIGH_SCHOOL, {
        areaCode: value[2]
      });

      if (highSchoolList) {
        highSchoolList.push({ code: '其他', highSchoolName: '其他' });
        await this.setState({
          highSchoolList
        });
      }
    } else {
      let highSchoolList = [{ code: '其他', highSchoolName: '其他' }];

      await this.setState({
        highSchoolList
      });
    }
  };

  loadAddress = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    await this.setState({
      optionList: [...this.state.optionList]
    });

    if (selectedOptions.length === 1) {
      // 查询city
      targetOption.children = await this.getAddress('city', targetOption.value);
      targetOption.loading = false;
    } else if (selectedOptions.length === 2) {
      // 查询县
      targetOption.children = await this.getAddress('area', targetOption.value);
      targetOption.loading = false;
    }

    await this.setState({
      optionList: [...this.state.optionList]
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
        this.props.recordUser(values);
        await this.setState({
          loading: false
        });
        // 向redux提交下一步的申请.
        // 由于拆分路由，不再用redux维护的step参数，改为路由的方式跳转
        // this.props.nextStep();
        this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY.path}`);
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
    getMeScoreRank: params => {
      dispatch(voluntaryActions.getMeScoreRank(params));
    },
    recordUser: params => {
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
    mapPropsToFields(props){
      let user = props.user;
      let address = user.address || [user.provinceCode, user.cityCode, user.areaCode];

      return {
        nickname: Form.createFormField({
          value: user.nickname
        }),
        gender: Form.createFormField({
          value: user.gender
        }),
        phone: Form.createFormField({
          value: user.phone
        }),
        email: Form.createFormField({
          value: user.email
        }),
        address: Form.createFormField({
          value: address
        }),
        accountCategory: Form.createFormField({
          value: user.accountCategory
        }),
        score: Form.createFormField({
          value: user.score
        }),
        examYear: Form.createFormField({
          value: user.examYear
        }),
        highSchool: Form.createFormField({
          value: user.highSchool
        })
      };
    }
  })(Step1Controller)
);
