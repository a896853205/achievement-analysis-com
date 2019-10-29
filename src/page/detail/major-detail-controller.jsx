import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// UI组件
import { Tree, Tabs, Icon, Skeleton } from 'antd';

// css
import '@/style/detail/major-detail.css';

// 路由
import { MAJOR_DETAIL } from '@/constants/route-constants';

// 请求
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 自定义函数
import wait from '@/util/wait-helper';

const { TreeNode } = Tree;
const { TabPane } = Tabs;

export default props => {
  const majorTwoCode = props.match.params.id;

  return (
    <div className='page-inner-width-box major-detail-box'>
      <div className='major-detail-left-box'>
        <MajorCategoryTree majorTwoCode={majorTwoCode} />
        {/* <div className='major-detail-correlation-box'>
          <h5>相关专业</h5>
          <ul>
            <li>逻辑学</li>
            <li>宗教学</li>
            <li>伦理学</li>
          </ul>
        </div> */}
      </div>
      <div className='major-detail-right-box'>
        <MajorProfile majorTwoCode={majorTwoCode} />
        <div className='major-detail-show-box'>
          <Tabs type='card'>
            <TabPane tab='专业概况' key='1'>
              <MajorDetail majorTwoCode={majorTwoCode} />
            </TabPane>
            {/* <TabPane tab='开设院校' key='2'>
              Content of Tab Pane 2
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const MajorProfile = props => {
  const majorTwoCode = props.majorTwoCode;

  const [majorName, setMajorName] = useState('');
  const [majorLevelOneName, setMajorLevelOneName] = useState('');
  const [majorCategoryName, setMajorCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [
        { majorName, majorLevelOneName, majorCategoryName }
      ] = await Promise.all([
        launchRequest(APIS.GET_MAJOR_PROFILE, { majorTwoCode }),
        wait(500)
      ]);

      setMajorName(majorName);
      setMajorLevelOneName(majorLevelOneName);
      setMajorCategoryName(majorCategoryName);
      setLoading(false);
    })();
  }, [majorTwoCode]);

  return (
    <div className='major-detail-profile-box'>
      <Skeleton loading={loading}>
        <h4>{majorName}</h4>
        <span>
          {majorCategoryName} > {majorLevelOneName}
        </span>
        <span>国标代码{majorTwoCode}(不可用于填报)</span>
      </Skeleton>
    </div>
  );
};

const MajorDetail = props => {
  const majorTwoCode = props.majorTwoCode;

  const [educationSystem, setEducationSystem] = useState('');
  const [majorIntro, setMajorIntro] = useState('');
  const [studyThreshold, setStudyThreshold] = useState('');
  const [mainCourse, setMainCourse] = useState('');
  const [postgraduateIntro, setPostgraduateIntro] = useState('');
  const [graduateDestination, setGraduateDestination] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let [
        {
          educationSystem,
          majorIntro,
          studyThreshold,
          mainCourse,
          postgraduateIntro,
          graduateDestination
        }
      ] = await Promise.all([
        launchRequest(APIS.GET_MARJO_DETAIL, { majorTwoCode }),
        wait(500)
      ]);

      setEducationSystem(educationSystem);
      setMajorIntro(majorIntro);
      setStudyThreshold(studyThreshold);
      setMainCourse(mainCourse);
      setPostgraduateIntro(postgraduateIntro);
      setGraduateDestination(graduateDestination);
      setLoading(false);
    })();
  }, [majorTwoCode]);

  return (
    <div>
      <Skeleton loading={loading}>
        <div className='major-detail-show-item-box'>
          <h5>专业概览</h5>
          <div className='major-detail-overview-box'>
            <ul>
              <li>
                <Icon
                  className='overview-icon'
                  type='bulb'
                  theme='twoTone'
                  twoToneColor='#7D4EFE'
                />
                <span className='overview-span-box'>
                  <span>本科</span>
                  <span>学历层次</span>
                </span>
              </li>
              <li>
                <Icon
                  className='overview-icon'
                  type='clock-circle'
                  theme='twoTone'
                  twoToneColor='#ff6666'
                />
                <span className='overview-span-box'>
                  <span>{educationSystem}</span>
                  <span>修业年限</span>
                </span>
              </li>
              <li>
                <Icon
                  className='overview-icon'
                  type='experiment'
                  theme='twoTone'
                  twoToneColor='#2EC893'
                />
                <span className='overview-span-box'>
                  <span>法学学士</span>
                  <span>授予学位</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className='major-detail-show-item-box'>
          <h5>专业介绍</h5>
          <p>{majorIntro}</p>
        </div>
        <div className='major-detail-show-item-box'>
          <h5>考研方向</h5>
          <p>{postgraduateIntro}</p>
        </div>
        <div className='major-detail-show-item-box'>
          <h5>主要课程</h5>
          <p>{mainCourse}</p>
        </div>
        <div className='major-detail-show-item-box'>
          <h5>就业方向</h5>
          <p>{graduateDestination}</p>
        </div>
        <div className='major-detail-show-item-box'>
          <h5>学科要求</h5>
          <p>{studyThreshold}</p>
        </div>
      </Skeleton>
    </div>
  );
};

const MajorCategoryTree = withRouter(props => {
  const majorTwoCode = props.majorTwoCode;
  const [majorCategory, setMajorCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [majorCategory] = await Promise.all([
        launchRequest(APIS.GET_MAJOR_CATEGORY),
        wait(500)
      ]);

      setMajorCategory(majorCategory);
      setLoading(false);
    })();
  }, []);

  return (
    <div className='major-detail-tree-box'>
      <Skeleton loading={loading}>
        <Tree
          showLine
          defaultExpandedKeys={[majorTwoCode]}
          onSelect={selectKey => {
            props.history.push(`/${MAJOR_DETAIL.path}/${selectKey}`);
          }}
        >
          {majorCategory.map(item => (
            <TreeNode
              title={item.name}
              selectable={false}
              key={item.major_category_code}
            >
              {item.data.map(oneLevelItem => (
                <TreeNode
                  title={oneLevelItem.name}
                  key={oneLevelItem.major_level_one_code}
                  selectable={false}
                >
                  {oneLevelItem.data.map(twoLevelItem => (
                    <TreeNode
                      title={twoLevelItem.major_name}
                      key={twoLevelItem.major_level_two_code}
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeNode>
          ))}
        </Tree>
      </Skeleton>
    </div>
  );
});
