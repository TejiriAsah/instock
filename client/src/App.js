import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Copyright from './components/Copyright/Copyright';
import Header from './components/Header/Header';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import AddInventory from './pages/AddInventory/AddInventory';
import AddWarehouse from '../src/pages/AddWarehouse/AddWarehouse';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import WarehouseInventoryPage from './pages/WarehouseInventoryPage/WarehouseInventoryPage';
import DeleteWarehouse from '../src/components/DeleteWarehouse/DeleteWarehouse';
import EditInventory from './pages/EditInventory/EditInventory';
import EditWarehouse from '../src/pages/EditWarehouse/EditWarehouse';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/warehouses" />
        <Route exact path="/warehouses" component={WarehousesPage} />
        <Route exact path="/inventory" component={InventoryPage}/>
        <Route exact path="/inventory/add" component={AddInventory} />
        <Route exact path="/inventory/edit/:id" component={EditInventory} />
        <Route exact path="/inventory/:id" component={WarehouseInventoryPage} />
        <Route path="/warehouses/add" component={AddWarehouse} />
        <Route path="/warehouses/edit/:id" component={EditWarehouse} />
        <Route path="/warehouse/delete/:id" component={DeleteWarehouse} />
      </Switch>
      <Copyright />
    </BrowserRouter>
  );
}

export default App;
