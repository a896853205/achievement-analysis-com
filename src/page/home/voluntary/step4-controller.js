import React from 'react';
import { withRouter } from 'react-router-dom';

import VoluntaryDetailController from './voluntary-detail-controller';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

// UI组件
import { Button, Modal } from 'antd';

import {
  BCG_ROOT_NAME,
  VOLUNTARY_RESULT
} from '../../../constants/route-constants';

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
          <Button
            className='btn-large'
            loading={this.state.btnLoading}
            onClick={this.handleClickSubmit}
            size='large'
            type='primary'
            style={{'marginTop': '20px', 'marginBottom': '20px'}}
          >
            确认生成报表
          </Button>
        </div>
      </div>
    );
  }

  handleClickSubmit = async () => {
    confirm({
      title: '生成报表',
      content: '您确定生成报表吗? 生成报表会使用一次填报机会.',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // loading
        await this.setState({ btnLoading: true });

        // 提交到后台后返回uuid
        let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
          lotId: this.props.lotId,
          voluntary: this.props.voluntary
        });

        if (voluntaryId) {
          // 将uuid存入redux
          this.props.recordVoluntaryIdGetResult(voluntaryId);

          // 结束loading
          await this.setState({ btnLoading: false });

          // 跳转页面
          this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`);
          this.props.setStep(1)
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
  const voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary } = voluntaryStore;

  return {
    lotId: lot_id,
    voluntary: [...voluntary]
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
    setStep: step => {
      dispatch(voluntaryActions.setStep(step));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Step4Controller)
);
