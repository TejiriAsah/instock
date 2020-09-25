import React from 'react';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './Dropdown.scss';

const Dropdown = ({ options, label, onChange, defaultValue, error }) => {
  return (
    <>
      <label className='dropdown'>
        {label}
        <select
          className={`dropdown__input${error ? ' dropdown--error': ''}`}
          defaultValue='DEFAULT'
          onChange={onChange}
        >
        <option
          className='dropdown__default'
          value='DEFAULT'
          disabled hidden>{defaultValue}</option>
          {
            options.map(option => (
              <option key={option.id} value={option.name}>{option.name}</option>
            ))
          }
        </select>
      </label>
      <ErrorMessage error={error}/>
    </>
  )
}

export default Dropdown;