import React from 'react';
import ResultDeepAnalysisController from '../home/voluntary/result/result-deep-analysis-controller';
// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../redux/voluntary-model';

class HomeVoluntaryDeepResultController extends React.Component {
  render() {
    return (<div><ResultDeepAnalysisController /></div>);
  }
  componentDidMount() {
    this.props.recordVoluntaryListOption(this.props.match.params.voluntaryId);
    this.props.recordVoluntaryDeepUuid(this.props.match.params.voluntaryId);
  }
}
// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntaryDeepUuid: params => {
      dispatch(voluntaryActions.recordVoluntaryDeepUuid(params));
    },
    recordVoluntaryListOption: params => {
      dispatch(voluntaryActions.recordVoluntaryListOption(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeVoluntaryDeepResultController);