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
          <li>
            <Icon
              type='right-square'
              theme='filled'
              className='student-must-read-icon'
            />
            {item.title}
          </li>
        </Link>
      );
    });

    setNewsList(_newsList);
  }, [props.newsList]);

  return (
    <div className='student-must-read-box'>
      <h2 className='h2-title-box'>
        <span className='index-h2-title'>
          <Icon type='book' /> 考生必读
        </span>
        <Link
          to={{
            pathname: `/${NEWS_MORE.path}/3`
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
};
