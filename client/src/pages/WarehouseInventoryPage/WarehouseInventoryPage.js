import React, { Component } from 'react';
import WarehouseInventoryList from '../../components/WarehouseInventoryList/WarehouseInventoryList';
import './WarehouseInventoryPage.scss';
import '../../components/WarehouseInfo/WarehouseInfo.scss'

class WarehouseInventoryPage extends Component {
  render() {
    return (
      <div className='WarehouseInventory-page'>
        <WarehouseInventoryList id = {this.props.match.params.id}/>
      </div>
    )
  }
}

export default WarehouseInventoryPage;
