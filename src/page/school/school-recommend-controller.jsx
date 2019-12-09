import React, { useEffect, useState } from 'react';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

// 路由
import { withRouter, Link } from 'react-router-dom';
import { SCHOOL_DETAIL } from '@/constants/route-constants';

// 样式
import '@/style/school-recommend.css';

export default withRouter(props => {
  const [schoolRecommendList, setSchoolRecommendList] = useState([]);
  useEffect(() => {
    (async () => {
      let schoolRecommendList = await launchRequest(
        APIS.GET_SCHOOL_RECOMMEND_LIST
      );

      setSchoolRecommendList(schoolRecommendList);
    })();
  }, []);

  return (
    <div className='page-inner-width-box'>
      <div className='school-recommend-box'>
        {schoolRecommendList.map(school => (
          <Link
            to={{
              pathname: `/${SCHOOL_DETAIL.path}/${school.schoolId}`
            }}
            key={school.id}
            className='school-recommend-item'
          >
            <div>
              <img src={`${school.profilePicUrl}`} alt='' />
              <h5>{school.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});
