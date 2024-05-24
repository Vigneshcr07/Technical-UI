import React from 'react';
import Select from 'react-select';

import './index.css';

const OptionSelect = ({
     designId = 'option_select',
     id = 'select_id',
     title = true,
     options = [],
     name = 'Input',
     keyname,
     placeholder = '',
     onChange,
     width = '200px',
     height = '80px',
     style,
     value,
     error = false,
     disable = false,
     optionFields = [],
     important = true,
     toast = false,
     toastMsg = 'Require field',
     orderBy = '',
}) => {
     const optionSelectProps = {
          style: { ...style, width: width, height: height },
     };


     const _ChageOptionData = (datas) => {
          let items = [];
          for (let index = 0; index < datas.length; index++) {
               if (optionFields.length === 0) {
                    items.push({ value: datas[index], label: datas[index] });
               }
               if (optionFields.length === 2) {
                    items.push({ value: datas[index][optionFields[0]], label: datas[index][optionFields[1]] });
               }
               if (optionFields.length === 3) {
                    items.push({
                         value: datas[index][optionFields[0]],
                         label: `${datas[index][optionFields[1]]} - ${datas[index][optionFields[2]]}`,
                    });
               }
          }

          return items;
     };

     const _handleOnchange = (e) => {
          onChange(keyname, e);
     };

     const customStyles = {
          option: (provided, state) => ({
               ...provided,
               fontFamily: state.isSelected ? 'Monstserrat-SemiBold' : 'Monstserrat-Medium',
               fontSize: '12px',
               background: state.isFocused ? '#1167b2' : '#fff',
               color: state.isFocused ? '#fff' : '#000',
          }),
     };

     return (
          <div className={`option-select-container`} id={designId} {...optionSelectProps}>
               {toast && <div className='input-toast-con'>{toastMsg}</div>}
               {title && (
                    <div className={`option-select-name-block`}>
                         {name} {important && <span className='important-field'>*</span>}
                    </div>
               )}
               <Select
                    id={id}
                    classNamePrefix={"component_react_select"}
                    inputId={`${id}_2022`}
                    styles={customStyles}
                    options={options.length > 0 ? _ChageOptionData(options) : []}
                    width={width}
                    isDisabled={disable}
                    className={`option-select ${error ? 'error-field' : ''}`}
                    placeholder={placeholder ? placeholder : 'Select'}
                    value={value}
                    onChange={_handleOnchange}
                    
               />
          </div>
     );
};

export default OptionSelect;
