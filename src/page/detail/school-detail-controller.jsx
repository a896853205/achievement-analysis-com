import React from 'react';

// 路由
import { Link } from 'react-router-dom';

// UI样式
import '@/style/detail/school-detail.css';
import { Icon } from 'antd';

export default () => {
  return (
    <div className='school-detail-box page-inner-width-box'>
      {/* 学校详情头部数据 */}
      <div className='school-detail-top-box'>
        <div className='school-detail-title-box'>
          <h2 className='school-detail-title'>清华大学</h2>
          <span className='shool-detail-property-tag'>985</span>
          <span className='shool-detail-property-tag'>双一流</span>
          <span className='shool-detail-property-tag'>211</span>
        </div>
        <div className='school-detail-describe-box'>
          <img
            src='https://cdn.dribbble.com/users/1207383/screenshots/6711883/college-night.png'
            alt=''
          />
          <div className='describe-right-box'>
            <ul>
              <li>
                <Icon
                  className='describe-icon'
                  type='clock-circle'
                  theme='twoTone'
                  twoToneColor='#ff6666'
                />
                <span>1911</span>
              </li>
              <li>
                <Icon className='describe-icon' type='bank' theme='twoTone' />
                <span>公立</span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='appstore'
                  theme='twoTone'
                  twoToneColor='#52c41a'
                />
                <span>综合</span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='schedule'
                  theme='twoTone'
                  twoToneColor='#ffA02C'
                />
                <span>教育部</span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='bulb'
                  theme='twoTone'
                  twoToneColor='#9988ff'
                />
                <span>本科</span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='environment'
                  theme='twoTone'
                  twoToneColor='#ffA02C'
                />
                <span>北京</span>
              </li>
            </ul>
            <p className='describe-profile-box'>
              北京大学创办于1898年，初名京师大学堂，是中国第一所国立综合性大学，也是当时中国最高教育行政机关。辛亥革命后，于1912年改为现名。　　
              作为新文化运动的中心和“五四”运动的策源地，作为中国最早传播马克思主义和民主科学思想的发祥地，作为中国共产党最早的活动基地，北京大学为民族的振兴和解放、...
              <Link>
                <span className='describe-profile-more'>全部</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* 学校详情左边数据 */}
      <div className='school-detail-left-box'>
        {/* 招生简章 */}
        <div className='school-detail-item-box'>
          <h3 className='school-detail-item-title'>招生简章</h3>
          <ul>
            <li>
              <h5>复旦大学2019年招生章程</h5>
              <span>
                <span>2019/06/15</span>
                <span>浏览 367</span>
              </span>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {/* 院校分数线 */}
        <div className='school-detail-item-box'>
          <h3 className='school-detail-item-title'>院校分数线</h3>
          {/* Select */}
          {/* Table */}
        </div>
      </div>
      {/* 学校详情右边数据 */}
      <div className='school-detail-right-box'>
        {/* 大学详情右边数据 */}
        <div className='school-detail-item-box'>
          <h3 className='school-detail-item-title'>大学排名</h3>
          <div className='school-detail-rank-box'>
            <div className='rank-item'>
              <span className='rank-num'>7</span>
              <span className='rank-name'>武书连</span>
            </div>
            <div className='rank-item'>
              <span className='rank-num'>5</span>
              <span className='rank-name'>软科</span>
            </div>
            <div className='rank-item'>
              <span className='rank-num'>4</span>
              <span className='rank-name'>校友会</span>
            </div>
            <div className='rank-item'>
              <span className='rank-num'>3</span>
              <span className='rank-name'>QS</span>
            </div>
            <div className='rank-item'>
              <span className='rank-num'>5</span>
              <span className='rank-name'>USNews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
