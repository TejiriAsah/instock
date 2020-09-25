import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import WarehouseListItem from '../WarehouseListItem/WarehouseListItem';
import SearchIcon from '../../assets/icons/search-24px.svg';
import SortIcon from '../../assets/icons/sort-24px.svg';

import './WarehouseList.scss';

class WarehouseList extends Component {
  state = {
    warehouses: [],
  };

  componentDidMount() {
    axios
      .get('/api/warehouses')
      .then((res) => {
        this.setState({ warehouses: res.data.warehouses });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='warehouses'>
        <div className='warehouses__top'>
          <h2 className='warehouses__title'>Warehouses</h2>
          <div className='warehouses__search-container'>
            <input
              className='warehouses__search-input'
              type='text'
              placeholder='Search...'
            />
            <img
              className='warehouses__search-icon'
              src={SearchIcon}
              alt='The search icon'
            />
          </div>

          <Link to='/warehouses/add' className='btn btn--add-warehouse'>
            + Add new warehouse
          </Link>
        </div>
        <div className='warehouses__sort'>
          <label className='warehouses__sort-label warehouses__sort-label--warehouse'>
            Warehouse
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='warehouses__sort-label warehouses__sort-label--address'>
            Address
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='warehouses__sort-label warehouses__sort-label--contact'>
            Contact name
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='warehouses__sort-label warehouses__sort-label--contact-info'>
            Contact information
            <img src={SortIcon} alt='A sort chevron icon' />
          </label>
          <label className='warehouses__sort-label warehouses__sort-label--actions'>
            Actions
          </label>
        </div>
        <div className='warehouses_list'>
          {this.state.warehouses.map((warehouse) => (
            <WarehouseListItem key={warehouse.id} {...warehouse} />
          ))}
        </div>
      </div>
    );
  }
}

export default WarehouseList;
