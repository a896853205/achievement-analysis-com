import React from 'react';

// UI组件
import { Checkbox, Radio, Modal } from 'antd';

// 自定义组件
import TableController from './table-controller';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';
import * as DominConfigs from '../../../../constants/domin-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

const { confirm } = Modal;

class SchoolFirstController extends React.Component {
  state = {
    // option的数组
    lotsOption: [],
    schoolNature: [],
    schoolProperty: [],
    schoolType: [],
    areaFeature: [],
    gatherOptionList: [],
    provinceList: []
  };
  render() {
    return (
      <div>
        <div className="school-option-box">
          <div className="option-box">
            <span className="option-name">报考批次</span>
            <Radio.Group
              onChange={this.handleLotsChange}
              value={this.props.lotId}
            >
              {this.state.lotsOption.map(lotsItem => {
                return (
                  <Radio value={lotsItem.id} key={lotsItem.id}>
                    {lotsItem.lots_name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
          <div className="option-box">
            <span className="option-name">办学性质</span>
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
          <div className="option-box">
            <span className="option-name">学校属性</span>
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
          <div className="option-box">
            <span className="option-name">高校类别</span>
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
          <div className="option-box">
            <span className="option-name">地域特色</span>
            <Checkbox.Group onChange={this.handleAreaFeatureChange}>
              {this.state.areaFeature.map(areaFeatureItem => {
                return (
                  <Checkbox key={areaFeatureItem.id} value={areaFeatureItem.id}>
                    {areaFeatureItem.type}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </div>
          <div className="option-box">
            <span className="option-name">所在省份</span>
            <Checkbox.Group onChange={this.handleProvinceListChange}>
              {this.state.provinceList.map(provinceItem => {
                return (
                  <Checkbox key={provinceItem.id} value={provinceItem.id}>
                    {provinceItem.name}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </div>
        </div>
        <Radio.Group
          className="school-first-btn-group"
          value={this.props.gatherValue}
          onChange={this.handleGatherChange}
        >
          {this.state.gatherOptionList.map(item => (
            <Radio.Button key={item.value} className="btn" value={item.value}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
        <span className="school-first-alert-box">
          *
          {this.state.gatherOptionList.find(
            gather => gather.value === this.props.gatherValue
          )
            ? this.state.gatherOptionList.find(
                gather => gather.value === this.props.gatherValue
              ).describe
            : undefined}
        </span>
        <TableController />
      </div>
    );
  }

  componentDidMount = async () => {
    this.props.recordSchoolList();
    let [
      {
        schoolNature,
        schoolProperty,
        schoolType,
        areaFeature,
        voluntaryOptionList,
        gatherOptionList,
        provinceList
      },
      { lotsOption }
    ] = await Promise.all([
      launchRequest(APIS.GET_SCHOOL_OPTION, {
        lotId: this.props.lotId
      }),
      launchRequest(APIS.GET_LOTS_OPTION, {}, DominConfigs.REQUEST_TYPE.GET)
    ]);

    // 如果有志愿表就不初始化了
    if (!this.props.voluntary.length) {
      this.props.initVoluntary(voluntaryOptionList);
    }

    await this.setState({
      schoolNature,
      schoolProperty,
      schoolType,
      areaFeature,
      voluntaryOptionList,
      gatherOptionList,
      lotsOption,
      provinceList
    });
  };

  // 学校批次改变
  handleLotsChange = e => {
    confirm({
      title: '修改批次',
      content: '您确定修改批次吗,修改批次会使志愿表清空?',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // 调用查询表格数据函数
        this.props.setLotId(e.target.value);
        this.props.recordSchoolList();

        await this.setState({
          loading: true
        });

        // 需要重构成saga -----
        let { voluntaryOptionList } = await launchRequest(
          APIS.GET_SCHOOL_OPTION,
          {
            lotId: this.props.lotId
          }
        );
        this.props.initVoluntary(voluntaryOptionList);

        await this.setState({
          loading: false
        });
      },
      onCancel() {}
    });
  };

  // 办学性质改变
  handleNatureChange = async checkedValues => {
    this.props.recordSchoolOption({ natureValues: checkedValues });
  };

  // 学校属性改变
  handlePropertyChange = async checkedValues => {
    this.props.recordSchoolOption({ propertyValues: checkedValues });
  };

  // 高校类别改变
  handleTypeChange = async checkedValues => {
    this.props.recordSchoolOption({ typeValues: checkedValues });
  };

  //学校省份改变
  handleProvinceListChange = async checkedValues => {
    this.props.recordSchoolOption({ provinceListValues: checkedValues });
  };

  // 地域特色改变
  handleAreaFeatureChange = async checkedValues => {
    this.props.recordSchoolOption({ areaFeatureValues: checkedValues });
  };

  // 改变集合
  handleGatherChange = async e => {
    this.props.recordSchoolOption({ gatherValue: e.target.value });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    recordSchoolOption: params => {
      dispatch(voluntaryActions.recordSchoolOption(params));
      dispatch(voluntaryActions.recordSchoolList(1));
    },
    setLotId: lotId => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    initVoluntary: params => {
      dispatch(voluntaryActions.initVoluntary(params));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList(1));
    }
  };
};

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary, schoolOption } = voluntaryStore;
  let {
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    gatherValue
  } = schoolOption;
  return {
    lotId: lot_id,
    voluntary: [...voluntary],
    natureValues,
    propertyValues,
    typeValues,
    areaFeatureValues,
    gatherValue
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolFirstController);
