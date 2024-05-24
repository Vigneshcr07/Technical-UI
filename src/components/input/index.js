import React from 'react';
import PropTypes from 'prop-types'; 
import './index.css';

const Validation_Regex = {
     NUMBER: /^[0-9]*$/,
     STRING: /^[a-zA-Z ]*$/,
     DECIMAL: /^(100|([0-9][0-9]?(\.[0-9]+)?))$/,
     UPPERCASE: /^[a-zA-Z0-9]*$/,
     EMAIL: '/^[a-z0-9@.]*$/',
     RESTRICTED: /^[a-zA-Z0-9 ()'&.,-/]*$/gi,
     RESTRICTED2: /^[a-zA-Z0-9 ()@.,-]*$/gi,
     RESTRICTED3: /^[A-Z0-9_-]*$/gi,
};
const InputField = ({
     name = 'Input',
     placeholder = '',
     width = '100%',
     height = '72px',
     inputHeight = '40px',
     keyname,
     style,
     onBlur,
     onChange,
     onClick,
     maxLength,
     value = '',
     type = 'text',
     index = '',
     disable = false,
     toast = false,
     avoidSplChar = false,
     toastMsg = 'Require field',
     inputType = 'mixedString',
     important = false,
     min,
     max,
     id = 'input_id',
     classNameInLabel = '',
}) => {
     const inputProps = {
          style: { ...style, width: width, height: height },
     };

     const [errorValue, setErrorValue] = React.useState(false);
     console.log(errorValue);
     const _handleOnChange = (e) => {
          if (Object.keys.length > 0) {
               setErrorValue(true);
          }
          if (inputType === 'number') {

               if (Validation_Regex.NUMBER.test(Number(e.target.value))) {

                    onChange(keyname, e.target.value.trim(), index);
               } else {
                    e.preventDefault();
               }
          }
          if (inputType === 'decimal') {
               if (Validation_Regex.DECIMAL.test(Number(e.target.value))) {
                    onChange(keyname, e.target.value.trim(), index);
               }
          }
          if (inputType === 'numberString') {
               if (Validation_Regex.R.test(e.target.value)) {
                    onChange(keyname, e.target.value.trim(), index);
               }
          }
          if (inputType === 'string') {
               if (Validation_Regex.STRING.test(e.target.value)) {
                    onChange(keyname, e.target.value, index);
               }
          }
          if (inputType === 'upperCase') {
               if (Validation_Regex.UPPERCASE.test(e.target.value)) {
                    onChange(keyname, e.target.value.toUpperCase(), index);
               }
          }

          if (inputType === 'restrictedString') {
               if (Validation_Regex.RESTRICTED.test(e.target.value)) {

                    onChange(keyname, e.target.value, index);
               }
          }
          if (inputType === 'reasonString') {
               if (Validation_Regex.RESTRICTED2.test(e.target.value)) {

                    onChange(keyname, e.target.value, index);
               }
          }
          if (inputType === 'employeeCode') {
               if (Validation_Regex.RESTRICTED3.test(e.target.value)) {
                    onChange(keyname, e.target.value.toUpperCase(), index);
               }
          }
          if (inputType === 'mixedString') {
               let value = avoidSplChar ? e.target.value.replace(/[^\w\s]/gi, '') : e.target.value;
               if (type === 'text') {
                    onChange(keyname, String(value), index);
               } else {
                    onChange(keyname, value, index);
               }
          }

          if (inputType === 'emailType') {
               let value = avoidSplChar ? e.target.value.replace(/[^\w\s@.]/gi, '') : e.target.value;
               if (type === 'email') {
                    onChange(keyname, String(value).toLowerCase(), index);
               } else {
                    onChange(keyname, value, index);
               }
          } else {
               e.preventDefault();
          }
     };

     return (
          <div className='input-container' {...inputProps}>
               {toast && <div className='input-toast-con'>{toastMsg}</div>}
               <div className={`input-name-block ${classNameInLabel}`}>
                    {name}
                    {important && <span className='important-field'>*</span>}{' '}
               </div>
               <input
                    data-index={index !== '' ? index : 0} // Use data-index instead of index
                    type={type}
                    name={name}
                    label={name}
                    id={id}
                    min={min}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    className={'input'}
                    placeholder={placeholder !== '' ? placeholder : name}
                    style={{ height: inputHeight }}
                    onChange={_handleOnChange}
                    value={value}
                    disabled={disable}
                    max={max}
                    onClick={onClick}
               />
          </div>
     );
};

InputField.propTypes = {
     name: PropTypes.string,
     placeholder: PropTypes.string,
     width: PropTypes.string,
     height: PropTypes.string,
     inputHeight: PropTypes.string,
     keyname: PropTypes.string,
     style: PropTypes.object,
     onBlur: PropTypes.func,
     onChange: PropTypes.func,
     onClick: PropTypes.func,
     maxLength: PropTypes.number,
     value: PropTypes.string,
     type: PropTypes.string,
     index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Corrected PropTypes for index
     disable: PropTypes.bool,
     toast: PropTypes.bool,
     avoidSplChar: PropTypes.bool,
     toastMsg: PropTypes.string,
     inputType: PropTypes.string,
     important: PropTypes.bool,
     min: PropTypes.number,
     max: PropTypes.number,
     id: PropTypes.string,
     onKeyPress: PropTypes.func, // Corrected PropTypes for onKeyPress
     classNameInLabel: PropTypes.string,
     Error_Message: PropTypes.any, // Adjusted PropTypes according to the actual type
};

export default InputField;
