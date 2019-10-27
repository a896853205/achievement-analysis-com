import React from 'react';

// UI组件
import { Tree, Tabs, Icon } from 'antd';
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
                          <span>四年</span>
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
                  <p>
                    哲学是人文科学领域内的基础学科，是对基本和普遍之问题的研究。在希腊文中，哲学是爱智慧的意思。学哲学，就是学习智慧。哲学的爱智，无论是对自然的惊讶，还是认识人自己，都不仅仅是一种对知识的追求，更重要的是一种对生活意义的关切，对生活境界的陶冶。哲学，是使人崇高起来的学问。哲学的爱智，还是一种反思的、批判的思想活动，它要追究各种知识的根据，思考历史进步的尺度，询问真善美的标准，探索生活信念的前提。
                  </p>
                </div>
                <div className='major-detail-show-item-box'>
                  <h5>考研方向</h5>
                  <p>法学、法律(法学)、民商法学、经济法学</p>
                </div>
                <div className='major-detail-show-item-box'>
                  <h5>主要课程</h5>
                  <p>
                    法理学、宪法学、民法学、刑法学、刑事诉讼法、行政法与行政诉讼法、国际私法、国际法、著作权法（版权法）、专利法、商标法、知识产权国际公约、专利文献检索、知识产权损害赔偿、合同法、知识产权法原理、网络环境下的知识产权保护、企业知识产权战略、反不正当竞争法、知识产权代理实务等
                  </p>
                </div>
                <div className='major-detail-show-item-box'>
                  <h5>就业方向</h5>
                  <p>
                    毕业生能分别在知识产权管理机构、大型企业、科研院所等单位从事知识产权管理工作；也能在知识产权中介服务机构、律师事务所或人民法院等单位从事知识产权服务工作或审判工作；还能在研究单位从事知识产权或相关的研究工作。
                  </p>
                </div>
                <div className='major-detail-show-item-box'>
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
