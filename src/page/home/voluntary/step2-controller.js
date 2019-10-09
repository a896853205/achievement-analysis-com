import React from 'react';

// UI组件
import { Icon } from 'antd';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

import '@/style/voluntary/step2.css';

class Step2Controller extends React.Component {
  state = {
    entryScoreList: [],
    loading: false
  };
  render() {
    let entryScoreList = this.state.entryScoreList.map(entryScoreItem => {
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
        <Icon type='question-circle' />
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

    this.setState({
      entryScoreList: lotsOption,
      loading: false
    });
  };

  handleClickCard = lotId => {
    this.props.setLotId(lotId);
    this.props.nextStep();
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    setLotId: lotId => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2Controller);
