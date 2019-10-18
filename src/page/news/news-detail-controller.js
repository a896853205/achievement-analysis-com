import React from 'react';

import { Link } from 'react-router-dom';

import moment from 'moment';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// css样式
import '@/style/news/news-detail.css';
import { Divider, Icon, Skeleton } from 'antd';

// 路由
import { NEWS_DETAIL } from '@/constants/route-constants';

class NewsDetailController extends React.Component {
  state = {
    newsTitle: '',
    createTime: '',
    from: '',
    newsContent: '',
    viewTimes: '',
    recommendNews: [],
    hotNews: [],
    loading: false
  };
  render() {
    return (
      <div className='page-inner-width-box news-detail-box'>
        {/* 文章主体板块 */}
        <div className='news-detail-left-box'>
          <Skeleton active loading={this.state.loading}>
            <div>
              <h5>{this.state.newsTitle}</h5>
              <div className='news-describe-box'>
                <span>
                  {moment(this.state.createTime).format('MM-DD h:mm')}
                </span>
                <Divider type='vertical' />
                <span>来源:{this.state.from}</span>
                <Divider type='vertical' />
                <span>
                  <Icon type='eye' />
                  {this.state.viewTimes}
                </span>
              </div>
              <div
                className='news-content-box'
                dangerouslySetInnerHTML={{
                  __html: this.state.newsContent
                }}
              />
            </div>
          </Skeleton>
          <Skeleton active loading={this.state.loading}>
            <div>
              <p>推荐阅读</p>
              <ul>
                {this.state.recommendNews.map(item => (
                  <Link
                    key={item.uuid}
                    to={{
                      pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`
                    }}
                  >
                    <li className='recommed-news-li'>{item.title}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </Skeleton>
        </div>
        {/* 热门文章板块 */}
        <div className='news-detail-right-box'>
          <div className='news-hot-title-box'>
            <h4>热门文章</h4> <span>更多</span>
          </div>
          <Skeleton active loading={this.state.loading}>
            <ul className='news-hot-ul'>
              {this.state.hotNews.map(item => (
                <Link
                  key={item.uuid}
                  to={{
                    pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`
                  }}
                >
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </Skeleton>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    // 获取url上的新闻uuid
    let { uuid, type } = this.props.match.params;

    await this.setState({
      loading: true
    });
    // 调用查询新闻详细信息的接口
    let [newsData, recommendNews, hotNews] = await Promise.all([
      launchRequest(APIS.GET_NEWS_DETAIL, {
        uuid
      }),
      launchRequest(APIS.GET_RECOMMEND_NEWS, {
        type
      }),
      launchRequest(APIS.GET_HOT_NEWS)
    ]);

    await this.setState({
      newsTitle: newsData.title,
      createTime: newsData.createTime,
      from: newsData.from,
      newsContent: newsData.content,
      viewTimes: newsData.viewTimes,
      recommendNews,
      hotNews
    });

    // 防闪烁
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 500);
  };

  componentWillReceiveProps = async nextProps => {
    if (
      nextProps.match.params.uuid !== this.props.match.params.uuid ||
      nextProps.match.params.type !== this.props.match.params.type
    ) {
      await this.setState({
        loading: true
      });

      let { uuid, type } = nextProps.match.params,
        [newsData, recommendNews] = await Promise.all([
          launchRequest(APIS.GET_NEWS_DETAIL, {
            uuid
          }),
          launchRequest(APIS.GET_RECOMMEND_NEWS, {
            type
          })
        ]);

      await this.setState({
        newsTitle: newsData.title,
        createTime: newsData.createTime,
        from: newsData.from,
        newsContent: newsData.content,
        viewTimes: newsData.viewTimes,
        recommendNews
      });

      // 防闪烁
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 500);
    }
  };
}

export default NewsDetailController;
