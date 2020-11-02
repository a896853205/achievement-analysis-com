import React, { useEffect, useState } from 'react';

import { Icon } from 'antd';

import moment from 'moment';

// 路由
import { Link } from 'react-router-dom';

// 路由
import { NEWS_DETAIL, NEWS_MORE } from '@/constants/route-constants';

export default function IndexRankShowNewsList(props) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    let _newsList = props.newsList.map((item, index) => {
      return (
        <Link
          to={{
            pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`,
          }}
          key={item.uuid}
        >
          <li>
            <img src={item.profilePicUrl} alt='' />
            <div className='index-rank-detail-box'>
              <h5>{item.title}</h5>
              <p>
                <span className='school-information-time-box'>
                  <Icon type='clock-circle' />{' '}
                  {moment(item.createTime).format('MM-DD h:mm')}
                </span>
                <span className='school-information-see-box'>
                  <Icon type='eye' /> {item.viewTimes}
                </span>
              </p>
            </div>
          </li>
        </Link>
      );
    });

    setNewsList(_newsList);
  }, [props.newsList]);

  return (
    <div className='index-rank-show-box'>
      <h2 className='h2-title-box'>
        <span className='index-h2-title'>
          <Icon
            type='bar-chart'
            style={{
              color: '#3CC6FC',
            }}
          />
          排名集锦
        </span>
        <Link
          to={{
            pathname: `/${NEWS_MORE.path}/4`,
          }}
        >
          <span className='index-more'>
            更多 <Icon type='right' />
          </span>
        </Link>
      </h2>
      <ul>{newsList}</ul>
    </div>
  );
}
