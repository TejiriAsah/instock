import React from 'react';
import './PrimaryButton.scss';

const PrimaryButton = ({ colour, children, onClick }) => {
  return (
    <button className={`primary${colour === 'red' ? ' primary--red' : ''}`}  onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
