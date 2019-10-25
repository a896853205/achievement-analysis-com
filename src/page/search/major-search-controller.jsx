import React from 'react';

// 路由
import { Link } from 'react-router-dom';
import { MAJOR_DETAIL } from '@/constants/route-constants';

// UI 样式
import '@/style/search/major-search.css';
export default props => {
  return (
    <div className='page-inner-width-box major-search-box'>
      <div className='major-search-left-box'>
        <div className='major-category-one-level-item-box'>
          <h4>
            <span>哲学(01)</span>
            <span className='major-category-detail-span'>
              <span>6 个专业类，</span>
              <span>>43 个本科专业</span>
            </span>
          </h4>
          <div className='major-category-two-level-item-box'>
            <h5>
              <span>法学类(0301)</span>
              <span className='major-category-detail-span'>7个专业</span>
            </h5>
            <ul className='major-category-three-level-item-box'>
              <li>
                <Link
                  to={{
                    pathname: `/${MAJOR_DETAIL.path}/1`
                  }}
                >
                  知识产权
                </Link>
              </li>
              <li>法学</li>
              <li>监狱学</li>
              <li>信用风险管理与法律防控</li>
              <li>国际经贸规则</li>
              <li>司法警察学</li>
              <li>社区矫正</li>
            </ul>
          </div>
        </div>
        <div className='major-category-one-level-item-box'>
          <h4>
            <span>哲学(01)</span>
            <span className='major-category-detail-span'>
              <span>6 个专业类，</span>
              <span>>43 个本科专业</span>
            </span>
          </h4>
          <div className='major-category-two-level-item-box'>
            <h5>
              <span>法学类(0301)</span>
              <span className='major-category-detail-span'>7个专业</span>
            </h5>
            <ul className='major-category-three-level-item-box'>
              <li>知识产权</li>
              <li>法学</li>
              <li>监狱学</li>
              <li>信用风险管理与法律防控</li>
              <li>国际经贸规则</li>
              <li>司法警察学</li>
              <li>社区矫正</li>
            </ul>
          </div>
        </div>
        <div className='major-category-one-level-item-box'>
          <h4>
            <span>哲学(01)</span>
            <span className='major-category-detail-span'>
              <span>6 个专业类，</span>
              <span>>43 个本科专业</span>
            </span>
          </h4>
          <div className='major-category-two-level-item-box'>
            <h5>
              <span>法学类(0301)</span>
              <span className='major-category-detail-span'>7个专业</span>
            </h5>
            <ul className='major-category-three-level-item-box'>
              <li>知识产权</li>
              <li>法学</li>
              <li>监狱学</li>
              <li>信用风险管理与法律防控</li>
              <li>国际经贸规则</li>
              <li>司法警察学</li>
              <li>社区矫正</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='major-search-right-box'>
        {/* 大家都在报 */}
        <div className='people-selected-major-box'>
          <h4>大家都在报</h4>
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
        </div>
        {/* 就业前景 */}
        <div className='employment-major-feature-box'>
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
        </div>
      </div>
    </div>
  );
};
