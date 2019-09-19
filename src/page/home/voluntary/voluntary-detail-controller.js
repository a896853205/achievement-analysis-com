import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';
// import { actions as voluntaryActions } from '../../../redux/voluntary-model';

class VoluntaryDetailController extends React.Component {
	render() {
		return (
			<div>
				{this.props.voluntaryDetail.map((voluntaryItem) => (
					<div key={voluntaryItem.five_volunteer_id}>
            {`${voluntaryItem.volunteer_name} ${voluntaryItem.schoolName}`}
						{voluntaryItem.major.map((majorItem, index) => (
							<div key={index} style={{ paddingLeft: 24 }}>{`专业${index + 1} ${majorItem.majorName}`}</div>
						))}
					</div>
				))}
			</div>
		);
	}
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const voluntaryStore = store['voluntaryStore'];
	let { lot_id, voluntaryDetail } = voluntaryStore;

	return {
		lotId: lot_id,
		voluntaryDetail: [ ...voluntaryDetail ]
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VoluntaryDetailController);
