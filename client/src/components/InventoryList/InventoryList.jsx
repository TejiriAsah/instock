import React, { Component } from 'react';
import axios from 'axios';

import InventoryListItem from '../InventoryListItem/InventoryListItem';
import SearchIcon from '../../assets/icons/search-24px.svg';
import SortIcon from '../../assets/icons/sort-24px.svg';

import './InventoryList.scss';

class InventoryList extends Component {
  state = {
    inventory: []
  }

  componentDidMount() {
    axios.get('/api/inventories')
      .then(res => {
        this.setState({ inventory: res.data.inventoryData })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className='inventory'>
        <div className='inventory__top'>
          <h2 className='inventory__title'>inventory</h2>
          <div className='inventory__search-container'>
            <input
              className='inventory__search-input'
              type='text'
              placeholder='Search...'
            />
            <img
              className='inventory__search-icon'
              src={SearchIcon}
              alt='The search icon'
            />
          </div>
          <button className='btn btn--add-inventory'>+ Add new item</button>
        </div>
        <div className='inventory__sort'>
          <label className='inventory__sort-label inventory__sort-label--inventory'>
            Inventory item
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='inventory__sort-label inventory__sort-label--address'>
            CATEGORY
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='inventory__sort-label inventory__sort-label--contact'>
            STATUS
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='inventory__sort-label inventory__sort-label--contact-info'>
            QTY
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='inventory__sort-label inventory__sort-label--contact-info'>
            WAREHOUSE
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='inventory__sort-label inventory__sort-label--actions'>Actions</label>
        </div>
        <div className='inventory__list'>
          {
            this.state.inventory.map(item => (
              <InventoryListItem key={item.id} {...item} /> //{id:.., name:..}
            ))
          }
        </div>
      </div>
    )
  }
}

export default InventoryList;
