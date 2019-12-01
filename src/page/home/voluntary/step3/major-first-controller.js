import React from 'react';

// UI组件
import { Input, Radio } from 'antd';

// 自定义组件
import TableController from './table-controller';
import SchoolOptionsController from './school-options-controller.jsx';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';

const { Search } = Input;

class MajorFirstController extends React.Component {
  state = {
    gatherOptionList: []
  };
  render() {
    return (
      <div>
        <div>
          <Search
            enterButton='搜索专业'
            size='large'
            onSearch={this.handleSearchMajor}
            onChange={this.handleChangeName}
            placeholder='请输入专业名称'
          />
        </div>
        <SchoolOptionsController />
        <Radio.Group
          className='school-first-btn-group'
          value={this.props.gatherValue}
          onChange={this.handleGatherChange}
        >
          {this.state.gatherOptionList.map(item => (
            <Radio.Button key={item.value} className='btn' value={item.value}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
        <span className='school-first-alert-box'>
          *
          {this.state.gatherOptionList.find(
            gather => gather.value === this.props.gatherValue
          )
            ? this.state.gatherOptionList.find(
                gather => gather.value === this.props.gatherValue
              ).describe
            : undefined}
        </span>
        <TableController />
      </div>
    );
  }
  componentDidMount = async () => {
    this.props.recordSchoolList();

    let { gatherOptionList } = await launchRequest(APIS.GET_SCHOOL_OPTION, {
      lotId: this.props.lotId
    });

    await this.setState({
      gatherOptionList
    });
  };

  // 改变集合
  handleGatherChange = async e => {
    this.props.recordSchoolOption({ gatherValue: e.target.value });
  };

  // 搜专业名
  handleSearchMajor = () => {
    this.props.recordSchoolList();
  };

  handleChangeName = e => {
    this.props.recordMajorName(e.target.value);
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'],
    { lot_id, schoolOption } = voluntaryStore,
    { gatherValue } = schoolOption;

  return {
    lotId: lot_id,
    gatherValue
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordSchoolOption: params => {
      dispatch(voluntaryActions.recordSchoolOption(params));
      dispatch(voluntaryActions.recordSchoolList());
    },
    recordMajorName: params => {
      dispatch(voluntaryActions.recordMajorName(params));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MajorFirstController);
