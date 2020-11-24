import React from 'react';

// 请求文件
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';

// 自定义组件
// import SchoolDetailController from '../home/school/school-detail';

// UI
import { Checkbox, List, Icon, Tag, Input } from 'antd';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as schoolActions } from '@/redux/school-model';

// 路由
import { Link } from 'react-router-dom';
import { SCHOOL_DETAIL } from '@/constants/route-constants';

// css
import '@/style/search/school-search.css';
import { LOGIN } from 'constants/route-constants';

const { Search } = Input;

class SchoolSearchController extends React.Component {
  state = {
    // 搜索输入
    schoolNameValue: '',

    // 分页
    page: 1,
    totalSchool: 0,

    // option的数组
    schoolNature: [],
    schoolProperty: [],
    schoolType: [],
    areaFeature: [],

    schoolList: [],

    // option选择的数组
    natureValues: [],
    propertyValues: [],
    typeValues: [],
    areaFeatureValues: [],

    // 详细情况的开关
    schoolDrawerVisible: false
  };

  render() {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <div className='school-search-box'>
        <div className='school-search-content'>
          <div className='school-input-box'>
            <Search
              enterButton='搜索学校'
              size='large'
              onSearch={this.searchSchool}
              onChange={e => {
                this.setState({ schoolNameValue: e.target.value });
              }}
              placeholder='请输入院校名称'
            />
          </div>
          <div className='school-list-option-box'>
            <div className='option-box'>
              <span className='option-name'>办学性质</span>
              <Checkbox.Group onChange={this.handleNatureChange}>
                {this.state.schoolNature.map(natureItem => {
                  return (
                    <Checkbox value={natureItem.id} key={natureItem.id}>
                      {natureItem.type}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className='option-box'>
              <span className='option-name'>学校属性</span>
              <Checkbox.Group onChange={this.handlePropertyChange}>
                {this.state.schoolProperty.map(propertyItem => {
                  return (
                    <Checkbox key={propertyItem.id} value={propertyItem.id}>
                      {propertyItem.type}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className='option-box'>
              <span className='option-name'>高校类别</span>
              <Checkbox.Group onChange={this.handleTypeChange}>
                {this.state.schoolType.map(typeItem => {
                  return (
                    <Checkbox key={typeItem.id} value={typeItem.id}>
                      {typeItem.type}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </div>
            <div className='option-box'>
              <span className='option-name'>地域特色</span>
              <Checkbox.Group onChange={this.handleAreaFeatureChange}>
                {this.state.areaFeature.map(areaFeatureItem => {
                  return (
                    <Checkbox
                      key={areaFeatureItem.id}
                      value={areaFeatureItem.id}
                    >
                      {areaFeatureItem.type}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
          <div className='school-list-box'>
            <List
              grid={{ gutter: 17, column: 2 }}
              itemLayout='vertical'
              size='large'
              loading={this.state.loading}
              pagination={{
                onChange: page => {
                  this.handlePageChange(page);
                },
                pageSize: 12,
                total: this.state.totalSchool,
                current: this.state.page
              }}
              dataSource={this.state.schoolList}
              renderItem={item => (
                <List.Item
                  className='search-school-list-item'
                  key={item.school_id}
                  actions={[
                    <IconText
                      type='star-o'
                      text='156'
                      key='list-vertical-star-o'
                    />,
                    <IconText
                      type='like-o'
                      text='156'
                      key='list-vertical-like-o'
                    />,
                    <IconText
                      type='message'
                      text='2'
                      key='list-vertical-message'
                    />
                  ]}
                >
                  <Link
                    to={{
                      pathname: !this.props.user.roleCode ? `/${LOGIN.path}` : `/${SCHOOL_DETAIL.path}/${item.school_id}`
                    }}
                  >
                    <h5
                      className='school-title'
                    // onClick={() => {
                    //   this.handleClickSchoolName(item.school_id);
                    // }}
                    >
                      {item.school_name}
                    </h5>
                  </Link>
                  <p>{item.school_nature_name}</p>
                  <p style={{ height: '20px' }}>
                    {item.school_property_name.map(property => (
                      <Tag key={property} color='#108ee9'>
                        {property}
                      </Tag>
                    ))}
                  </p>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    const searchName = this.props.match.params.searchName || '';

    await this.setState({
      loading: true,
      schoolNameValue: searchName
    });

    let [
      { schoolNature, schoolProperty, schoolType, areaFeature },
      { schoolList, totalSchool }
    ] = await Promise.all([
      launchRequest(APIS.GET_SCHOOL_OPTION, {}),
      this.getSchool()
    ]);

    await this.setState({
      schoolNature,
      schoolProperty,
      schoolType,
      areaFeature,
      loading: false,
      schoolList,
      totalSchool
    });
  };

  componentWillReceiveProps = async (nextProps) => {
    const searchName = nextProps.match.params.searchName || '';
    
    if (searchName !== this.state.schoolNameValue) {
      await this.setState({
        loading: true,
        schoolNameValue: searchName
      });

      let [{ schoolList, totalSchool }] = await Promise.all([this.getSchool()]);

      await this.setState({
        loading: false,
        schoolList,
        totalSchool
      });
    }
  };

  searchSchool = async () => {
    await this.setState({
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList, totalSchool } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false,
      totalSchool,
      page: 1
    });
  };

  // 办学性质改变
  handleNatureChange = async checkedValues => {
    await this.setState({
      natureValues: checkedValues,
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList, totalSchool } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false,
      totalSchool
    });
  };

  // 学校属性改变
  handlePropertyChange = async checkedValues => {
    await this.setState({
      propertyValues: checkedValues,
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList, totalSchool } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false,
      totalSchool
    });
  };

  // 高校类别改变
  handleTypeChange = async checkedValues => {
    await this.setState({
      typeValues: checkedValues,
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList, totalSchool } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false,
      totalSchool
    });
  };

  // 地域特色改变
  handleAreaFeatureChange = async checkedValues => {
    await this.setState({
      areaFeatureValues: checkedValues,
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList, totalSchool } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false,
      totalSchool
    });
  };

  getSchool = async () => {
    // 获取学校配置项
    let {
      natureValues,
      propertyValues,
      typeValues,
      areaFeatureValues,
      page,
      schoolNameValue
    } = this.state;

    let schoolObj = await launchRequest(APIS.SEARCH_SCHOOL, {
      natureValues,
      propertyValues,
      typeValues,
      areaFeatureValues,
      schoolName: schoolNameValue,
      page
    });

    return schoolObj;
  };

  // 换页修改学校列表
  handlePageChange = async page => {
    await this.setState({
      page,
      loading: true
    });

    // 调用查询表格数据函数
    let { schoolList } = await this.getSchool();

    this.setState({
      schoolList,
      loading: false
    });
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const userStore = store['userStore'];
  let { user } = userStore;

  return {
    user,
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    showSchoolDetail: params => {
      dispatch(schoolActions.showSchoolDetail(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolSearchController);
