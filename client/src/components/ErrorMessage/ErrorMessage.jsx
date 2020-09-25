import React, { Component } from 'react';

import ErrorIcon from '../../assets/icons/error-24px.svg';

import './ErrorMessage.scss';

class ErrorMessage extends Component {
  render() {
    return (
      <div className={`error${this.props.error ? ' error--active' : ''}`}>
        <img
          className='error__icon'
          src={ErrorIcon}
          alt='An error ping icon'
        />
        <p className='error__text'>This field is required</p>
      </div>
    )
  }
}

export default ErrorMessage;