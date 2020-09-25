import React, { Component } from 'react';
import InventoryList from '../../components/InventoryList/InventoryList';

import './InventoryPage.scss';

class InventoryPage extends Component {
  render() {
    return (
      <div className='inventory-page'>
        <InventoryList />
      </div>
    )
  }
}

export default InventoryPage;
