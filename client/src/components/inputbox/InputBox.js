import React from 'react';
import './InputBox.scss';
import alert from '../../assets/icons/error-24px.svg';

const InputBox = ({ label, value, placeholder, onChange, error }) => {
  return (
    <>
      <label className="input__label">{label}</label>
      <input
        type="text"
        value={value}
        className={error ? 'input__error' : 'input__field'}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
      {error && (
        <div className="error-alert">
          <img src={alert} alt="error" className="error-icon" />
          <p className="error-message">{error}</p>
        </div>
      )}
    </>
  );
};

export default InputBox;