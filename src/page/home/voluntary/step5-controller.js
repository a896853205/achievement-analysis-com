import React from 'react';
import ResultReportController from '@/page/home/voluntary/result/result-report-controller';
import ResultDeepController from '@/page/home/voluntary/result/result-deep-analysis-controller';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '@/redux/voluntary-model';
import { actions as userActions } from '@/redux/user-model';

// 路由
import { Link } from 'react-router-dom';

// UI组件
import { Button, Modal, Alert } from 'antd';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// css
import '@/style/voluntary/step5.css';

const { confirm } = Modal;

class Step5Controller extends React.Component {
  state = {
    btnLoading: false
  }
  render() {
    let report;
    switch (this.props.voluntaryResultType) {
      case 'report':
        report = <ResultReportController />;
        break;
      case 'deepReport':
        report = <ResultDeepController />;
        break;
      default:
        report = null;
    }
    return (
      <div className='step5-box'>
        {report}
        {this.props.voluntaryResultType === 'report' ? (
          <div className='voluntarty-button-box'>
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
        ) : (
          undefined
        )}
      </div>
    );
  }

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
          voluntary: this.props.voluntary[this.props.lotId],
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
          // this.props.nextStep();
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
  const voluntaryStore = store['voluntaryStore'],
    userStore = store['userStore'];
  let { lot_id, voluntaryResultType, voluntary } = voluntaryStore,
    { user } = userStore;

  return {
    lotId: lot_id,
    voluntaryResultType,
    user,
    voluntary: [...voluntary]
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Step5Controller);
