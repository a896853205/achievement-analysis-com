import React, { useRef } from 'react';
import QRCode from 'qrcode';

// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';

import { Carousel } from 'antd';

import '@/style/vip/profile.css';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default props => {
  const couterRef = useRef();
  const handleToAlipayClick = async () => {
    let url = await launchRequest(APIS.GET_ALIPAY_PAYMENT_URL);
    if (url) {
      window.open(url);
    }
  };

  const handleToWeChatClick = async () => {
    let url = await launchRequest(APIS.GET_WECHAT_PAYMENT_QR_URL);

    if (url) {
      QRCode.toCanvas(couterRef.current, url);
    }
  };
  //使用menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='page-inner-width-box vip-profile'>
      {/* 页面左部分 */}
      <div className='left-box'>
        <div className='left-top-box'>
          <div className='carousel-box'>
            <Carousel autoplay className='carousel'>
              <img src='/vip/left1.jpg' alt='' />
              <img src='/vip/left2.jpg' alt='' />
              <img src='/vip/left3.jpg' alt='' />
            </Carousel>
            <div className='carousel-list'>
              <div className='carousel-list-item'>
                <img src='/vip/left1.jpg' alt='' />
              </div>
              <div className='carousel-list-item'>
                <img src='/vip/left2.jpg' alt='' />
              </div>
              <div className='carousel-list-item'>
                <img src='/vip/left3.jpg' alt='' />
              </div>
            </div>
          </div>
          <div className='vip-card-info-box'>
            <h4>VIP志愿卡（黑龙江专用）</h4>
            <p className='card-profile'>
              考试院专家推荐平台，录取参考数据与省考试院完全一致
            </p>
            <div className='card-money-box'>
              <p>
                <span>价格</span>
                <span className='money'>¥360</span>
                <span className='origin-money'>原价¥680</span>
              </p>
              <p>
                <span className='vip-link'>查看权限</span>
              </p>
            </div>
            {/* <div className='card-type-box'>
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
            </div> */}
            <div className='buy-button-box'>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                className='buy-button'
              >
                立即购买
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleToAlipayClick}>
                  <img src='/vip/zhifubao.jpg' alt='' className='wechat' />
                  支付宝支付
                </MenuItem>
                <MenuItem onClick={handleToWeChatClick}>
                  <img src='/vip/wechat.jpg' alt='' className='wechat' />
                  微信支付
                </MenuItem>
              </Menu>

              <canvas ref={couterRef}></canvas>
              <span className='vip-link'>咨询热线: 18644091056</span>
            </div>
            <div className='vip-describe-list-box'>
              <ul>
                <li>
                  使用功能：学业测评、查数据、智能填报、志愿合理分析、就业前景分析等。
                </li>
                <li>
                  适用对象：普通类文理科考生（自主招生、专科及艺术体育类考生暂不适用）。
                </li>
                <li>使用时效：有效期截止到用户自行选择高考年的9月1日为止。</li>
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
        <img className='vip-top-adv' src='/vip/right.jpg' alt='' />
        {/* <div className='vip-middle-adv-box'>
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
        </div> */}
      </div>
    </div>
  );
};
