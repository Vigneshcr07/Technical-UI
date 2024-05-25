import React, { useState } from 'react';
import Select from 'react-select';

import './index.css';

const OptionSelect = ({
     title = true,
     options,
     name = 'Input',
     keyname,
     placeholder = '',
     onChange,
     width = '100%',
     height = '90px',
     OptionSelectHeight = '40px',
     index = '',
     style,
     value,
     error = false,
     disable = false,
     important = false,
     valueKey,
     lableKey,
     isMulti = false

}) => {
     const optionSelectProps = {
          style: { ...style, width: width, height: height },
     };

     const _handleOnchange = (e) => {
          onChange(keyname, e, index);
     };


     const customStyles = {

          option: (provided, state) => ({
               ...provided,
               fontFamily: 'Monstserrat-Regular',
               fontSize: '12px',
               background: state.isFocused ? '#1167b2' : '#fff',
               color: state.isFocused ? '#fff' : '#000'
          }),
     };

     return (
          <div className={'Dimmenxion-option-select-container'} {...optionSelectProps}>
               <div className={'Dimmenxion-option-select-name-block'}>
                    {name}
                    {important && <span className='important-field'>*</span>}{' '}
               </div>
               <Select
                    isMulti={isMulti}
                    options={options}
                    width={width}
                    isDisabled={disable}
                    className={'Dimmenxion-option-select'}
                    placeholder={<div className="select-placeholder-text">{placeholder ? placeholder : "Select"}</div>}
                    value={value}
                    style={{ height: OptionSelectHeight }}
                    onChange={_handleOnchange}
                    styles={customStyles}
                    index={index !== '' ? index : ''}
               />
          </div>
     );
};

export default OptionSelect;
