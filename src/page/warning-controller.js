import React from 'react';

// css
import '../style/warning-controller.css';

// UI组件
import { Modal, Button, Spin } from 'antd';

// 工具类
import wait from '@/util/wait-helper';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';
import * as DominConfigs from '@/constants/domin-constants';

class WarningController extends React.Component {
  state = {
    visible: !sessionStorage.getItem('noWarning'),
    loading: false,
    warningList: [],
  };

  render() {
    const { visible, warningList, loading } = this.state;
    return (
      <div>
        <Modal
          title='报考须知'
          centered
          closable={false}
          visible={visible}
          footer={[
            <Button type='primary' key='ok' onClick={this.handleCancel}>
              我知道了
            </Button>,
          ]}
        >
          <Spin spinning={loading}>
            {warningList.map(({ warning_content: item }) => {
              return (
                <p className='warning-info' key={item}>
                  {item}
                </p>
              );
            })}
          </Spin>
        </Modal>
      </div>
    );
  }

  handleCancel = (e) => {
    sessionStorage.setItem('noWarning', 1);
    this.setState({
      visible: false,
    });
  };

  componentDidMount = async () => {
    await this.setState({
      loading: true,
    });

    let [data] = await Promise.all([
      launchRequest(APIS.GET_WARNING_DATA, {}, DominConfigs.REQUEST_TYPE.GET),
      //防闪烁
      wait(500),
    ]);

    this.setState({ warningList: data });

    await this.setState({
      loading: false,
    });
  };
}

export default WarningController;
