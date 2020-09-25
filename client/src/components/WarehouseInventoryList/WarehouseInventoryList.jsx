import React, { Component } from 'react';
import axios from 'axios';

import WarehouseInventoryListItem from '../WarehouseInventoryListItem/WarehouseInventoryListItem';
import WarehouseInfo from '../../components/WarehouseInfo/WarehouseInfo'
import SearchIcon from '../../assets/icons/search-24px.svg';
import SortIcon from '../../assets/icons/sort-24px.svg';

import './WarehouseInventoryList.scss';

class WarehouseInventoryList extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
      currWarehouse : ''
    }
  }

  componentDidMount() {
    const currWarehouseId = this.props.id;

    if (currWarehouseId) {
      axios
        .get('/inventories/' + currWarehouseId)
        .then(res => {
          this.setState({inventory: res.data.inventoryData})
          this.setState({currWarehouse : res.data.inventoryData[0].warehouseName})

        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div className='inventory'>
        <div className='inventory__top'>
    <h2 className='inventory__title'>{this.state.currWarehouse}</h2>
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
        <WarehouseInfo warehouseData = {this.state}/>
        <div className='inventory__sort'>
          <label className='inventory__sort-label inventory__sort-label--inventory'>
            INVENTORY ITEM
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
              <WarehouseInventoryListItem key={item.id} {...item} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default WarehouseInventoryList;
