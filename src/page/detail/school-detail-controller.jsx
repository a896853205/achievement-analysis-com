import React, { useEffect, useState } from 'react';

// 路由
import { Link } from 'react-router-dom';
import moment from 'moment';
// UI样式
import '@/style/detail/school-detail.css';
import { Icon, Table, Select, Skeleton } from 'antd';

// 请求
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 自定义函数
import wait from '@/util/wait-helper';

const { Option } = Select;
const { Column } = Table;

export default props => {
  const schoolId = props.match.params.id;

  return (
    <div className="school-detail-box page-inner-width-box">
      {/* 学校详情头部数据 */}
      <SchoolDetailProfile schoolId={schoolId} />
      {/* 学校详情左边数据 */}
      <div className="school-detail-left-box">
        {/* 招生简章 */}
        <SchoolEnrollmentNewsList
          schoolId={schoolId}
        ></SchoolEnrollmentNewsList>
        {/* 院校分数线 */}
        <SchoolScoreList schoolId={schoolId} />
      </div>
      {/* 学校详情右边数据 */}
      <div className="school-detail-right-box">
        {/* 大学详情右边数据 */}
        <div className="school-detail-item-box">
          <h3 className="school-detail-item-title">大学排名</h3>
          <div className="school-detail-rank-box">
            <div className="rank-item">
              <span className="rank-num">7</span>
              <span className="rank-name">武书连</span>
            </div>
            <div className="rank-item">
              <span className="rank-num">5</span>
              <span className="rank-name">软科</span>
            </div>
            <div className="rank-item">
              <span className="rank-num">4</span>
              <span className="rank-name">校友会</span>
            </div>
            <div className="rank-item">
              <span className="rank-num">3</span>
              <span className="rank-name">QS</span>
            </div>
            <div className="rank-item">
              <span className="rank-num">5</span>
              <span className="rank-name">USNews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//学校招生简章模块
const SchoolEnrollmentNewsList = props => {
  const [schoolEnrollmentNews, setSchoolEnrollmentNews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="school-detail-item-box">
      <Skeleton loading={loading}>
        <h3 className="school-detail-item-title">招生简章</h3>
        <ul className="school-detail-enrollment-box">
          {schoolEnrollmentNews.map((item, index) => (
            <li key={index} className="school-detail-enrollment-item-box">
              <h5>{item.title}</h5>
              <span>
                <span> {moment(item.createTime).format('YYYY-MM-DD ')}</span>
                <span className="enrollment-view">浏览 {item.viewTimes}</span>
              </span>
            </li>
          ))}
        </ul>
      </Skeleton>
    </div>
  );
};

// 学校简介模块
const SchoolDetailProfile = props => {
  const [schoolName, setschoolName] = useState('');
  const [schoolPropertyName, setSchoolPropertyName] = useState([]);
  const [schoolNatureName, setSchoolNatureName] = useState([]);
  const [schoolTypeName, setSchoolTypeName] = useState([]);
  const [provinceName, setProvinceName] = useState('');
  const [schoolIntro, setSchoolIntro] = useState('');
  const [loading, setLoading] = useState(true);

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
          school_intro: schoolIntro
        }
      ] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_DETAIL, {
          schoolId
        }),
        // 避免闪烁
        wait(500)
      ]);

      setschoolName(schoolName);
      setSchoolPropertyName(schoolPropertyName);
      setSchoolNatureName(schoolNatureName);
      setSchoolTypeName(schoolTypeName);
      setProvinceName(provinceName);
      setSchoolIntro(schoolIntro);
      setLoading(false);
    })();
  }, [schoolId]);

  return (
    <div className="school-detail-top-box">
      <Skeleton loading={loading}>
        <div className="school-detail-title-box">
          <h2 className="school-detail-title">{schoolName}</h2>
          {schoolPropertyName.map((item, index) => (
            <span key={index} className="shool-detail-property-tag">
              {item}
            </span>
          ))}
        </div>
        <div className="school-detail-describe-box">
          <img
            src="https://cdn.dribbble.com/users/1207383/screenshots/6711883/college-night.png"
            alt=""
          />
          <div className="describe-right-box">
            <ul>
              <li>
                <Icon
                  className="describe-icon"
                  type="clock-circle"
                  theme="twoTone"
                  twoToneColor="#ff6666"
                />
                <span>-</span>
              </li>
              <li>
                <Icon className="describe-icon" type="bank" theme="twoTone" />
                <span>
                  {schoolNatureName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </span>
              </li>
              <li>
                <Icon
                  className="describe-icon"
                  type="appstore"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
                <span>
                  {schoolTypeName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </span>
              </li>
              <li>
                <Icon
                  className="describe-icon"
                  type="environment"
                  theme="twoTone"
                  twoToneColor="#ffA02C"
                />
                <span>{provinceName}</span>
              </li>
              <li>
                <Icon
                  className="describe-icon"
                  type="bulb"
                  theme="twoTone"
                  twoToneColor="#9988ff"
                />
                <span>-</span>
              </li>
            </ul>
            <p className="describe-profile-box">
              {schoolIntro}...
              <Link>
                <span className="describe-profile-more">全部</span>
              </Link>
            </p>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

// 学校分数模块
const SchoolScoreList = props => {
  const [scoreList, setScoreList] = useState([]);
  const [accountCategory, setAccountCategory] = useState(1);
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
    <div className="school-detail-item-box">
      <h3 className="school-detail-item-title school-score-title-box">
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
        <Column title="年份" dataIndex="year" key="year" />
        <Column title="招生批次	" dataIndex="lotsName" key="lotsName" />
        <Column title="最高分" dataIndex="maxScore" key="maxScore" />
        <Column title="最低分" dataIndex="score" key="score" />
        <Column title="录取数" dataIndex="enrollment" key="yeenrollmentar" />
        <Column title="最低位次" dataIndex="lastRank" key="lastRank" />
      </Table>
    </div>
  );
};
