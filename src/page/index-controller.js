import React from 'react';

// UI样式
import { Carousel, Icon, Skeleton } from 'antd';
import '../style/index-controller.css';

// 路由
import { withRouter } from 'react-router-dom';
import { SEARCH_SCHOOL, SEARCH_MAJOR } from '../constants/route-constants';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 子组件
import SchoolNewsList from '@/page/index/index-schoolNewsList.jsx';
import MajorNewsList from '@/page/index/index-majorNewsList.jsx';
import StudentReadList from '@/page/index/index-studentReadList.jsx';
import RankShowNewsList from '@/page/index/index-rankShowNewsList.jsx';

// 工具类
import wait from '@/util/wait-helper';

class IndexController extends React.Component {
  state = {
    schoolNewsList: [],
    majorNewsList: [],
    studentReadNewsList: [],
    rankNewsList: [],
    loading: false
  };

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
              <Skeleton active loading={this.state.loading}>
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
      { schoolNewsList, majorNewsList, studentReadNewsList, rankNewsList }
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
      loading: false
    });
  };
}
export default withRouter(IndexController);
