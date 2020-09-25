import React from 'react';
import './primaryBtn.scss';

const primaryBtn = ({ onClick, children, classOverride }) => {
  return (
    <button
      type="button"
      className={`primaryBtn ${classOverride}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default primaryBtn;
