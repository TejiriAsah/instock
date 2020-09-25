import React, { Component } from 'react';

import './WarehouseInfo.scss';

class WarehouseInfo extends Component {
  render() {
    return(
      <div className='info'>
        <label className='info__label info__label--address'>
          Warehouse address:
          <p className='info__text'> 
            {} 
          </p>
        </label>
        <div className='info__contact'>
          <label className='info__label'>
            info name:
            <p className='info__text'>Graeme Lyon</p>
            <p className='info__text'>Warehouse Manager</p>
          </label>
          <label className='info__label'>
            info information:
            <p className='info__text'>+1 647 504-0911</p>
            <p className='info__text'>glyon@instock.com</p>
          </label>
        </div>
      </div>
    )
  }
}

export default WarehouseInfo;
