import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';

class VoluntaryResultController extends React.Component {
  render() {
    return (<div>{this.props.voluntaryResult ? this.props.voluntaryResult.content : '1'}</div>);
  }
}
// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { voluntaryResult } = voluntaryStore;

	return {
		voluntaryResult
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(VoluntaryResultController);