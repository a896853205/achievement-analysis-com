import React from 'react';

// import VoluntaryDetailController from '@/page/home/voluntary/step4/voluntary-detail-controller';
import VoluntaryDetailController from '../voluntary/step4/voluntary-detail-controller';

// 路由
import { Link } from 'react-router-dom';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '@/redux/voluntary-model';
import { actions as userActions } from '@/redux/user-model';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '../../../constants/api-constants';

// UI组件
import { Button, Modal, Alert,message } from 'antd';
import { BCG_ROOT_NAME, DEEP_REPORT, REPORT } from '../../../constants/route-constants';

const { confirm } = Modal;

class Step4Controller extends React.Component {
  state = {
    btnLoading: false,
    btnLoading2: false,
    isShow: 'none',
    errMsg: []
  };
  render() {
    return (
      <div>
        {/* 在这里显示批次之类的重要其他信息 */}
        <VoluntaryDetailController/>
        <div style={{ display: this.state.isShow }}>
          <Alert
            message="温馨提示："
            description={this.state.errMsg.toString()}
            type="warning"
            showIcon
          />
        </div>

        <div className='voluntarty-button-box'>
          <div>
            <Alert
              message={`剩余生成报表次数${this.props.user.reportAlterTime}次`}
              type='info'
              showIcon
            />
            {this.props.user.reportAlterTime ? (
              <Button
                className='btn-large btn-transition-blue-background'
                loading={this.state.btnLoading}
                onClick={this.handleClickSubmit}
                size='large'
                type='primary'
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                确认生成报表
              </Button>
            ) : (
              <Link to='/vipProfile'>
                <Button
                  className='btn-large btn-transition-blue-background'
                  size='large'
                  type='primary'
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  没有次数了,获取更多修改次数
                </Button>
              </Link>
            )}
          </div>
          <div>
            <Alert
              message={`剩余生成深度体验次数${this.props.user.deepAlterTime}次`}
              type='info'
              showIcon
            />
            {this.props.user.deepAlterTime ? (
              <Button
                className='btn-large btn-transition-blue-background'
                loading={this.state.btnLoading2}
                onClick={this.handleClickDeepSubmit}
                size='large'
                type='primary'
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                确认深度体验表
              </Button>
            ) : (
              <Link to='/vipProfile'>
                <Button
                  className='btn-large btn-transition-blue-background'
                  size='large'
                  type='primary'
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  没有次数了,获取更多修改次数
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
  checkVoulutary = voluntaryDetail => {
    // 如果选了大学，就至少选一个专业，如果没选大学，那就无所谓
    let checkResult = [];
    voluntaryDetail.forEach(item => {
      if (
        item.schoolName &&
        item.major[0].majorId === "" &&
        item.major[1].majorId === "" &&
        item.major[2].majorId === "" &&
        item.major[3].majorId === "" &&
        item.major[4].majorId === "" &&
        item.major[5].majorId === ""
      ) {
        checkResult.push(`${item.volunteer_name}下的${item.schoolName}未选任何专业  `);
      }
    });
    if (checkResult.length > 0) {
      checkResult.push(`请至少选择一个专业。`);
    }
    return checkResult;
  };
  handleClickSubmit = async () => {

    let checkResult = this.checkVoulutary(this.props.voluntaryDetail);
    if (checkResult.length > 0) {
      this.setState({
        isShow: 'block',
        errMsg: checkResult
      })
    }else {
      this.setState({
        btnLoading: true
      });
      confirm({
        title: '生成报表',
        content: '您确定生成报表吗? 生成报表会使用一次机会.',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          // 提交到后台后返回uuid
          launchRequest(APIS.SAVE_VOLUNTARY, {
            lotId: this.props.lotId,
            voluntary: this.props.voluntaryDetail,
            reportType: 1
          }).then(voluntaryId => {
            if (voluntaryId) {
              // 将uuid存入redux
              this.props.recordVoluntaryResultType('report');
              this.props.recordVoluntaryIdGetResult(voluntaryId);
              // 在这里将生成报表次数减少1
              launchRequest(APIS.UPDATE_REPORT_ALTER_TIME_DROP_1);
              this.props.getUser();
              // 结束loading
              this.setState({ btnLoading: false });
              // 跳转页面
              // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
              // this.props.nextStep();
              this.props.history.push(`/${BCG_ROOT_NAME}/${REPORT.path}/${this.props.lotId}/${voluntaryId}`);
            }
          }).catch(err => {
            console.log(err);
            message.error('生成报表失败，请重试一次');
            this.setState({ btnLoading: false });
          });
        },
        onCancel:()=> {
          this.setState({ btnLoading: false });
        }
      });
    }

  };

  handleClickDeepSubmit = async () => {
    this.setState({ btnLoading2: true });
    let checkResult = this.checkVoulutary(this.props.voluntaryDetail);
    if (checkResult.length > 0) {
      this.setState({
        isShow: 'block',
        errMsg: checkResult,
        btnLoading2: false
      })
    }else {
      confirm({
        title: '生成深度体验表',
        content: '您确定生成深度体验表吗? 生成深度体验表会使用一次机会.',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          // loading
          await this.setState({ btnLoading2: true });

          // 提交到后台后返回uuid,而且重新查询一下用户数据
          let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
            lotId: this.props.lotId,
            voluntary: this.props.voluntaryDetail,
            reportType: 2
          });


          if (voluntaryId) {
            // 将uuid存入redux
            this.props.recordVoluntaryResultType('deepReport');
            this.props.recordVoluntaryListOption(voluntaryId);
            this.props.recordVoluntaryDeepUuid(voluntaryId);

            // 在这里将深度体验次数减少1
            await launchRequest(APIS.UPDATE_DEEP_ALTER_TIME_DROP_1);

            await this.props.getUser();

            // 结束loading
            await this.setState({ btnLoading2: false });



            // 跳转页面
            // 要拆分路由，所以不再对redux中step进行维护，改用路由的方式跳转
            // this.props.nextStep();
            this.props.history.push(`/${BCG_ROOT_NAME}/${DEEP_REPORT.path}/${this.props.lotId}/${voluntaryId}`);
          } else {
            // 结束loading
            await this.setState({ btnLoading2: false });
            // 跳转到充值VIP页
          }
        },
        onCancel:()=> {
          this.setState({ btnLoading2: false });
        }
      });
    }
  };

}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'],
    voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary, voluntaryDetail } = voluntaryStore,
    { user } = userStore;

  return {
    lotId: lot_id,
    voluntary: [...voluntary],
    voluntaryDetail,
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntaryIdGetResult: params => {
      dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
    },

    nextStep: () => {
      dispatch(voluntaryActions.nextStep());
    },
    recordVoluntaryResultType: type => {
      dispatch(voluntaryActions.recordVoluntaryResultType(type));
    },
    recordVoluntaryListOption: params => {
      dispatch(voluntaryActions.recordVoluntaryListOption(params));
    },
    recordVoluntaryDeepUuid: params => {
      dispatch(voluntaryActions.recordVoluntaryDeepUuid(params));
    },
    getUser: () => {
      dispatch(userActions.getUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step4Controller);
