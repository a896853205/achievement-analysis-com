import React, { useState } from 'react';

// UI组件
import { Tree, Tabs } from 'antd';
// css
import '@/style/detail/major-detail.css';

const { TreeNode } = Tree;
const { TabPane } = Tabs;

export default props => {
  return (
    <div className='page-inner-width-box major-detail-box'>
      <div className='major-detail-left-box'>
        <div className='major-detail-tree-box'>
          <Tree showLine defaultExpandedKeys={['0-0-0']}>
            <TreeNode title='parent 1' key='0-0'>
              <TreeNode title='parent 1-0' key='0-0-0'>
                <TreeNode title='leaf' key='0-0-0-0' />
                <TreeNode title='leaf' key='0-0-0-1' />
                <TreeNode title='leaf' key='0-0-0-2' />
              </TreeNode>
              <TreeNode title='parent 1-1' key='0-0-1'>
                <TreeNode title='leaf' key='0-0-1-0' />
              </TreeNode>
              <TreeNode title='parent 1-2' key='0-0-2'>
                <TreeNode title='leaf' key='0-0-2-0' />
                <TreeNode title='leaf' key='0-0-2-1' />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
        <div className='major-detail-correlation-box'>
          <h5>相关专业</h5>
          <ul>
            <li>逻辑学</li>
            <li>宗教学</li>
            <li>伦理学</li>
          </ul>
        </div>
      </div>
      <div className='major-detail-right-box'>
        <div className='major-detail-profile-box'>
          <h4>哲学</h4>
          <span>哲学 > 哲学类</span>
          <span>国标代码010101(不可用于填报)</span>
        </div>
        <div className='major-detail-show-box'>
          <Tabs type='card'>
            <TabPane tab='专业概况' key='1'>
              <div>
                <div>
                  <h5>专业概览</h5>
                  <div>
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h5>专业介绍</h5>
                  <p></p>
                </div>
                <div>
                  <h5>考研方向</h5>
                  <p>法学、法律(法学)、民商法学、经济法学</p>
                </div>
                <div>
                  <h5>主要课程</h5>
                  <p>
                    法理学、宪法学、民法学、刑法学、刑事诉讼法、行政法与行政诉讼法、国际私法、国际法、著作权法（版权法）、专利法、商标法、知识产权国际公约、专利文献检索、知识产权损害赔偿、合同法、知识产权法原理、网络环境下的知识产权保护、企业知识产权战略、反不正当竞争法、知识产权代理实务等
                  </p>
                </div>
                <div>
                  <h5>就业方向</h5>
                  <p>
                    毕业生能分别在知识产权管理机构、大型企业、科研院所等单位从事知识产权管理工作；也能在知识产权中介服务机构、律师事务所或人民法院等单位从事知识产权服务工作或审判工作；还能在研究单位从事知识产权或相关的研究工作。
                  </p>
                </div>
                <div>
                  <h5>社会名人</h5>
                  <p>冯晓青、来小鹏、徐家力等。</p>
                </div>
              </div>
            </TabPane>
            <TabPane tab='开设院校' key='2'>
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
