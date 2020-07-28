import React from 'react';

// css
import '../../../style/voluntary/step3.css';

// UI组件
import { Collapse, Button, Icon, Modal, Tabs, Spin, Affix,message } from 'antd';

// 自定义组件
import SchoolFirstController from './step3/school-first-controller';
import MajorFirstController from './step3/major-first-controller';
import PointSchoolController from './step3/point-school-controller';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';
import { BCG_ROOT_NAME, VOLUNTARY_DETAIL } from '../../../constants/route-constants';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { confirm } = Modal;

class Step3Controller extends React.Component {
  state = {
    isFold: false,
    loading: false,
    saveLoading: false
  };

  render() {
    // 右侧志愿表的删除UI
    const genExtra = voluntaryItem => (
      <Icon
        type='delete'
        onClick={event => {
          confirm({
            title: '删除志愿信息',
            content: '您确定删除该志愿的信息吗?',
            okType: 'danger',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              this.props.deleteVoluntary(voluntaryItem.five_volunteer_id);
            },
            onCancel() {}
          });
          event.stopPropagation();
        }}
      />
    );

    return (
      <div className='step3-box'>
        <div className='content'>
          <div
            className='content-right'
            style={{ right: this.state.isFold ? '0' : '-460px' }}
          >
            <Affix offsetTop={10}>
              <div className='right-affix-box'>
                <button
                  disabled={this.props.schoolTableLoading}
                  onClick={this.switchVoluntaryTable}
                  className='show-voluntary-btn btn-transition-blue-background'
                >
                  {this.state.isFold ? (
                    <span>
                      <Icon type='right' />
                      收起志愿表
                      <Icon type='right' />
                    </span>
                  ) : (
                    <span>
                      <Icon type='left' />
                      展开志愿表
                      <Icon type='left' />
                    </span>
                  )}
                </button>
                <div className='affix-collapse-box'>
                  <Collapse bordered={true}>
                    {this.props.voluntary[this.props.lot_id]
                      ? this.props.voluntary[this.props.lot_id].map(
                          voluntaryItem => (
                            <Panel
                              header={`${voluntaryItem.volunteer_name} ${voluntaryItem.schoolName}`}
                              key={voluntaryItem.five_volunteer_id}
                              extra={genExtra(voluntaryItem)}
                            >
                              {voluntaryItem.major.map((majorItem, index) => (
                                <div
                                  key={index}
                                  style={{ paddingLeft: 24 }}
                                >{`专业${index + 1} ${
                                  majorItem.majorName
                                }`}</div>
                              ))}
                            </Panel>
                          )
                        )
                      : undefined}
                  </Collapse>
                  <Button
                    className='btn-large btn-transition-blue-background'
                    style={{ width: '100%' }}
                    size='large'
                    type='primary'
                    onClick={this.handleClickSaveVoluntary}
                    loading={this.state.saveLoading}
                  >
                    保存
                  </Button>
                  <Button
                    loading={this.state.loading}
                    className='btn-large btn-transition-blue-background'
                    style={{ width: '100%' }}
                    size='large'
                    type='primary'
                    onClick={this.handleClickCheckVoluntary}
                  >
                    查看志愿表
                  </Button>
                </div>
              </div>
            </Affix>
          </div>

          <div className='content-left'>
            <Spin
              tip='数据量较大,请耐心等待'
              delay={200}
              spinning={this.props.schoolTableLoading}
            >
              <Tabs
                className='content-box'
                defaultActiveKey='1'
                onChange={this.handleChangeTabsKey}
                type='card'
              >
                <TabPane tab='院校优先' key='1'>
                  <SchoolFirstController />
                </TabPane>
                <TabPane tab='专业优先' key='2'>
                  <MajorFirstController />
                </TabPane>
                <TabPane tab='指定院校' key='3'>
                  <PointSchoolController />
                </TabPane>
              </Tabs>
            </Spin>
          </div>
        </div>
        <div className='voluntarty-button-box'>
          <Button
            loading={this.state.loading}
            className='btn-large btn-transition-blue-background'
            style={{ marginTop: '20px' }}
            size='large'
            type='primary'
            onClick={this.handleClickCheckVoluntary}
          >
            查看志愿表
          </Button>
        </div>
      </div>
    );
  }

  handleChangeTabsKey = key => {
    this.props.recordVoluntaryType(parseInt(key));
    this.props.recordSchoolList();
  };

  handleClickCheckVoluntary = async () => {
    this.setState({
      loading: true
    });
    launchRequest(APIS.SAVE_TEMP_VOLUNTARY, {
      voluntary: this.props.voluntary
    }).then(res=>{
      if(res){
        this.setState({
          loading: false
        });
        this.props.recordVoluntaryDetail(this.props.voluntary[this.props.lot_id]);
        // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
        // this.props.nextStep();
        this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_DETAIL.path}/${this.props.lot_id}`);
      }
    }).catch(err=>{
      console.log(err);
      this.setState({
        loading: false
      });
      message.error('查询失败，请重试一次');
    });
  };
  // 暂存函数
  handleClickSaveVoluntary = () => {
    this.setState({
      saveLoading:true
    });
    // saveMyVoluntary
    launchRequest(APIS.SAVE_TEMP_VOLUNTARY, {
      voluntary: this.props.voluntary
    }).then(res => {
      if (res) {
        this.setState({
          saveLoading: false
        });
      }
    }).catch(err => {
      console.log(err);
      this.setState({
        saveLoading:false
      });
      message.error('保存失败，请重试一次');
    });
  };

  async componentDidMount() {
    this.props.setLotId(+this.props.match.params.lotId);
  }


  // 打开或收起志愿表
  switchVoluntaryTable = async ()=>{
    const lotId = this.props.lot_id;
    // console.log(this.props.voluntary[lotId], lotId, 44444444);
    if(this.props.voluntary[lotId].length===0){
      // 进到这里就说明出bug了
      console.log('aaaaa','整活');
      // 重新走一遍逻辑
      const voluntary  = await launchRequest(APIS.GET_TEMP_VOLUNTARY);
      const { voluntaryOptionList } = await launchRequest(APIS.GET_SCHOOL_OPTION, {
        lotId
      });
      // 先判断是否有暂存
      if (voluntary && voluntary[this.props.lot_id] && voluntary[this.props.lot_id].length) {
        console.log('赋值voluntary',555);
        this.props.recordVoluntary(voluntary);
      } else {
        // 然后再判断每个批次的表格是否有基础信息
        console.log('赋值voluntaryOptionList',555);
        this.props.initVoluntary(voluntaryOptionList);
      }
    }


    this.setState({
      isFold: !this.state.isFold
    })
  }

}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { voluntary, schoolTableLoading, lot_id } = voluntaryStore;

  return {
    voluntary: [...voluntary],
    schoolTableLoading,
    lot_id
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntary: params => {
      dispatch(voluntaryActions.recordVoluntary(params));
    },
    initVoluntary: params => {
      dispatch(voluntaryActions.initVoluntary(params));
    },
    deleteVoluntary: params => {
      dispatch(voluntaryActions.deleteVoluntary(params));
    },
    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    },
    recordVoluntaryDetail: params => {
      dispatch(voluntaryActions.recordVoluntaryDetail(params));
    },
    // 查数据库
    recordSchoolList: params => {
      dispatch(voluntaryActions.recordSchoolList(params));
    },
    recordVoluntaryType: params => {
      dispatch(voluntaryActions.recordVoluntaryType(params));
    },
    setLotId: lotId => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3Controller);
