import React from 'react';

import { Carousel, Icon } from 'antd';

// 路由
import { withRouter } from 'react-router-dom';

import { SEARCH_SCHOOL, SEARCH_MAJOR } from '../constants/route-constants';

import '../style/index-controller.css';

class IndexController extends React.Component {
  render() {
    return (
      <div className='index-box'>
        <Carousel className='carou' autoplay>
          <div>
            <img
              className='carou-img'
              src='http://img3.youzy.cn/content/media/thumbs/p00191258.jpeg'
              alt='banner1'
            />
          </div>
          <div>
            <img
              className='carou-img'
              src='http://img3.youzy.cn/content/media/thumbs/p00191467.jpeg'
              alt='banner2'
            />
          </div>
        </Carousel>
        {/* 智赢快讯 */}
        <div className='page-inner-width-box'>
          <div className='fast-information-box'>
            <Icon className='fast-information-icon' type='sound' />
            <h2 className='fast-information-title index-h2-title'>智赢快讯</h2>
            <Carousel className='carousel-information-box' autoplay>
              <p>黑龙江已开启高考版，输入高考分模拟填报更精准</p>
              <p>模拟填报后，请至省考试院正式填报，完成报考！</p>
              <p>
                率先发布黑龙江2018年专业录取数据，2019年招生计划与考试院同步更新！
              </p>
            </Carousel>
          </div>
        </div>
        <div className='search-row page-inner-width-box'>
          <div
            onClick={() => {
              this.props.history.push(`/${SEARCH_SCHOOL.path}`);
            }}
            className='search-outter-box school-background'
          >
            <div className='search-text-box'>
              <Icon type='bank' />
              <span className='search-title'>学校查询</span>
            </div>
            <div className='search-shadow-box' />
          </div>
          <div
            onClick={() => {
              this.props.history.push(`/${SEARCH_MAJOR.path}`);
            }}
            className='search-outter-box major-background'
          >
            <div className='search-text-box'>
              <Icon type='book' />
              <span className='search-title'>专业百科</span>
            </div>
            <div className='search-shadow-box' />
          </div>
        </div>
        <div className='page-inner-width-box'>
          <div className='index-left-right-box'>
            {/* 左侧的智课堂和院校资讯和专业百科 */}
            <div className='page-inner-left-box'>
              {/* 智课堂 */}
              <div className='intelligent-course-box'>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>
                    <Icon type='book' /> 智课堂
                  </span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/992274/screenshots/7440971/media/2405976c7c1485050e78fcf54ca4bfe4.jpg'
                      alt=''
                    />
                    <h5>高考志愿早准备</h5>
                    <p>
                      <Icon type='eye' /> 874
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/278549/screenshots/7448782/media/87fe1bff113e26825d8f58e3b1bbb785.png'
                      alt=''
                    />
                    <h5>高考填志愿怎样选专业？</h5>
                    <p>
                      <Icon type='eye' /> 2134
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/371094/screenshots/6793394/_bbb-dribble.jpg'
                      alt=''
                    />
                    <h5>优志愿系统电脑端使用教程</h5>
                    <p>
                      <Icon type='eye' /> 63245
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/503590/screenshots/6292998/thestudy05.jpg'
                      alt=''
                    />
                    <h5>优志愿系统电脑端使用教程</h5>
                    <p>
                      <Icon type='eye' /> 23423
                    </p>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/503590/screenshots/6293010/thestudy01.jpg'
                      alt=''
                    />
                    <h5>会计学专业解读</h5>
                    <p>
                      <Icon type='eye' /> 234
                    </p>
                  </li>
                </ul>
              </div>
              {/* 院校资讯 */}
              <div className='school-information-box'>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>院校资讯</span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='school-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='school-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='school-information-tags'>
                      <span>NEW</span>
                      <span>HOT</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='school-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='school-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='school-information-tags'>
                      <span>NEW</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='school-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='school-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='school-information-tags'>
                      <span>NEW</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='school-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='school-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='school-information-tags'>
                      <span>NEW</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='upright-line'></div>
              {/* 专业百科 */}
              <div className='major-information-box'>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>院校资讯</span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='major-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='major-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='major-information-tags'>
                      <span>NEW</span>
                      <span>HOT</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='major-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='major-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='major-information-tags'>
                      <span>NEW</span>
                      <span>HOT</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='major-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='major-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='major-information-tags'>
                      <span>NEW</span>
                      <span>HOT</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        哈尔滨工业大学高考课堂哈尔学高考fsdfs哈尔滨工业大学高考课堂哈尔学高考fsdfs
                      </h5>
                      <span className='major-information-time-box'>
                        <Icon type='clock-circle' /> 2019-09-10
                      </span>
                      <span className='major-information-see-box'>
                        <Icon type='eye' /> 5699
                      </span>
                    </div>
                    <div className='major-information-tags'>
                      <span>NEW</span>
                      <span>HOT</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* 右侧高考百问和排名集锦 */}
            <div className='page-inner-right-box'>
              {/* 高考百问 */}
              <div>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>
                    <Icon type='book' /> 高考百问
                  </span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul className='index-question-ul-box'>
                  <li>高考百问信息高考百问信息高考百问信息</li>
                  <li>高考百问信息高考百问信息高考百问信息</li>
                  <li>高考百问信息高考百问信息高考百问信息</li>
                  <li>高考百问信息高考百问信息高考百问信息</li>
                </ul>
              </div>
              {/* 排名集锦 */}
              <div className='index-rank-show-box'>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>
                    <Icon type='book' /> 排名集锦
                  </span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/63407/screenshots/7456840/media/19677162c341cfa890d741cfb2624b6a.png'
                      alt=''
                    />
                    <div className='index-rank-detail-box'>
                      <h5>
                        高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                      </h5>
                      <p>
                        <span className='school-information-time-box'>
                          <Icon type='clock-circle' /> 2019-09-10
                        </span>
                        <span className='school-information-see-box'>
                          <Icon type='eye' /> 5699
                        </span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/23334/screenshots/7449013/media/a781c7a6f497508dcf90ae0d76fff233.jpg'
                      alt=''
                    />
                    <div className='index-rank-detail-box'>
                      <h5>
                        高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                      </h5>
                      <p>
                        <span className='school-information-time-box'>
                          <Icon type='clock-circle' /> 2019-09-10
                        </span>
                        <span className='school-information-see-box'>
                          <Icon type='eye' /> 5699
                        </span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <img
                      src='https://cdn.dribbble.com/users/416805/screenshots/5986374/let-it-snow_dribbble.png'
                      alt=''
                    />
                    <div className='index-rank-detail-box'>
                      <h5>
                        高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                      </h5>
                      <p>
                        <span className='school-information-time-box'>
                          <Icon type='clock-circle' /> 2019-09-10
                        </span>
                        <span className='school-information-see-box'>
                          <Icon type='eye' /> 5699
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='page-inner-width-box'>
          <div className='index-left-right-box'>
            {/* 特色院校推荐 */}
            <div className='page-inner-left-box index-good-school-box'>
              <h2 className='h2-title-box'>
                <span className='index-h2-title'>
                  <Icon type='book' /> 院校推荐
                </span>
                <span className='index-more'>
                  更多 <Icon type='right' />
                </span>
              </h2>
              <ul>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/46302/screenshots/5092379/school.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/992274/screenshots/6412657/school_3_kit8-net.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/46302/screenshots/5092379/school.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/992274/screenshots/6412657/school_3_kit8-net.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/46302/screenshots/5092379/school.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/992274/screenshots/6412657/school_3_kit8-net.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/46302/screenshots/5092379/school.png'
                    alt=''
                  />
                </li>
                <li>
                  <img
                    src='https://cdn.dribbble.com/users/992274/screenshots/6412657/school_3_kit8-net.png'
                    alt=''
                  />
                </li>
              </ul>
            </div>
            {/* 考生必读 */}
            <div className='page-inner-right-box'>
              <div className='student-must-read-box'>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>
                    <Icon type='book' /> 考生必读
                  </span>
                  <span className='index-more'>
                    更多 <Icon type='right' />
                  </span>
                </h2>
                <ul>
                  <li>
                  <Icon type="right-square" theme="filled" className='student-must-read-icon' />高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                  </li>
                  <li>
                  <Icon type="right-square" theme="filled" className='student-must-read-icon' />高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                  </li>
                  <li>
                  <Icon type="right-square" theme="filled" className='student-must-read-icon' />高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                  </li>
                  <li>
                  <Icon type="right-square" theme="filled" className='student-must-read-icon' />高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                  </li>
                  <li>
                  <Icon type="right-square" theme="filled" className='student-must-read-icon' />高考课堂哈堂哈堂尔学高考堂考高考课堂哈堂哈堂尔学高考堂考
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(IndexController);
