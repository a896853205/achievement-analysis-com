import React, { useState, useEffect } from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '@/redux/voluntary-model';

// UI组件
import { Checkbox, Radio } from 'antd';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '../../../../constants/api-constants';
import * as DominConfigs from '../../../../constants/domin-constants';

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

const mapDispatchToProps = dispatch => {
  return {
    recordSchoolOption: params => {
      dispatch(voluntaryActions.recordSchoolOption(params));
    },
    setLotId: lotId => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    initVoluntary: params => {
      dispatch(voluntaryActions.initVoluntary(params));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    },
    recordVoluntary: params => {
      dispatch(voluntaryActions.recordVoluntary(params));
    },
    recordSchoolOptionAndList: params => {
      dispatch(voluntaryActions.recordSchoolOption(params));
      dispatch(voluntaryActions.recordSchoolList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  const [lotsOption, setLotsOption] = useState([]);
  const [schoolNature, setSchoolNature] = useState([]);
  const [schoolProperty, setSchoolProperty] = useState([]);
  const [schoolType, setSchoolType] = useState([]);
  const [areaFeature, setAreaFeature] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [gatherOptionList, setGatherOptionList] = useState([]);

  let {
    lotId,
    initVoluntary,
    recordSchoolOption,
    recordVoluntary
  } = props;

  useEffect(() => {
    // const hasVoluntary = !!(voluntary[lotId] && voluntary[lotId].length);
    (async () => {
      let [
        {
          gatherOptionList,
          schoolNature,
          schoolProperty,
          schoolType,
          areaFeature,
          voluntaryOptionList,
          provinceList
        },
        { lotsOption },
        voluntary
      ] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_OPTION, {
          lotId
        }),
        launchRequest(APIS.GET_LOTS_OPTION, {}, DominConfigs.REQUEST_TYPE.GET),
        launchRequest(APIS.GET_TEMP_VOLUNTARY)
      ]);

      // 先判断是否有暂存
      if (voluntary && voluntary[lotId] && voluntary[lotId].length) {
        recordVoluntary(voluntary);
      } else {
        // 然后再判断每个批次的表格是否有基础信息
        initVoluntary(voluntaryOptionList);
      }
      
      setLotsOption(lotsOption);
      setSchoolNature(schoolNature);
      setSchoolProperty(schoolProperty);
      setSchoolType(schoolType);
      setAreaFeature(areaFeature);
      setProvinceList(provinceList);
      setGatherOptionList(gatherOptionList)
    })();
  }, [lotId, initVoluntary, recordVoluntary]);

  useEffect(() => {
    return () => {
      // 组件销毁时将所有的选项清空
      recordSchoolOption({
        natureValues: [],
        propertyValues: [],
        typeValues: [],
        provinceListValues: [],
        areaFeatureValues: []
      });
    };
  }, [recordSchoolOption]);
  // 组件销毁时将志愿表数组清空
  useEffect(() => {
    return () => {
      recordVoluntary([]);
    };
  }, [recordVoluntary]);

  // 学校批次改变
  const handleLotsChange = e => {
    (async () => {
      // 调用查询表格数据函数
      props.setLotId(e.target.value);
      props.recordSchoolList();

      // 需要重构成saga -----
      let { voluntaryOptionList } = await launchRequest(
        APIS.GET_SCHOOL_OPTION,
        {
          lotId: e.target.value
        }
      );

      if (
        !(
          props.voluntary[e.target.value] &&
          props.voluntary[e.target.value].length
        )
      ) {
        props.initVoluntary(voluntaryOptionList);
      }
    })();
  };

  // 办学性质改变
  const handleNatureChange = async checkedValues => {
    props.recordSchoolOption({ natureValues: checkedValues });
    props.recordSchoolList();
  };

  // 学校属性改变
  const handlePropertyChange = async checkedValues => {
    props.recordSchoolOption({ propertyValues: checkedValues });
    props.recordSchoolList();
  };

  // 高校类别改变
  const handleTypeChange = async checkedValues => {
    props.recordSchoolOption({ typeValues: checkedValues });
    props.recordSchoolList();
  };

  //学校省份改变
  const handleProvinceListChange = async checkedValues => {
    props.recordSchoolOption({ provinceListValues: checkedValues });
    props.recordSchoolList();
  };

  // 地域特色改变
  const handleAreaFeatureChange = async checkedValues => {
    props.recordSchoolOption({ areaFeatureValues: checkedValues });
    props.recordSchoolList();
  };
  // 改变集合
  const handleGatherChange = async e => {
    props.recordSchoolOptionAndList({ gatherValue: e.target.value });
  };

  return (
    <React.Fragment>

      <div className='school-option-box'>
        <div className='option-box'>
          <span className='option-name'>报考批次</span>
          <Radio.Group onChange={handleLotsChange} value={props.lotId}>
            {lotsOption.map(lotsItem => {
              // 取消三批
              if(lotsItem.id !== 6) {
                return (
                  <Radio value={lotsItem.id} key={lotsItem.id}>
                    {lotsItem.lots_name}
                  </Radio>
                );
              } else return null;
            })}
          </Radio.Group>
        </div>
        <div className='option-box'>
          <span className='option-name'>办学性质</span>
          <Checkbox.Group onChange={handleNatureChange}>
            {schoolNature.map(natureItem => {
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
          <Checkbox.Group onChange={handlePropertyChange}>
            {schoolProperty.map(propertyItem => {
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
          <Checkbox.Group onChange={handleTypeChange}>
            {schoolType.map(typeItem => {
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
          <Checkbox.Group onChange={handleAreaFeatureChange}>
            {areaFeature.map(areaFeatureItem => {
              return (
                <Checkbox key={areaFeatureItem.id} value={areaFeatureItem.id}>
                  {areaFeatureItem.type}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </div>
        <div className='option-box'>
          <span className='option-name'>所在省份</span>
          <Checkbox.Group onChange={handleProvinceListChange}>
            {provinceList.map(provinceItem => {
              return (
                <Checkbox key={provinceItem.code} value={provinceItem.code}>
                  {provinceItem.name}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </div>
      </div>
      <Radio.Group
        className='school-first-btn-group'
        value={props.gatherValue}
        onChange={handleGatherChange}
      >
        {gatherOptionList.map(item => (
          <Radio.Button key={item.value} className='btn' value={item.value}>
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group>
      <span className='school-first-alert-box'>
          *
        {gatherOptionList.find(
          gather => gather.value === props.gatherValue
        )
          ? gatherOptionList.find(
            gather => gather.value === props.gatherValue
          ).describe
          : undefined}
        </span>
    </React.Fragment>
  );
});
