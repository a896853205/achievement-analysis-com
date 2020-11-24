import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounceFn } from 'ahooks';

// 路由
import { Link } from 'react-router-dom';
import { MAJOR_DETAIL } from '@/constants/route-constants';

// 请求文件
import { actions as voluntaryActions } from '@/redux/voluntary-model';
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';
import * as DominConfigs from '@/constants/domin-constants';

import { Table, Button, Select } from 'antd';
const { Column } = Table;
const { Option } = Select;

export default function MajorSearchListController(props) {
  const { researchMajorName } = useSelector((state) => state.voluntaryStore),
    [majorList, setMajorList] = useState([]),
    dispatch = useDispatch(),
    [fuzzyMajorList, setFuzzyMajorList] = useState([]);

  const { run: handleSearch } = useDebounceFn(
    async (majorName) => {
      console.log(majorName);
      try {
        if (majorName.length === 0) {
          return;
        } else {
          let fuzzyMajorList = await launchRequest(
            // 自己单独提出一个新的名称
            APIS.GET_FUZZY_SEARCH_MAJOR,
            {
              majorName,
            },
            DominConfigs.REQUEST_TYPE.POST
          );
          setFuzzyMajorList(fuzzyMajorList);
        }
      } catch (e) {
        console.log('err', e);
      }
    },
    {
      wait: 500,
    }
  );

  const handleChange = useCallback(
    (majorName) => {
      dispatch(voluntaryActions.setResearchMajorName(majorName));
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      if (researchMajorName) {
        let majorList = await launchRequest(APIS.GET_MAJOR_LIST, {
          researchMajorName
        }, DominConfigs.REQUEST_TYPE.POST)

        setMajorList(majorList);
      }
    })();
  }, [researchMajorName, dispatch]);

  // useEffect(() => {
  //   // const hasVoluntary = !!(voluntary[lotId] && voluntary[lotId].length);
  //   (async () => {

  //   })();
  // }, []);

  return (
    <div style={{ padding: '30px' }}>
      <Select
        showSearch
        style={{ width: '100%', paddingBottom: '20px' }}
        placeholder='请输入专业名称'
        onSearch={handleSearch}
        onChange={handleChange}
      >
        {fuzzyMajorList.map((major) => {
          return (
            <Option
              key={`${major.uuid} ${major.majorName}`}
              value={major.majorName}
            >
              {major.majorName}
            </Option>
          );
        })}
      </Select>
      <Table
        dataSource={majorList}
        rowKey={(record) => record.id}
      >
        <Column
          title='国际代码'
          dataIndex='major_level_two_code'
          key='major_level_two_code'
        />
        <Column
          title='专业名称'
          dataIndex='major_name'
          key='major_name'
        />
        <Column
          title='查看详情'
          dataIndex='major_name'
          key='major_name'
          render={(text, record) => {
            return record.major_level_two_code ? <Link
              to={{
                pathname: `/${MAJOR_DETAIL.path}/${record.major_level_two_code}`,
              }}
            >
              <Button type='link' style={{ marginLeft: '-16px' }}>查看详情</Button>
            </Link> : '查看详情'
          }}
        />
      </Table>
    </div >
  );
};