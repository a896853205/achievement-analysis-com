import React from 'react';

import moment from 'moment';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// css样式
import '@/style/news/news-detail.css';
import { Divider, Icon } from 'antd';

class NewsDetailController extends React.Component {
  state = {
    newsTitle: '',
    createTime: '',
    from: '',
    newsContent: '',
    viewTimes: ''
  };
  render() {
    return (
      <div className='page-inner-width-box news-detail-box'>
        {/* 文章主体板块 */}
        <div className='news-detail-left-box'>
          <div>
            <h5>{this.state.newsTitle}</h5>
            <div className='news-describe-box'>
              <span>{moment(this.state.createTime).format('MM-DD h:mm')}</span>
              <Divider type="vertical" />
              <span>来源:{this.state.from}</span>
              <Divider type="vertical" />
              <span><Icon type="eye" />{this.state.viewTimes}</span>
            </div>
            <div
              className='news-content-box'
              dangerouslySetInnerHTML={{
                __html: this.state.newsContent
              }}
            />
          </div>
          <div>
            <p>推荐阅读</p>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        {/* 热门文章板块 */}
        <div></div>
      </div>
    );
  }

  componentDidMount = async () => {
    // 获取url上的新闻uuid
    let { uuid, type } = this.props.match.params;

    // 调用查询新闻详细信息的接口
    let newsData = await launchRequest(APIS.GET_NEWS_DETAIL, {
      uuid
    });

    this.setState({
      newsTitle: newsData.title,
      createTime: newsData.createTime,
      from: newsData.from,
      newsContent: newsData.content,
      viewTimes: newsData.viewTimes
    });

    console.log(type);
  };
}

export default NewsDetailController;
