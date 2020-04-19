import React from 'react';

// css
import '../style/footer.css';

// UI
import { Icon } from 'antd';

class FooterController extends React.Component {
  render() {
    return (
      <div className='footer-box'>
        <div className='footer-first-list-box page-inner-width-box'>
          <img
            className='footer-logo'
            src='/images/footer/logo.png'
            alt='logo'
          />
          <div className='footer-list-item'>
            <h5 className='footer-list-title'> 智赢VIP </h5>{' '}
            <ul>
              <li> 升级VIP </li> <li> 激活 </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className='footer-list-item'>
            <h5 className='footer-list-title'> 官方说明 </h5>{' '}
            <ul>
              <li> 意见反馈 </li>{' '}
              <li>
                {' '}
                <a style={{ color: 'white' }} href='/pdf/服务条款.pdf'>
                  服务条款
                </a>{' '}
              </li>{' '}
              <li>
                {' '}
                <a style={{ color: 'white' }} href='/pdf/法律声明.pdf'>
                  法律声明
                </a>
              </li>{' '}
            </ul>{' '}
          </div>{' '}
          <div className='footer-list-item'>
            <h5 className='footer-list-title'> 关于我们 </h5>{' '}
            <ul>
              <li> 团队介绍 </li> <li> 联系我们 </li> <li> 商务合作 </li>{' '}
            </ul>
          </div>
          {/* <div className="footer-list-item">
            <h5 className="footer-list-title"> 志愿填报 </h5>
            <img
              className="index-qr-code"
              src="/index-icon/QR-fuwu-code.jpg"
              alt=""
            />
          </div> */}
          <div className='footer-list-item'>
            <h5 className='footer-list-title'> 关注微信 </h5>{' '}
            <img
              className='index-qr-code'
              src='/index-icon/QR-dingyue-code.jpg'
              alt=''
            />
          </div>{' '}
          <div className='footer-list-item'>
            <h5 className='footer-list-title'> 优惠团购 </h5>{' '}
            <ul>
              <li> 多人预定 </li> <li> 超值优惠 </li> <li> 如有需求请联系 </li>{' '}
              <li> 18644091056 </li>{' '}
            </ul>{' '}
          </div>{' '}
        </div>{' '}
        <div className='footer-second-list-box page-inner-width-box'>
          <img
            src='/images/footer/title-logo.png'
            className='footer-title-logo'
            alt='title-logo'
          />
          <div className='footer-icon-list'>
            <div className='footer-icon-box'>
              <Icon className='footer-icon' type='trophy' />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
          <div className='footer-icon-list'>
            <div className='footer-icon-box'>
              <Icon className='footer-icon' type='project' />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
          <div className='footer-icon-list'>
            <div className='footer-icon-box'>
              <Icon className='footer-icon' type='crown' />
            </div>{' '}
            <div>
              <p> 中国高考志愿填报领军品牌 </p>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className='beihao'>
          <ul>
            <li>
              备案号 :
              <a
                href='http://www.beian.miit.gov.cn/'
                target='_blank'
                rel='noopener noreferrer'
              >
                黑ICP备19005978号
              </a>{' '}
            </li>
            <li>网站内容 : 单位门户网站</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default FooterController;
