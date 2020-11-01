// select选择控件
import React, { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
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
  const handleSearch = (e) => {
    console.log(e);
    const major = e;
    axios
      .get('http://localhost:1028/getLikeMajorList', {
        params: {
          major,
        },
      })
      .then((response) => {
        console.log('前端获得response', response.data);
        setData(response.data);
      })
      .catch(function (err) {
        console.log(err);
        setData([]);
      });
  };

  // 失去焦点时handleBlur,清空data
  const handleBlur = () => {
    setData([]);
  };

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="请输入专业名称"
      onSearch={handleSearch}
      onBlur={handleBlur}
      onChange={handleChange}
    >
      {data.map((d) => {
        return (
          <Option key={d.id} value={d.name}>
            {d.name}
          </Option>
        );
      })}
    </Select>
  );
}

export default MySelect;