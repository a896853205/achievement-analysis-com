import React from 'react';

import { Carousel } from 'antd';

import '@/style/vip/profile.styl';

export default props => {
  return (
    <div className='page-inner-width-box vip-profile'>
      {/* 页面左部分 */}
      <div className='left-box'>
        <div className='left-top-box'>
          <div className='carousel-box'>
            <Carousel autoplay className='carousel'>
              <img
                src='https://cdn.dribbble.com/users/1537480/screenshots/7228565/media/1df88153f3e674a7baf3e13522234b3b.png'
                alt=''
              />
              <img
                src='https://cdn.dribbble.com/users/380199/screenshots/7069563/media/769211f0bae5f0342800b22361e93b22.jpg'
                alt=''
              />
            </Carousel>
            <div className='carousel-list'>
              <div className='carousel-list-item'>
                <img
                  src='https://cdn.dribbble.com/users/1537480/screenshots/7228565/media/1df88153f3e674a7baf3e13522234b3b.png'
                  alt=''
                />
              </div>
              <div className='carousel-list-item'>
                <img
                  src='https://cdn.dribbble.com/users/380199/screenshots/7069563/media/769211f0bae5f0342800b22361e93b22.jpg'
                  alt=''
                />
              </div>
              <div className='carousel-list-item'>
                <img
                  src='https://cdn.dribbble.com/users/1537480/screenshots/7228565/media/1df88153f3e674a7baf3e13522234b3b.png'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='vip-card-info-box'>
            <h4>志愿卡(VIP)</h4>
            <p className='card-profile'>
              考试院专家推荐平台，录取参考数据与省考试院完全一致
            </p>
            <div className='card-money-box'>
              <p>
                <span>价格</span>
                <span className='money'>¥360</span>
                <span className='origin-money'>原价¥698</span>
              </p>
              <p>
                <span className='vip-link'>查看权限</span>
              </p>
            </div>
            <div className='card-type-box'>
              <button>
                <span>志愿卡</span>
                <span>(VIP)</span>
              </button>
              <button>
                <span>升学卡</span>
                <span>(VIP + 全科提分)</span>
              </button>
              <button>
                <span>自主招生卡</span>
                <span>(送自招宝典)</span>
              </button>
              <button>
                <span>升学卡+自主招生卡</span>
                <span>(送自招宝典)</span>
              </button>
            </div>
            <div className='buy-button-box'>
              <button className='buy-button'>立即购买</button>
              <span className='vip-link'>咨询热线: 18644091056</span>
            </div>
            <div className='vip-describe-list-box'>
              <ul>
                <li>1. 开通志愿卡畅想查,测,填,学,问5大核心功能。</li>
                <li>
                  2. 1000部学长学姐讲专业、500部专
                  家讲志愿在线视频讲座，帮助考生科学填志愿。
                </li>
                <li>
                  3.
                  适用对象：普通类文理科考生、新高考选科类考生（提前批次、自主招生及艺术体育类考生
                  暂不适用）
                </li>
                <li>
                  4.
                  使用时效：有效期截止到用户自行选择高考年的9月1日为止（非高考年高考期间仅提供数
                  据查询）
                </li>
                <li className='vip-describe-hot-item'>
                  5. 海不提供普通类“专科批次”模拟填报服务(全端设备)
                </li>
                <li className='vip-describe-hot-item'>
                  6. 陕西不提供普通类文理“单设本科批次”模拟填报服务(全端设备)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='left-bottom-box'>
          <div className='vip-detail-nav-box'>
            <button>服务详情</button>
            <button>用户评价</button>
            <button>常见问题</button>
          </div>
          <img className='vip-detail' src='/vip/vip-detail.jpg' alt='' />
        </div>
      </div>
      {/* 页面右部分 */}
      <div className='right-box'>
        <img
          className='vip-top-adv'
          src='https://cdn.dribbble.com/users/1564335/screenshots/8341408/media/77e97bc742fd87af6eaa09fccd232191.png'
          alt=''
        />
        <div className='vip-middle-adv-box'>
          <h5>400万考生的首选，专家的认可</h5>
          <img src='/vip/vip-middle-adv.jpg' alt='' />
          <div>太和一中志愿公益讲座</div>
        </div>
        <div className='vip-bottom-adv-box'>
          <h4>成功案例</h4>
          <div className='success-list'>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
            <div>
              <img
                src='https://cdn.dribbble.com/users/25687/screenshots/8297299/media/a07ceadad0d72d3d7e38bf1915849a03.png'
                alt=''
              />
              <span>王鹏飞成功考入北京理工大学</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
