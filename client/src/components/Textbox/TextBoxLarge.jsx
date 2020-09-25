import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './Textbox.scss';

const TextboxLarge = ({ value, onChange, placeholder, label, error }) => {
  return (
    <>
      <label className='textbox textbox--large'>
        { label }
        <textarea
          className={`textbox__textarea${error ? ' textbox--error' : ''}`}
          placeholder={placeholder}
          onChange={(e) => onChange(e, 'description')}
          value={value}
        ></textarea>
      </label>
      <ErrorMessage error={error}/>
    </>
  )
}

export default TextboxLarge;