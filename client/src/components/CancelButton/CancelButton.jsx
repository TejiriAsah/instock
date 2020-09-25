import React from 'react';
import { withRouter } from 'react-router-dom';

import './CancelButton.scss';

const CancelButton = withRouter(({ history, onClick }) => (
  <button
    className='cancel'
    onClick={e => {
      if (onClick) {
        onClick(e);
      } else {
        e.preventDefault();
        return history.goBack();
      }
    }}
  >Cancel</button>
))

export default CancelButton;
