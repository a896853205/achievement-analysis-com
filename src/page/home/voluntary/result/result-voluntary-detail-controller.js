import React from 'react';

// css
import '@/style/voluntary/voluntary-detail.css';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';
import * as DominConfigs from '@/constants/domin-constants';

// 工具类
import wait from '@/util/wait-helper';

// UI
import { Card, Spin } from 'antd';
class VoluntaryDetailController extends React.Component {
  state = {
    loading: false,
    voluntaryDetail: []
  }
  render() {
    const { loading } = this.state
    return (
      <Spin spinning={loading}>
        <div className='voluntary-detail-box'>
        {this.state.voluntaryDetail.map(voluntaryItem => (
          <Card
            className='voluntary-card'
            title={`${voluntaryItem.volunteer_name} ${voluntaryItem.name}`}
            key={voluntaryItem.fk_five_volunteer_id}
            style={{ width: 300 }}
            headStyle={{
              background: '#0E407B',
              color: '#fff'
            }}
          >
            {voluntaryItem.major.map((majorItem, index) => (
              <p key={index}>{`专业${index + 1} ${majorItem.majorName}`}</p>
            ))}
          </Card>
        ))}
        </div>
      </Spin>
      
    );
  }

  componentDidMount = async () => {
    await this.setState({
      loading: true
    });

    let [data]= await Promise.all([
      launchRequest(APIS.GET_VOLUNTARY_SCHOOL_AND_MAJOR, {voluntaryUuid:this.props.schoolAndMajorUuid}, DominConfigs.REQUEST_TYPE.GET),
      //防闪烁
      wait(500)
    ]);
    
    await this.setState({
      loading: false,
      voluntaryDetail: data
    });
    
  }
}



export default VoluntaryDetailController;
