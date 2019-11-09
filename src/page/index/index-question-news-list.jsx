import React, { useEffect, useState } from 'react';

import { Icon } from 'antd';

// 路由
import { Link } from 'react-router-dom';

// 路由
import { NEWS_DETAIL, NEWS_MORE } from '@/constants/route-constants';

export default props => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    let _newsList = props.newsList.map((item, index) => {
      return (
        <Link
          to={{
            pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`
          }}
          key={item.uuid}
        >
          <li>{item.title}</li>
        </Link>
      );
    });

    setNewsList(_newsList);
  }, [props.newsList]);

  return (
    <div>
      <h2 className='h2-title-box'>
        <span className='index-h2-title'>
          <Icon
            type='question-circle'
            theme='filled'
            style={{ color: '#18C218' }}
          />
          高考百问
        </span>
        <Link
          to={{
            pathname: `/${NEWS_MORE.path}/5`
          }}
        >
          <span className='index-more'>
            更多 <Icon type='right' />
          </span>
        </Link>
      </h2>
      <ul className='index-question-ul-box'>{newsList}</ul>
    </div>
  );
};
