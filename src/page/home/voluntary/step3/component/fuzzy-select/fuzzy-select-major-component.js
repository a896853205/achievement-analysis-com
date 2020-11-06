import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounceFn } from 'ahooks';

import { Select, Button } from 'antd';
import './fuzzy-select-major-css.css';

import { actions as voluntaryActions } from '@/redux/voluntary-model';
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

const { Option } = Select;

// 模糊查询函数组件编写
function FuzzySelectMajor() {
  const dispatch = useDispatch();
  const [majorList, setMajorList] = useState([]);

  const { run: handleSearch } = useDebounceFn(
    async (majorName) => {
      if (majorName.length === 0) {
        return;
      } else {
        let fuzzyMajorList = await launchRequest(
          // 自己单独提出一个新的名称
          APIS.GET_FUZZY_SEARCH_MAJOR,
          {
            majorName,
          },
          'GET'
        );
        setMajorList(fuzzyMajorList);
      }
    },
    {
      wait: 500,
    }
  );

  const handleChange = useCallback(
    (majorName) => {
      dispatch(voluntaryActions.recordMajorName(majorName));
    },
    [dispatch]
  );
  const handleClick = useCallback(
    () => dispatch(voluntaryActions.recordSchoolList()),
    [dispatch]
  );

  return (
    <>
      <Select
        showSearch
        className='fuzzy-select'
        placeholder='请输入专业名称'
        onSearch={handleSearch}
        onChange={handleChange}
      >
        {majorList.map((major) => {
          return (
            <Option
              key={`${major.uuid} ${major.majorName}`}
              value={`${major.uuid} ${major.majorName}`}
            >
              {major.majorName}
            </Option>
          );
        })}
      </Select>
      <Button
        type='primary'
        className='fuzzy-select-button'
        onClick={handleClick}
      >
        搜索专业
      </Button>
    </>
  );
}

export default FuzzySelectMajor;
