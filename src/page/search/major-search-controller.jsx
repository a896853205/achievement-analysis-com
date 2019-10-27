import React, { useEffect, useState } from 'react';

// 路由
import { Link } from 'react-router-dom';
import { MAJOR_DETAIL } from '@/constants/route-constants';

// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';

// 自定义函数
import wait from '@/util/wait-helper';

import { Skeleton } from 'antd';

// UI 样式
import '@/style/search/major-search.css';

export default props => {
  return (
    <div className='page-inner-width-box major-search-box'>
      <div className='major-search-left-box'>
        <MajorCategory />
      </div>
      <div className='major-search-right-box'>
        {/* 大家都在报 */}
        <HotMajor />
        {/* 就业前景 */}
        {/* <div className='employment-major-feature-box'>
          <h4>就业前景</h4>
          <ul>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
            <li>
              <span className='major-num'>1</span>
              <span>电气工程与智能控制</span>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

const MajorCategory = props => {
  const [majorCategory, setMajorCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [majorCategory] = await Promise.all([
        launchRequest(APIS.GET_MAJOR_CATEGORY),
        wait(500)
      ]);

      setMajorCategory(majorCategory);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Skeleton loading={loading}>
        {majorCategory.map(item => (
          <div
            key={item.major_category_code}
            className='major-category-one-level-item-box'
          >
            <h4>
              <span>
                {item.name}({item.major_category_code})
              </span>
              <span className='major-category-detail-span'>
                <span>{item.data.length} 个专业类，</span>
                <span>
                  {(() => {
                    let totalNum = 0;
                    item.data.map(item => (totalNum += item.data.length));
                    return totalNum;
                  })()}
                  个本科专业
                </span>
              </span>
            </h4>
            {item.data.map(oneLevelItem => (
              <div
                key={oneLevelItem.major_level_one_code}
                className='major-category-two-level-item-box'
              >
                <h5>
                  <span>
                    {oneLevelItem.name}({oneLevelItem.major_level_one_code})
                  </span>
                  <span className='major-category-detail-span'>
                    {oneLevelItem.data.length}个专业
                  </span>
                </h5>
                <ul className='major-category-three-level-item-box'>
                  {oneLevelItem.data.map(twoLevelItem => (
                    <li key={twoLevelItem.major_level_two_code}>
                      <Link
                        to={{
                          pathname: `/${MAJOR_DETAIL.path}/${twoLevelItem.major_level_two_code}`
                        }}
                      >
                        {twoLevelItem.major_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </Skeleton>
    </div>
  );
};

const HotMajor = props => {
  const [hotMajors, setHotMajors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [hotMajors] = await Promise.all([
        launchRequest(APIS.GET_HOT_MAJORS),
        wait(500)
      ]);

      setHotMajors(hotMajors);
      setLoading(false);
    })();
  }, []);

  return (
    <div className='people-selected-major-box'>
      <Skeleton loading={loading}>
        <h4>大家都在报</h4>
        <ul>
          {hotMajors.map((item, index) => (
            <Link
              to={{
                pathname: `/${MAJOR_DETAIL.path}/${item.major_level_two_code}`
              }}
              key={item.major_level_two_code}
            >
              <li>
                <span className='major-num'>{index + 1}</span>
                <span>{item.major_name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
};
