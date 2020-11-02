import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 请求
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 前台路由
import { NEWS_DETAIL } from '@/constants/route-constants';

// UI样式
import { Pagination, Divider, Icon, Skeleton } from 'antd';
import '@/style/news/news-more.css';

// 自定义函数
import wait from '@/util/wait-helper';

// 引用时间类
import moment from 'moment';
export default function NewsMoreController(props) {
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hotLoading, setHotLoading] = useState(true);
  const [hotNews, sethotNews] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const newsType = props.match.params.type;

  // 更多新闻列表查询
  useEffect(() => {
    (async () => {
      setLoading(true);

      let [{ moreNewsList, pageLength }] = await Promise.all([
        launchRequest(APIS.GET_MORE_NEWS, {
          page,
          type: newsType,
        }),
        // 避免闪烁
        wait(500),
      ]);

      let moreNewsListLi = moreNewsList.map((item) => {
        return <NewsLi key={item.uuid} newsData={item} />;
      });
      setNewsList(moreNewsListLi);
      setPageLength(pageLength);
      setLoading(false);
    })();
  }, [page, newsType]);

  // 热门文章
  useEffect(() => {
    (async () => {
      setHotLoading(true);

      let [hotNews] = await Promise.all([
        launchRequest(APIS.GET_HOT_NEWS),
        // 避免闪烁
        wait(500),
      ]);

      sethotNews(hotNews);
      setHotLoading(false);
    })();
  }, []);

  // 通过newsType查询多条新闻
  return (
    <div className='news-more-box page-inner-width-box'>
      <div className='news-more-left-box'>
        <Skeleton active loading={loading}>
          <ul>{newsList}</ul>
        </Skeleton>
        <Pagination
          total={pageLength}
          current={page}
          onChange={(chickPage) => {
            setPage(chickPage);
          }}
        />
      </div>
      <div className='news-more-right-box'>
        <div className='news-hot-title-box'>
          <h4>热门文章</h4> <span>更多</span>
        </div>
        <Skeleton active loading={hotLoading}>
          <ul className='news-hot-ul'>
            {hotNews.map((item) => (
              <Link
                key={item.uuid}
                to={{
                  pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`,
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

const NewsLi = (props) => {
  let {
    comeFrom,
    createTime,
    profilePicUrl,
    title,
    type,
    uuid,
    viewTimes,
  } = props.newsData;
  return (
    <li className='news-more-item-box'>
      <Link
        to={{
          pathname: `/${NEWS_DETAIL.path}/${uuid}&${type}`,
        }}
      >
        <img src={profilePicUrl} alt='' />
      </Link>
      <div>
        <Link
          to={{
            pathname: `/${NEWS_DETAIL.path}/${uuid}&${type}`,
          }}
        >
          <h5>{title}</h5>
        </Link>
        <p className='news-more-item-intro-box'>
          文章简介
          <Link
            to={{
              pathname: `/${NEWS_DETAIL.path}/${uuid}&${type}`,
            }}
          >
            阅读全文
          </Link>
        </p>
        <div className='news-more-item-detail-box'>
          <span>时间: {moment(createTime).format('MM-DD h:mm')}</span>
          <Divider type='vertical' />
          <span>来源:{comeFrom}</span>
          <Divider type='vertical' />
          <span>
            <Icon type='eye' />
            {viewTimes}
          </span>
        </div>
      </div>
    </li>
  );
};
