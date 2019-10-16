import React from 'react';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

class NewsDetailController extends React.Component {
  render() {
    return <div>NewsDetailController</div>;
  }

  componentDidMount = async () => {
    // 获取url上的新闻uuid
    let { uuid, type } = this.props.match.params;

    // 调用查询新闻详细信息的接口
    let data = await launchRequest(APIS.GET_NEWS_DETAIL, {
      uuid
    });

    console.log(data);
    console.log(type);
  };
}
export default NewsDetailController;
