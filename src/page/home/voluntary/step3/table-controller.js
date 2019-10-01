import React from 'react';

// UI组件
import { Select, Button, Icon, Table, Drawer } from 'antd';

// 自定义组件
import SubTableController from './sub-table-controller';
import SchoolDetailController from '../../school/school-detail';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';
import { actions as schoolActions } from '../../../../redux/school-model';

const { Option } = Select;
class TableController extends React.Component {
  state = {
    // 抽屉显示
    schoolDrawerVisible: false
  }
  render() {
    // 表格表头
    const columns = [
      {
        title: '院校名称',
        dataIndex: 'school_name',
        key: 'schoolName',
        align: 'center'
        // render: text => <a>{text}</a>,
      },
      {
        title: '地区',
        dataIndex: 'province_name',
        key: 'province_name',
        align: 'center'
      },
      {
        title: '招生计划',
        dataIndex: 'plan',
        key: 'plan',
        align: 'center',
        render: () => <span>-</span>
      },
      {
        title: '投档概率',
        dataIndex: 'archives',
        key: 'archives',
        align: 'center',
        render: () => <span>-</span>
      },
      {
        title: '风险系数',
        dataIndex: 'risk',
        key: 'risk',
        align: 'center',
        render: () => <span>-</span>
      },
      {
        title: '详细信息',
        dataIndex: 'schoolDetail',
        key: 'schoolDetail',
        align: 'center',
        render: (text, record) => (
          <Button
            onClick={() => {
              this.showSchoolDetail(record);
            }}
          >
            查看详细信息
          </Button>
        )
      },
      {
        title: '填报',
        dataIndex: 'option',
        key: 'option',
        width: 150,
        align: 'center',
        render: (text, record) => (
          <Select
            placeholder='选择志愿'
            style={{ width: 125 }}
            onChange={e => {
              this.handleSchoolChange(e, record);
            }}
            value={
              this.props.voluntary.find(voluntaryItem => {
                return voluntaryItem.schoolId === record.school_id;
              })
                ? this.props.voluntary.find(voluntaryItem => {
                    return voluntaryItem.schoolId === record.school_id;
                  }).five_volunteer_id
                : undefined
            }
          >
            {this.props.voluntary.map(voluntaryItem => (
              <Option
                key={voluntaryItem.five_volunteer_id}
                value={voluntaryItem.five_volunteer_id}
              >
                {voluntaryItem.volunteer_name}
              </Option>
            ))}
          </Select>
        )
      }
    ];

    // 查看专业的UI
    const CustomExpandIcon = props => {
      if (props.expanded) {
        return (
          <div
            className='expand-row-icon'
            onClick={e => props.onExpand(props.record, e)}
          >
            <Icon type='caret-up' />
            收起专业
          </div>
        );
      } else {
        return (
          <div
            className='expand-row-icon'
            onClick={e => props.onExpand(props.record, e)}
          >
            <Icon type='caret-down' />
            查看专业
          </div>
        );
      }
    };

    return (
      <div>
        <Table
          rowKey={record => record.school_id}
          columns={columns}
          dataSource={this.props.schoolList}
          onExpand={this.onExpand}
          expandIcon={CustomExpandIcon}
          expandedRowRender={record => (
            <SubTableController
              key={record.school_id}
              schoolId={record.school_id}
              style={{ margin: 0 }}
            />
          )}
        />
        <Drawer
          width={640}
          placement='right'
          closable={false}
          onClose={() => {
            this.setState({ schoolDrawerVisible: false });
          }}
          visible={this.state.schoolDrawerVisible}
        >
          <SchoolDetailController />
        </Drawer>
      </div>
    );
  }

  handleSchoolChange = (value, record) => {
    this.props.recordSchool({
      changeVolunteerId: value,
      schoolData: record
    });
  };

  showSchoolDetail = record => {
    this.props.showSchoolDetail(record.school_id);
    this.setState({ schoolDrawerVisible: true });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { schoolList, schoolTableLoading, voluntary } = voluntaryStore;

  return {
    schoolList,
    schoolTableLoading,
    voluntary: [...voluntary]
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    deleteVoluntary: params => {
      dispatch(voluntaryActions.deleteVoluntary(params));
    },
    recordSchool: params => {
      dispatch(voluntaryActions.recordSchool(params));
    },
    showSchoolDetail: params => {
      dispatch(schoolActions.showSchoolDetail(params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableController);
