// select选择控件
import React, { useState } from 'react';
import { Select } from 'antd';
// import axios from 'axios';
import 'antd/dist/antd.css';
import { launchRequest } from 'util/request';
const { Option } = Select;

// 函数组件编写
function MySelect() {
  // 组件中的的两个state：data表示查找的列表，value表示在input框中输入的值
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  // 状态处理函数handleChange(input变化时回调)
  const handleChange = (e) => {
    console.log(`选中项为${e}`);
    setValue(e);
  };

  // 变化处理函数handleSelect（根据value值进行模糊查询）
  const handleSearch = async (req, res) => {
    console.log('现在查询列表为：', data);
    console.log(req);
    const major = req;
    console.log(`前端请求major=${major}`);
    if (major.length == 0) {
      setData([]);
    } else {
      // 获得后台返回的模糊查询数组
      let results = await launchRequest(
        'http://localhost:1208/fuzzySearchMajor',
        {
          major,
        },
        'GET'
      );
      console.log('后台返回数据：', results);
      if (results) {
        // 获得新的查询数组之前先清空数组
        // setData([]);
        console.log('执行setData([])的数组为：', data);
        setData(results);
      } else {
        setData([]);
      }
    }
  };

  // 失去焦点时handleBlur,清空data
  /* const handleBlur = () => {
    setData([]);
  }; */

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder='请输入专业名称'
      onSearch={handleSearch}
      onChange={handleChange}
    >
      {data.map((d) => {
        return (
          <Option
            key={`${d.major_id} ${d.major_name}`}
            value={`${d.major_id} ${d.major_name}`}
          >
            {d.major_name}
          </Option>
        );
      })}
    </Select>
  );
}

export default MySelect;
