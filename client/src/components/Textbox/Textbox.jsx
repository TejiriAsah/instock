import React from 'react';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './Textbox.scss';

const Textbox = ({ type, label, value, placeholder, onChange, error }) => {
  return (
    <div className='textbox'>
      <label className='textbox__label'>{label}</label>
      <input
        type={type}
        value={value}
        className={`textbox__field${error ? ' textbox--error': ''}${type === 'number' ? ' textbox__field--number' : ''}`}
        placeholder={placeholder}
        onChange={onChange}
      />
      <ErrorMessage error={error}/>
    </div>
  );
};

export default Textbox;
