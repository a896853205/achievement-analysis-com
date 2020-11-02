import React from 'react';

import { Spin } from 'antd';
import '@/style/page-loading.css';

export default function PageLoading() {
  return (
    <div className='page-loading-box'>
      <Spin size='large' />
    </div>
  );
}
