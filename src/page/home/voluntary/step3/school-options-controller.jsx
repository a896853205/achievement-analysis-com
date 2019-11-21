import React, { useState, useEffect } from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '@/redux/voluntary-model';

// UI组件
import { Checkbox, Radio } from 'antd';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';
import * as DominConfigs from '@/constants/domin-constants';

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
      dispatch(voluntaryActions.recordSchoolList());
    },
    setLotId: lotId => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
    initVoluntary: params => {
      dispatch(voluntaryActions.initVoluntary(params));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    }
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

  let { lotId, voluntary, initVoluntary } = props;

  const hasVoluntary = !(voluntary[lotId] && voluntary[lotId].length);
  useEffect(() => {
    (async () => {
      let [
        {
          schoolNature,
          schoolProperty,
          schoolType,
          areaFeature,
          voluntaryOptionList,
          provinceList
        },
        { lotsOption }
      ] = await Promise.all([
        launchRequest(APIS.GET_SCHOOL_OPTION, {
          lotId
        }),
        launchRequest(APIS.GET_LOTS_OPTION, {}, DominConfigs.REQUEST_TYPE.GET)
      ]);

      if (hasVoluntary) {
        initVoluntary(voluntaryOptionList);
      }

      setLotsOption(lotsOption);
      setSchoolNature(schoolNature);
      setSchoolProperty(schoolProperty);
      setSchoolType(schoolType);
      setAreaFeature(areaFeature);
      setProvinceList(provinceList);
    })();
  }, [lotId, hasVoluntary, initVoluntary]);

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
  };

  // 学校属性改变
  const handlePropertyChange = async checkedValues => {
    props.recordSchoolOption({ propertyValues: checkedValues });
  };

  // 高校类别改变
  const handleTypeChange = async checkedValues => {
    props.recordSchoolOption({ typeValues: checkedValues });
  };

  //学校省份改变
  const handleProvinceListChange = async checkedValues => {
    props.recordSchoolOption({ provinceListValues: checkedValues });
  };

  // 地域特色改变
  const handleAreaFeatureChange = async checkedValues => {
    props.recordSchoolOption({ areaFeatureValues: checkedValues });
  };

  return (
    <div className='school-option-box'>
      <div className='option-box'>
        <span className='option-name'>报考批次</span>
        <Radio.Group onChange={handleLotsChange} value={props.lotId}>
          {lotsOption.map(lotsItem => {
            return (
              <Radio value={lotsItem.id} key={lotsItem.id}>
                {lotsItem.lots_name}
              </Radio>
            );
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
  );
});
