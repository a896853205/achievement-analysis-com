import React from 'react';

// UI组件
import { Select, Button, Icon, Table, Modal, Tag, Tooltip } from 'antd';

// 自定义组件
import SubTableController from './sub-table-controller';
import SchoolDetailController from '../../../detail/school-detail-controller.jsx';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';
import { actions as schoolActions } from '../../../../redux/school-model';

const { Option } = Select;

class TableController extends React.Component {
  state = {
    // 抽屉显示
    schoolDrawerVisible: false,
    schoolId: 0
  };
  render() {
    // 表格表头，带备注（三批合并到二批，需区分一下）
    const columns = [
      {
        title: '院校名称',
        dataIndex: 'school_name',
        key: 'schoolName',
        align: 'center',
        render: (text, record) => (
          <span
            onClick={() => {
              this.showSchoolDetail(record);
            }}
            style={{ cursor: 'pointer' }}
          >
            {text}
          </span>
        )
      },
      {
        title: '备注',
        dataIndex: 'lot_id',
        key: 'school_remark',
        align: 'center',
        width: 80,
        render: text => (
          <span>{text === 4 ? '二批':'原三批'}</span>
        )
      },
      {
        title: '地区',
        dataIndex: 'province_name',
        key: 'province_name',
        align: 'center'
      },
      {
        title: '招生人数',
        dataIndex: 'enrollment',
        key: 'enrollment',
        align: 'center',
        render: text => (text ? <span>{text}</span> : <span>-</span>)
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
            查看
          </Button>
        )
      },
      {
        title: '历年位次/分数',
        width: 240,
        children: [
          {
            title: this.props.user.examYear - 1,
            key: 'oldOneScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 1
              );
              if (cerrctObj) {
                return <span>{`${cerrctObj.rank ? cerrctObj.rank : '-'}/${cerrctObj.score ? cerrctObj.score : '-'}`}</span>;
              } else {
                return <span>-</span>;
              }
            }
          },
          {
            title: this.props.user.examYear - 2,
            key: 'oldTwoScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 2
              );
              if (cerrctObj) {
                return <span>{`${cerrctObj.rank ? cerrctObj.rank : '-'}/${cerrctObj.score ? cerrctObj.score : '-'}`}</span>;
              } else {
                return <span>-</span>;
              }
            }
          },
          {
            title: this.props.user.examYear - 3,
            key: 'oldThreeScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 3
              );
              if (cerrctObj) {
                return <span>{`${cerrctObj.rank ? cerrctObj.rank : '-'}/${cerrctObj.score ? cerrctObj.score : '-'}`}</span>;
              } else {
                return <span>-</span>;
              }
            }
          }
        ]
      },

      {
        title: () => (
          <Tooltip title='综合考虑院校位次/线差的波动幅度、趋势以及院校的招生计划变化情况。'>
            <span>
              风险系数
              <Icon type='question-circle' />
            </span>
          </Tooltip>
        ),
        dataIndex: 'riskRate',
        key: 'riskRate',
        align: 'center',
        render: text => {
          switch (text) {
            case 1:
              return <Tag color='green'>低</Tag>;
            case 2:
              return <Tag color='blue'>中</Tag>;
            case 3:
              return <Tag color='red'>高</Tag>;
            default:
              return <Tag color='purple'>未知</Tag>;
          }
        },
        defaultSortOrder: 'descend',
        sorter: (a, b) => b.riskRate - a.riskRate
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
              this.props.voluntary[this.props.lot_id]
                ? this.props.voluntary[this.props.lot_id].find(
                    voluntaryItem => {
                      return voluntaryItem.schoolId === record.school_id;
                    }
                  )
                  ? this.props.voluntary[this.props.lot_id].find(
                      voluntaryItem => {
                        return voluntaryItem.schoolId === record.school_id;
                      }
                    ).five_volunteer_id
                  : undefined
                : undefined
            }
          >
            {this.props.voluntary[this.props.lot_id]
              ? this.props.voluntary[this.props.lot_id].map(voluntaryItem => (
                  <Option
                    key={voluntaryItem.five_volunteer_id}
                    value={voluntaryItem.five_volunteer_id}
                  >
                    {voluntaryItem.volunteer_name}
                  </Option>
                ))
              : undefined}
          </Select>
        )
      }
    ];

    // 不带备注
    const columns2 = [
      {
        title: '院校名称',
        dataIndex: 'school_name',
        key: 'schoolName',
        align: 'center',
        render: (text, record) => (
          <span
            onClick={() => {
              this.showSchoolDetail(record);
            }}
            style={{ cursor: 'pointer' }}
          >
            {text}
          </span>
        )
      },
      {
        title: '地区',
        dataIndex: 'province_name',
        key: 'province_name',
        align: 'center'
      },
      {
        title: '招生人数',
        dataIndex: 'enrollment',
        key: 'enrollment',
        align: 'center',
        render: text => (text ? <span>{text}</span> : <span>-</span>)
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
            查看
          </Button>
        )
      },
      {
        title: '历年位次/分数',
        width: 240,
        children: [
          {
            title: this.props.user.examYear - 1,
            key: 'oldOneScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 1
              );
              if (cerrctObj) {
                return <span>
                  <p>
                    {`${cerrctObj.rank ? cerrctObj.rank : '-'} /${cerrctObj.score ? cerrctObj.score : '-'}`}
                </p>
               </span>;
              } else {
                return <span>-</span>;
              }
            }
          },
          {
            title: this.props.user.examYear - 2,
            key: 'oldTwoScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 2
              );
              if (cerrctObj) {
                return <span>{`${cerrctObj.rank ? cerrctObj.rank : '-'}/${cerrctObj.score ? cerrctObj.score : '-'}`}</span>;
              } else {
                return <span>-</span>;
              }
            }
          },
          {
            title: this.props.user.examYear - 3,
            key: 'oldThreeScore',
            width: 80,
            render: record => {
              let cerrctObj = record.scoreAndRank.find(
                item => item.year === this.props.user.examYear - 3
              );
              if (cerrctObj) {
                return <span>{`${cerrctObj.rank ? cerrctObj.rank : '-'}/${cerrctObj.score ? cerrctObj.score : '-'}`}</span>;
              } else {
                return <span>-</span>;
              }
            }
          }
        ]
      },

      {
        title: () => (
          <Tooltip title='综合考虑院校位次/线差的波动幅度、趋势以及院校的招生计划变化情况。'>
            <span>
              风险系数
              <Icon type='question-circle' />
            </span>
          </Tooltip>
        ),
        dataIndex: 'riskRate',
        key: 'riskRate',
        align: 'center',
        render: text => {
          switch (text) {
            case 1:
              return <Tag color='green'>低</Tag>;
            case 2:
              return <Tag color='blue'>中</Tag>;
            case 3:
              return <Tag color='red'>高</Tag>;
            default:
              return <Tag color='purple'>未知</Tag>;
          }
        },
        defaultSortOrder: 'descend',
        sorter: (a, b) => b.riskRate - a.riskRate
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
              this.props.voluntary[this.props.lot_id]
                ? this.props.voluntary[this.props.lot_id].find(
                voluntaryItem => {
                  return voluntaryItem.schoolId === record.school_id;
                }
                )
                ? this.props.voluntary[this.props.lot_id].find(
                  voluntaryItem => {
                    return voluntaryItem.schoolId === record.school_id;
                  }
                ).five_volunteer_id
                : undefined
                : undefined
            }
          >
            {this.props.voluntary[this.props.lot_id]
              ? this.props.voluntary[this.props.lot_id].map(voluntaryItem => (
                <Option
                  key={voluntaryItem.five_volunteer_id}
                  value={voluntaryItem.five_volunteer_id}
                >
                  {voluntaryItem.volunteer_name}
                </Option>
              ))
              : undefined}
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
          style={{ background: '#fff' }}
          rowKey={record => record.school_id}
          columns={this.props.lot_id === 4 ? columns : columns2}
          dataSource={this.props.schoolList}
          onExpand={this.onExpand}
          expandIcon={CustomExpandIcon}
          bordered
          onChange={page => {
            this.props.recordPage(page.current);
          }}
          pagination={{ current: this.props.page }}
          expandedRowRender={record => (
            <SubTableController
              key={record.school_id}
              schoolId={record.school_id}
              schoolLotId={record.lot_id}
              style={{ margin: 0 }}
            />
          )}
        />
        <Modal
          style={{ minWidth: '1300px' }}
          // width={1300}
          footer={null}
          onCancel={() => {
            this.setState({ schoolDrawerVisible: false });
          }}
          visible={this.state.schoolDrawerVisible}
        >
          <SchoolDetailController schoolId={this.state.schoolId} />
        </Modal>
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
    this.setState({
      schoolId: record.school_id
    });
    // this.props.showSchoolDetail(record.school_id);
    this.setState({ schoolDrawerVisible: true });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  const userStore = store['userStore'];
  let {
    schoolList,
    schoolTableLoading,
    voluntary,
    lot_id,
    page
  } = voluntaryStore;
  let { user } = userStore;

  return {
    schoolList,
    schoolTableLoading,
    voluntary: [...voluntary],
    user,
    lot_id,
    page
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
    recordPage: params => {
      dispatch(voluntaryActions.recordPage(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableController);
