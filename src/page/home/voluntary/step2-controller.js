import React from 'react';

// UI组件
import {
  Card
} from 'antd';

// 请求文件
import { launchRequest } from "../../../util/request";
import * as APIS from "../../../constants/api-constants";
import * as DominConfigs from '../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from "react-redux";
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

class Step2Controller extends React.Component {
  state = {
    entryScoreList: [],
    loading: false
  }
  render() {
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
      cursor: 'pointer'
    };
    let entryScoreList = this.state.entryScoreList.map(entryScoreItem => {
      return (
        <Card.Grid style={gridStyle} onClick={e => {this.handleClickCard(entryScoreItem.lot_id)}}>
          {entryScoreItem.lot_name}
        </ Card.Grid>);
    });
    return (
      <div>
        <Card loading={this.state.loading} title="批次目录">
          {entryScoreList}
        </Card>
      </div>
    );
  }

  componentDidMount = async () => {
    await this.setState({
      loading: true
    })

    let data = await launchRequest(APIS.GET_ENTRY_SCORE, {}, DominConfigs.REQUEST_TYPE.GET);

    this.setState({
      entryScoreList: data,
      loading: false
    });
  }

  handleClickCard = lotId => {
    this.props.setLotId(lotId);
    this.props.nextStep();
  }
}

// 从store接收state数据
const mapStateToProps = store => {

  return {}
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