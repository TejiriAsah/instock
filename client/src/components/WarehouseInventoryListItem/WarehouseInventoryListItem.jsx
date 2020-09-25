import React, { Component } from 'react';

import Chevron from '../../assets/icons/chevron_right-24px.svg';
import Delete from '../../assets/icons/delete_outline-24px.svg';
import Edit from '../../assets/icons/edit-24px.svg';

import './WarehouseInventoryListItem.scss';

class WarehouseInventoryListItem extends Component {
  render() {
    const {
      itemName,
      status,
      category,
      quantity,
      warehouseName
    } = this.props;

    return (
      <div className='inventory-item'>
        <label className='inventory-item__header'>
          <p className='inventory-item__text inventory-item__text--item'>
            {itemName}
            <img className='inventory-item__chevron' src={Chevron} alt='A blue chevron' />
          </p>
        </label>
        <label className='inventory-item__header'>
          <p className='inventory-item__text'>{status}</p>
        </label>
        <label className='inventory-item__header inventory-item__header--category'>
          <p className='inventory-item__text'>{category}</p>
        </label>
        <label className='inventory-item__header'>
          <p className='inventory-item__text'>{quantity}</p>
        </label>
        <label className='inventory-item__header'>
          <p className='inventory-item__text'>{warehouseName}</p>
        </label>
        <button className='btn'>
          <img
          className='inventory-item__icon'
            src={Delete}
            alt='The delete button icon'
          />
        </button>
        <button className='btn'>
          <img
            className='inventory-item__icon'
            src={Edit}
            alt='The edit button icon'
          />
        </button>
      </div>
    )
  }
}

export default WarehouseInventoryListItem;
