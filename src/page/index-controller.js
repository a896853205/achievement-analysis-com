import React from 'react';

// UI样式
import { Carousel, Icon, Skeleton, Popover } from 'antd';
import '../style/index-controller.css';

// 路由
import { withRouter, Link } from 'react-router-dom';
import {
  VOLUNTARY,
  BCG_ROOT_NAME,
  QUESTIONNAIRE,
  LOGIN,
  SCHOOL_RECOMMEND,
  SCHOOL_DETAIL
} from '../constants/route-constants';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 子组件
import SchoolNewsList from '@/page/index/index-school-news-list.jsx';
import MajorNewsList from '@/page/index/index-major-news-list.jsx';
import StudentReadList from '@/page/index/index-student-read-list.jsx';
import RankShowNewsList from '@/page/index/index-rank-show-news-list.jsx';
import QuestionNewsList from '@/page/index/index-question-news-list.jsx';
import Login from '@/page/index-components/login-components.jsx';

// 工具类
import wait from '@/util/wait-helper';

// 关于数据模块交互
import { connect } from 'react-redux';

class IndexController extends React.Component {
  state = {
    schoolNewsList: [],
    majorNewsList: [],
    studentReadNewsList: [],
    rankNewsList: [],
    questionNewsList: [],
    loading: false
  };

  render() {
    return (
      <div className='index-box'>
        <div className='carou-box'>
          <div className='carou-left-img' />
          <div className='carou-inner-box'>
            <Carousel className='carou' autoplay>
              <div>
                <img
                  className='carou-img'
                  src='images/banner/1.jpg'
                  alt='banner1'
                />
              </div>
            </Carousel>
            <Login />
          </div>
          <div className='carou-right-img' />
        </div>
        {/* 智赢快讯 */}
        <div className='page-inner-width-box'>
          <div className='fast-information-box'>
            <Icon className='fast-information-icon' type='sound' />
            <h2 className='fast-information-title'>智赢快讯</h2>
            <Carousel className='carousel-information-box' autoplay>
              <p>黑龙江已开启高考版，输入高考分模拟填报更精准</p>
              <p>模拟填报后，请至省考试院正式填报，完成报考！</p>
              <p>
                率先发布黑龙江2018年专业录取数据，2019年招生计划与考试院同步更新！
              </p>
            </Carousel>
          </div>
        </div>
        <div className='page-inner-width-box index-profile-box'>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    通过测评了解个体的人格气质和职业兴趣，从实现性格与职业最有效匹配的角度，推荐最适合就读的学校和专业。
                  </p>
                </div>
              }
              title={<h1>学业测评</h1>}
            >
              <Link
                to={
                  this.props.user.uuid
                    ? `/${BCG_ROOT_NAME}/${QUESTIONNAIRE.path}`
                    : `/${LOGIN.path}`
                }
              >
                <img src='/index-icon/1.png' alt='' />
              </Link>
            </Popover>
            <span>学业测评</span>
          </div>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    结合学业测评结果，运用本系统大数据，在科学分析和智能研判的基础上，推荐最优志愿报考院校方案及录取概率，提供不同梯度集合供考生决策选择。
                  </p>
                </div>
              }
              title={<h1>院校优先</h1>}
            >
              <Link
                to={
                  this.props.user.uuid
                    ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                    : `/${LOGIN.path}`
                }
              >
                <img src='/index-icon/2.png' alt='' />
              </Link>
            </Popover>
            <span>院校优先</span>
          </div>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    结合学业测评结果，运用本系统大数据，在科学分析和智能研判的基础上，推荐最优志愿报考专业方案及录取概率，提供不同梯度集合供考生决策选择。
                  </p>
                </div>
              }
              title={<h1>专业优先</h1>}
            >
              <Link
                to={
                  this.props.user.uuid
                    ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                    : `/${LOGIN.path}`
                }
              >
                <img src='/index-icon/3.png' alt='' />
              </Link>
            </Popover>
            <span>专业优先</span>
          </div>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    根据近三年各高校、各专业录取分数走势、考分密集度和填报热度等不同维度，运用本系统大数据，评估预测给出目标院校及专业的录取概率。
                  </p>
                </div>
              }
              title={<h1>预测录取概率</h1>}
            >
              <img src='/index-icon/4.png' alt='' />
            </Popover>
            <span>预测录取概率</span>
          </div>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    针对本系统决策结果，从志愿结构完整性、志愿排序合理性、志愿梯度有效性等不同角度给出志愿决策分析报告。
                  </p>
                </div>
              }
              title={<h1>分析报告</h1>}
            >
              <Link
                to={
                  this.props.user.uuid
                    ? `/${BCG_ROOT_NAME}/${VOLUNTARY.path}`
                    : `/${LOGIN.path}`
                }
              >
                <img src='/index-icon/5.png' alt='' />
              </Link>
            </Popover>
            <span>分析报告</span>
          </div>
          <div className='index-profile-item'>
            <Popover
              content={
                <div className='index-popover-box'>
                  <p>
                    本系统含有近十年来黑龙江省毕业生就业去向、薪金待遇、考研情况、出国情况等数十个数据库，提供给考生准确真实的就业前景参考。
                  </p>
                </div>
              }
              title={<h1>就业大数据</h1>}
            >
              <img src='/index-icon/6.png' alt='' />
            </Popover>
            <span>就业大数据</span>
          </div>
        </div>
        <div className='page-inner-width-box'>
          <div className='index-left-right-box'>
            {/* 左侧的智课堂和院校资讯和专业百科 */}
            <div className='page-inner-left-box'>
              <Skeleton active loading={this.state.loading}>
                {/* 智课堂 */}
                <div className='intelligent-course-box'>
                  <h2 className='h2-title-box'>
                    <span className='index-h2-title'>
                      <Icon type='book' style={{ color: '#F1AC20' }} /> 智课堂
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
                <SchoolNewsList newsList={this.state.schoolNewsList} />
                <div className='upright-line'></div>
                {/* 专业百科 */}
                <MajorNewsList newsList={this.state.majorNewsList} />
              </Skeleton>
            </div>

            {/* 右侧高考百问和排名集锦 */}

            <div className='page-inner-right-box'>
              <Skeleton active loading={this.state.loading}>
                {/* 高考百问 */}
                <QuestionNewsList newsList={this.state.questionNewsList} />
                {/* 排名集锦 */}
                <RankShowNewsList newsList={this.state.rankNewsList} />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className='page-inner-width-box'>
          <div className='index-left-right-box'>
            {/* 特色院校推荐 */}
            <div className='page-inner-left-box index-good-school-box'>
              <Skeleton active loading={this.state.loading}>
                <h2 className='h2-title-box'>
                  <span className='index-h2-title'>
                    <Icon
                      type='like'
                      theme='filled'
                      style={{
                        color: '#FA5F6C'
                      }}
                    />{' '}
                    院校推荐
                  </span>
                  <Link
                    to={{
                      pathname: `/${SCHOOL_RECOMMEND.path}`
                    }}
                  >
                    <span className='index-more'>
                      更多 <Icon type='right' />
                    </span>
                  </Link>
                </h2>
                <ul>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/11`
                      }}
                    >
                      <img src='/index-school-pic/1.jpg' alt='' />
                      <p>
                        <span>原兵器部直属院校</span>
                        <span>北京理工大学</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/45`
                      }}
                    >
                      <img src='/index-school-pic/2.jpg' alt='' />
                      <span>原电子工业部直属院校——北京信息科技大学</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/14`
                      }}
                    >
                      <img src='/index-school-pic/3.jpg' alt='' />
                      <span>原化工部直属院校——北京化工大学</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/737`
                      }}
                    >
                      <img src='/index-school-pic/4.jpg' alt='' />
                      <p>
                        <span>原建材总局直属高校</span>
                        <span>山东建材工业学院</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/385`
                      }}
                    >
                      <img src='/index-school-pic/5.jpg' alt='' />
                      <span>
                        原建筑部直属高校——哈尔滨建筑大学（合并于哈尔滨工业大学）
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/250`
                      }}
                    >
                      <img src='/index-school-pic/6.jpg' alt='' />
                      <span>原交通部直属高校——大连海事大学</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/519`
                      }}
                    >
                      <img src='/index-school-pic/7.jpg' alt='' />
                      <span>原石油部直属院校——常州大学</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/${SCHOOL_DETAIL.path}/521`
                      }}
                    >
                      <img src='/index-school-pic/8.jpg' alt='' />
                      <span>原水电部的直属院校——河海大学</span>
                    </Link>
                  </li>
                </ul>
              </Skeleton>
            </div>
            {/* 考生必读 */}
            <div className='page-inner-right-box'>
              <Skeleton active loading={this.state.loading}>
                <StudentReadList newsList={this.state.studentReadNewsList} />
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    await this.setState({
      loading: true
    });

    let [
      {
        schoolNewsList,
        majorNewsList,
        studentReadNewsList,
        rankNewsList,
        questionNewsList
      }
    ] = await Promise.all([
      launchRequest(APIS.GET_HOME_DATA),
      // 防闪烁
      wait(500)
    ]);

    await this.setState({
      schoolNewsList,
      majorNewsList,
      studentReadNewsList,
      rankNewsList,
      questionNewsList,
      loading: false
    });
  };
}

const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return {
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexController)
);
