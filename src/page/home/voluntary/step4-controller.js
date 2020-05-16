import React from 'react';

// import VoluntaryDetailController from '@/page/home/voluntary/step4/voluntary-detail-controller';
import VoluntaryDetailController from '../voluntary/step4/voluntary-detail-controller';

// 路由
import { Link } from 'react-router-dom';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '@/redux/voluntary-model';
import { actions as userActions } from '@/redux/user-model';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// UI组件
import { Button, Modal, Alert } from 'antd';
import { BCG_ROOT_NAME, DEEP_REPORT, REPORT } from '../../../constants/route-constants';

const { confirm } = Modal;

class Step4Controller extends React.Component {
  state = {
    btnLoading: false
  };
  render() {
    return (
      <div>
        {/* 在这里显示批次之类的重要其他信息 */}
        <VoluntaryDetailController />
        <div className='voluntarty-button-box'>
          <div>
            <Alert
              message={`剩余生成报表次数${this.props.user.reportAlterTime}次`}
              type='info'
              showIcon
            />
            {this.props.user.reportAlterTime ? (
              <Button
                className='btn-large btn-transition-blue-background'
                loading={this.state.btnLoading}
                onClick={this.handleClickSubmit}
                size='large'
                type='primary'
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                确认生成报表
              </Button>
            ) : (
              <Link to='/vipProfile'>
                <Button
                  className='btn-large btn-transition-blue-background'
                  size='large'
                  type='primary'
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  没有次数了,充值VIP
                </Button>
              </Link>
            )}
          </div>
          <div>
            <Alert
              message={`剩余生成深度体验次数${this.props.user.deepAlterTime}次`}
              type='info'
              showIcon
            />
            {this.props.user.deepAlterTime ? (
              <Button
                className='btn-large btn-transition-blue-background'
                loading={this.state.btnLoading}
                onClick={this.handleClickDeepSubmit}
                size='large'
                type='primary'
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                确认深度体验表
              </Button>
            ) : (
              <Link to='/vipProfile'>
                <Button
                  className='btn-large btn-transition-blue-background'
                  size='large'
                  type='primary'
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  没有次数了,充值VIP
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  handleClickSubmit = async () => {
    confirm({
      title: '生成报表',
      content: '您确定生成报表吗? 生成报表会使用一次机会.',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // loading
        await this.setState({ btnLoading: true });

        // 提交到后台后返回uuid
        let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
          lotId: this.props.lotId,
          voluntary: this.props.voluntaryDetail,
          reportType: 1
        });
        await this.props.getUser();

        if (voluntaryId) {
          // 将uuid存入redux
          this.props.recordVoluntaryResultType('report');
          this.props.recordVoluntaryIdGetResult(voluntaryId);

          // 结束loading
          await this.setState({ btnLoading: false });

          // 跳转页面
          // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
          // this.props.nextStep();
          this.props.history.push(`/${BCG_ROOT_NAME}/${REPORT.path}/${this.props.lotId}`);
        } else {
          // 结束loading
          await this.setState({ btnLoading: false });
          // 跳转到充值VIP页
        }
      },
      onCancel() {}
    });
  };

  handleClickDeepSubmit = async () => {
    confirm({
      title: '生成深度体验表',
      content: '您确定生成深度体验表吗? 生成深度体验表会使用一次机会.',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // loading
        await this.setState({ btnLoading: true });

        // 提交到后台后返回uuid,而且重新查询一下用户数据
        let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
          lotId: this.props.lotId,
          voluntary: this.props.voluntaryDetail,
          reportType: 2
        });
        await this.props.getUser();

        if (voluntaryId) {
          // 将uuid存入redux
          this.props.recordVoluntaryResultType('deepReport');
          this.props.recordVoluntaryListOption(voluntaryId);
          this.props.recordVoluntaryDeepUuid(voluntaryId);

          // 结束loading
          await this.setState({ btnLoading: false });

          // 跳转页面
          // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
          // this.props.nextStep();
          this.props.history.push(`/${BCG_ROOT_NAME}/${DEEP_REPORT.path}/${this.props.lotId}`);
        } else {
          // 结束loading
          await this.setState({ btnLoading: false });
          // 跳转到充值VIP页
        }
      },
      onCancel() {}
    });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'],
    voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary, voluntaryDetail } = voluntaryStore,
    { user } = userStore;

  return {
    lotId: lot_id,
    voluntary: [...voluntary],
    voluntaryDetail,
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntaryIdGetResult: params => {
      dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
    },
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    },
    recordVoluntaryResultType: type => {
      dispatch(voluntaryActions.recordVoluntaryResultType(type));
    },
    recordVoluntaryListOption: params => {
      dispatch(voluntaryActions.recordVoluntaryListOption(params));
    },
    recordVoluntaryDeepUuid: params => {
      dispatch(voluntaryActions.recordVoluntaryDeepUuid(params));
    },
    getUser: () => {
      dispatch(userActions.getUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step4Controller);
