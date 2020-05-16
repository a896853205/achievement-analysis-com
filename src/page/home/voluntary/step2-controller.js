import React from 'react';

// UI组件
import { Icon, Modal } from 'antd';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

import '@/style/voluntary/step2.css';
import { BCG_ROOT_NAME, SCHOOLS } from '../../../constants/route-constants';

class Step2Controller extends React.Component {
  state = {
    entryScoreList: [],
    loading: false,
    visible: false
  };

  // modal
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false
    });
  };

  // modal jieshu
  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  render() {
    let entryScoreList = this.state.entryScoreList.map((entryScoreItem, i) => {
      return (
        <div
          key={entryScoreItem.id}
          onClick={() => {
            this.handleClickCard(entryScoreItem.id);
          }}
          className='step2-card-item'
        >
          {entryScoreItem.lots_name}
        </div>
      );
    });

    entryScoreList.push(
      <div className='step2-card-item' key='help'>
        <Icon type='question-circle'/>
        帮助
      </div>
    );

    return (
      <div>
        <p>
          根据黑龙江省招生考试院发布最新高考政策调整方向,2020年度高考理工类和文史类本科二批、三批将进行录取批次合并,本决策系统在模拟填报块以“原二批A”、“原二批B”和“原三批”替代二批A、二批B和三批。未来待新高考政策明确后,在正式填报模块将以合并后批次进行填报,并深度体验填报结果,请考生及家长悉知!
        </p>
        <div className='step2-box'>
          <div className='step2-card-box'>{entryScoreList}</div>
          <Modal
            title='警告'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText='确定'
            cancelText='取消'
          >
            <p>详情请咨询专家</p>
          </Modal>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    await this.setState({
      loading: true
    });

    let { lotsOption } = await launchRequest(
      APIS.GET_LOTS_OPTION,
      {},
      DominConfigs.REQUEST_TYPE.GET
    );

    // 强基计划进
    lotsOption.unshift({
      id: -1,
      lots_name: '强基计划'
    });

    // 三批走
    lotsOption.splice(6, 1);

    this.setState({
      entryScoreList: lotsOption,
      loading: false
    });
  };

  handleClickCard = (lotId) => {

    if (lotId !== -1) {
      // this.props.setLotId(lotId);
      // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
      // this.props.nextStep();
      this.props.history.push(`/${BCG_ROOT_NAME}/${SCHOOLS.path}/${lotId}`);
    } else {
      this.showModal();
    }
  };
}

// 从store接收state数据
const mapStateToProps = (store) => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
  return {
    setLotId: (lotId) => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2Controller);
