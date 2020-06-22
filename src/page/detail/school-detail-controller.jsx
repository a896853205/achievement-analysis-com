import React, { useEffect, useState } from 'react';

import moment from 'moment';

// UI样式
import '@/style/detail/school-detail.css';
import { Icon, Table, Select, Skeleton, Modal } from 'antd';

// 请求
import { launchRequest } from '@/util/request';
import * as APIS from '../../constants/api-constants';
import * as DominConfigs from '../../constants/domin-constants';

// 自定义函数
import wait from '@/util/wait-helper';

// 关于数据模块交互
import { connect } from 'react-redux';
import { store } from 'redux';

const { Option } = Select;
const { Column } = Table;

export default props => {
  let schoolId;
  if (props.match) {
    schoolId = props.match.params.id;
  } else {
    schoolId = props.schoolId;
  }

  console.log(props);

  return (
    <div className='school-detail-box page-inner-width-box'>
      {/* 学校详情头部数据 */}
      <SchoolDetailProfile schoolId={schoolId} />
      {/* 学校详情左边数据 */}
      <div className='school-detail-left-box'>
        {/* 招生简章 */}
        <SchoolEnrollmentNewsList schoolId={schoolId} />
        {/* 院校分数线 */}
        <SchoolScoreList schoolId={schoolId} />
      </div>
      {/* 学校详情右边数据 */}
      <div className='school-detail-right-box'>
        {/* 大学详情右边数据 */}
        <SchoolRank schoolId={schoolId} />
      </div>
      {/* 专业分数线 */}
      <SchoolMajorScoreList schoolId={schoolId} />
    </div>
  );
};

//学校招生简章模块
const SchoolEnrollmentNewsList = props => {
  const [schoolEnrollmentNews, setSchoolEnrollmentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [enrollmentNewsContent, setEnrollmentNewsContent] = useState('');
  const [enrollmentNewsDetailUuid, setEnrollmentNewsDetailUuid] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);

  let { schoolId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [schoolEnrollmentNews] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_ENROLLMENT_GUIDE_NEWS, { schoolId }),
        wait(500)
      ]);

      setSchoolEnrollmentNews(schoolEnrollmentNews);
      setLoading(false);
    })();
  }, [schoolId]);

  useEffect(() => {
    (async () => {
      setModalLoading(true);

      let [enrollmentNewsContent] = await Promise.all([
        launchRequest(APIS.GET_ENROLLMENT_GUIDE_NEWS_DETAIL, {
          uuid: enrollmentNewsDetailUuid
        }),
        wait(500)
      ]);

      setEnrollmentNewsContent(enrollmentNewsContent.content);
      setModalLoading(false);
    })();
  }, [enrollmentNewsDetailUuid]);

  return (
    <div className='school-detail-item-box'>
      <Skeleton loading={loading}>
        <h3 className='school-detail-item-title'>招生简章</h3>
        <ul className='school-detail-enrollment-box'>
          {schoolEnrollmentNews.map((item, index) => (
            <li key={index} className='school-detail-enrollment-item-box'>
              <h5
                onClick={() => {
                  setModalShow(true);
                  setEnrollmentNewsDetailUuid(item.uuid);
                }}
                style={{
                  cursor: 'pointer'
                }}
              >
                {item.title}
              </h5>
              <span>
                <span>
                  {item.createTime
                    ? moment(item.createTime).format('YYYY-MM-DD ')
                    : '-'}
                </span>
                <span className='enrollment-view'>
                  浏览 {item.viewTimes ? item.viewTimes : '-'}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Skeleton>
      <Modal
        title='招生简章'
        visible={modalShow}
        footer={null}
        onCancel={() => {
          setModalShow(false);
        }}
        width='90%'
      >
        <Skeleton loading={modalLoading}>
          <div
            style={{
              display: 'block'
            }}
            dangerouslySetInnerHTML={{
              __html: enrollmentNewsContent
            }}
          ></div>
        </Skeleton>
      </Modal>
    </div>
  );
};

// 学校简介模块
const SchoolDetailProfile = props => {
  const [schoolName, setschoolName] = useState('');
  const [schoolCreateTime, setSchoolCreateTime] = useState('-');
  const [masterNum, setMasterNum] = useState('-');
  const [doctorNum, setDoctorNum] = useState('-');
  const [schoolPropertyName, setSchoolPropertyName] = useState([]);
  const [schoolNatureName, setSchoolNatureName] = useState([]);
  const [schoolTypeName, setSchoolTypeName] = useState([]);
  const [provinceName, setProvinceName] = useState('');
  const [schoolIntro, setSchoolIntro] = useState('');
  const [schoolCompleteIntro, setSchoolCompleteIntro] = useState('');
  const [schoolLogoName, setSchoolLogoName] = useState('no-logo.png');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  let { schoolId } = props;
  useEffect(() => {
    (async () => {
      setLoading(true);

      let [
        {
          school_name: schoolName,
          school_property_name: schoolPropertyName,
          school_nature_name: schoolNatureName,
          school_type_name: schoolTypeName,
          province_name: provinceName,
          school_intro: schoolIntro,
          schoolCreateTime,
          masterNum,
          doctorNum,
          logoName
        }
      ] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_DETAIL, {
          schoolId
        }),
        // 避免闪烁
        wait(500)
      ]);

      setschoolName(schoolName);
      setSchoolCreateTime(schoolCreateTime || '-');
      setMasterNum(masterNum || '-');
      setDoctorNum(doctorNum || '-');
      setSchoolPropertyName(schoolPropertyName);
      setSchoolNatureName(schoolNatureName);
      setSchoolTypeName(schoolTypeName);
      setProvinceName(provinceName);
      setSchoolIntro(schoolIntro.substring(0, 100));
      setSchoolCompleteIntro(schoolIntro);
      setSchoolLogoName(logoName || 'no-logo.png');
      setLoading(false);
    })();
  }, [schoolId]);

  return (
    <div className='school-detail-top-box'>
      <Skeleton loading={loading}>
        <div className='school-detail-title-box'>
          <img src={`/school-logo/${schoolLogoName}`} alt='' />
          <h2 className='school-detail-title'>{schoolName}</h2>
          {schoolPropertyName.map((item, index) => (
            <span key={index} className='shool-detail-property-tag'>
              {item}
            </span>
          ))}
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
                <span>{schoolCreateTime}</span>
              </li>
              <li>
                <Icon className='describe-icon' type='bank' theme='twoTone' />
                <span>
                  {schoolNatureName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='appstore'
                  theme='twoTone'
                  twoToneColor='#52c41a'
                />
                <span>
                  {schoolTypeName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </span>
              </li>
              <li>
                <Icon
                  className='describe-icon'
                  type='environment'
                  theme='twoTone'
                  twoToneColor='#ffA02C'
                />
                <span>{provinceName}</span>
              </li>
              {/* <li>
                <Icon
                  className='describe-icon'
                  type='bulb'
                  theme='twoTone'
                  twoToneColor='#9988ff'
                />
                <span>-</span>
              </li> */}
              <li>
                <span
                  style={{
                    display: 'block',
                    width: '50px',
                    height: '50px',
                    fontSize: '45px',
                    lineHeight: '45px',
                    marginBottom: '10px'
                  }}
                >
                  硕
                </span>
                <span>{masterNum}</span>
              </li>
              <li>
                <span
                  style={{
                    display: 'block',
                    width: '50px',
                    height: '50px',
                    fontSize: '45px',
                    lineHeight: '45px',
                    marginBottom: '10px'
                  }}
                >
                  博
                </span>
                <span>{doctorNum}</span>
              </li>
            </ul>
            <p className='describe-profile-box'>
              {schoolIntro}...
              <span
                onClick={() => {
                  setModalVisible(true);
                }}
                className='describe-profile-more'
              >
                全部
              </span>
            </p>
          </div>
        </div>
      </Skeleton>
      <Modal
        title='学校介绍'
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
        width='90%'
      >
        <p>{schoolCompleteIntro}</p>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return { user };
};

// 学校分数模块
const SchoolScoreList = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  //解决刷新，可能有问题
  if(props.user.accountCategory){
    sessionStorage.setItem('accountCategory',props.user.accountCategory);
  } else{
    props.user.accountCategory = sessionStorage.getItem('accountCategory');
  }

  const [scoreList, setScoreList] = useState([]);
  const [accountCategory, setAccountCategory] = useState(props.user.accountCategory ? parseInt(props.user.accountCategory) : 1);
  const [loading, setLoading] = useState(true);

  let { schoolId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [scoreList] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_SCORE_LIST, {
          schoolId,
          accountCategory
        }),
        // 避免闪烁
        wait(500)
      ]);

      setScoreList(scoreList);
      setLoading(false);
    })();
  }, [schoolId, accountCategory]);

  return (
    <div className='school-detail-item-box'>
      <h3 className='school-detail-item-title school-score-title-box'>
        <span>院校分数线</span>
        {/* Select */}
        <Select
          value={accountCategory}
          onChange={value => setAccountCategory(value)}
          style={{ width: 200 }}
        >
          <Option value={1}>理科</Option>
          <Option value={2}>文科</Option>
        </Select>
      </h3>
      {/* Table */}
      <Table
        rowKey={record =>
          '' + record.year + record.lotsName + record.score + record.enrollment
        }
        dataSource={scoreList}
        loading={loading}
        pagination={false}
      >
        <Column
          title='年份'
          dataIndex='year'
          key='year'
          render={text => (text ? text : '-')}
        />
        <Column
          title='招生批次	'
          dataIndex='lotsName'
          key='lotsName'
          render={text => (text ? text : '-')}
        />
        <Column
          title='最高分'
          dataIndex='maxScore'
          key='maxScore'
          render={text => (text ? text : '-')}
        />
        <Column
          title='最低分'
          dataIndex='score'
          key='score'
          render={text => (text ? text : '-')}
        />
        <Column
          title='录取数'
          dataIndex='enrollment'
          key='enrollment'
          render={text => (text ? text : '-')}
        />
        <Column
          title='最低位次'
          dataIndex='lastRank'
          key='lastRank'
          render={text => (text ? text : '-')}
        />
      </Table>
    </div>
  );
});

// 学校排名模块
const SchoolRank = props => {
  const [wuShuLianRank, setWuShuLianRank] = useState('-');
  const [ruanKeRank, setRuanKeRank] = useState('-');
  const [schoolFriendRank, setSchoolFriendRank] = useState('-');
  const [qsRank, setQsRank] = useState('-');
  const [USNewsRank, setUSNewsRank] = useState('-');
  const [loading, setLoading] = useState(true);

  let { schoolId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [schoolRank] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_RANK, {
          schoolId
        }),
        // 避免闪烁
        wait(500)
      ]);

      if (schoolRank) {
        setWuShuLianRank(schoolRank.rank || '-');
        setRuanKeRank(schoolRank.ruankeRank || '-');
        setSchoolFriendRank(schoolRank.schoolFriendRank || '-');
        setQsRank(schoolRank.qsRank || '-');
        setUSNewsRank(schoolRank.usnewsRank || '-');
      }

      setLoading(false);
    })();
  }, [schoolId]);

  return (
    <div className='school-detail-item-box'>
      <Skeleton loading={loading}>
        <h3 className='school-detail-item-title'>大学排名</h3>
        <div className='school-detail-rank-box'>
          <div className='rank-item'>
            <span className='rank-num'>{wuShuLianRank}</span>
            <span className='rank-name'>武书连</span>
          </div>
          <div className='rank-item'>
            <span className='rank-num'>{ruanKeRank}</span>
            <span className='rank-name'>软科</span>
          </div>
          <div className='rank-item'>
            <span className='rank-num'>{schoolFriendRank}</span>
            <span className='rank-name'>校友会</span>
          </div>
          <div className='rank-item'>
            <span className='rank-num'>{qsRank}</span>
            <span className='rank-name'>QS</span>
          </div>
          <div className='rank-item'>
            <span className='rank-num'>{USNewsRank}</span>
            <span className='rank-name'>USNews</span>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

// 学校专业分数线模块
const SchoolMajorScoreList = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  const [loading, setLoading] = useState(true);
  const [schoolMajor, setSchoolMajor] = useState([]),
       [allYear, setAllYear] = useState([]),
    [accountCategory, setAccountCategory] = useState(props.user.accountCategory ? parseInt(props.user.accountCategory) : 1),
  [year, setYear] = useState(new Date().getFullYear()-1);

  let { schoolId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [schoolMajor, allYear] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_MAJOR, {
          schoolId,
          accountCategory,
          year
        }),
        launchRequest(APIS.GET_ALL_YEAR, {}, DominConfigs.REQUEST_TYPE.GET),
        // 避免闪烁
        wait(500)
      ]);
      setSchoolMajor(schoolMajor);
      setAllYear(allYear);
      setLoading(false);
    })();
  }, [schoolId, accountCategory,year]);

  return (
    <div className='school-detail-item-box'>
      <h3 className='school-detail-item-title school-score-title-box'>
        <span>院校专业分数</span>
        <Select
          value={year}
          onChange={value => setYear(value)}
          style={{ width: 200 }}
        >
          {allYear.map( item =>(
            <Option value={item.year}>{item.year}</Option>
          ))}
          {/*<Option value={2019}>2019</Option>*/}
          {/*<Option value={2018}>2018</Option>*/}
          {/*<Option value={2017}>2017</Option>*/}
          {/*<Option value={2016}>2016</Option>*/}
        </Select>
        <Select
          value={accountCategory}
          onChange={value => setAccountCategory(value)}
          style={{ width: 200 }}
        >
          <Option value={1}>理科</Option>
          <Option value={2}>文科</Option>
        </Select>
      </h3>
      {/* Table */}
      {props.user.uuid ? (
        <Table
          rowKey={(record, index) => index}
          dataSource={schoolMajor}
          loading={loading}
          pagination={false}
        >
          <Column
            title='年份'
            dataIndex='year'
            render={text => (text ? text : '-')}
          />
          <Column
            title='专业代码'
            dataIndex='majorLevelTwoCode'
            render={text => (text ? text : '-')}
            width='100px'
          />
          <Column
            title='专业名称'
            dataIndex='majorName'
            render={text => (text ? text : '-')}
            width='150px'
          />
          <Column
            title='备注'
            dataIndex='comment'
            render={text => (text ? text : '-')}
          />
          <Column
            title='招生批次'
            dataIndex='lotsName'
            render={text => (text ? text : '-')}
            width='100px'
          />
          <Column
            title='最高分'
            dataIndex='enrollmentScoreMax'
            render={text => (text ? text : '-')}
            width='80px'
          />
          <Column
            title='最低分'
            dataIndex='enrollmentScore'
            render={text => (text ? text : '-')}
            width='80px'
          />
          <Column
            title='录取人数'
            dataIndex='enrollment'
            render={text => (text ? text : '-')}
            width='100px'
          />
          <Column
            title='文理'
            dataIndex='accountCategory'
            render={text => (text === 1 ? '理科' : '文科')}
            width='100px'
          />
        </Table>
      ) : (
        '请登录VIP'
      )}
    </div>
  );
});
