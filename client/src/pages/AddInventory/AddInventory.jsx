import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Textbox from '../../components/Textbox/Textbox';
import CancelButton from '../../components/CancelButton/CancelButton';
import PrimaryButton from '../../components/ConfirmButton/PrimaryButton';

import BackArrow from '../../assets/icons/arrow_back-24px.svg';

import './AddInventory.scss';
import TextboxLarge from '../../components/Textbox/TextBoxLarge';
import Dropdown from '../../components/Dropdown/Dropdown';

class AddInventory extends Component {
  state = {
    categories: [],
    warehouses: [],
    name: '',
    description: '',
    quantity: 0,
    stock: 'out',
    warehouse: '',
    category: '',
    submitted: false
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      submitted: true
    });

    const {
      warehouse,
      name,
      description,
      category,
      stock,
      quantity
    } = this.state;

    if (
      warehouse
      && name
      && description
      && category
      && stock
      && quantity
    ) {
      axios.post(
        '/api/inventories',
        {
          warehouseName: warehouse,
          itemName: name,
          description: description,
          category: category,
          status: stock === 'in' ? 'In Stock' : 'Out of Stock',
          quantity: parseInt(quantity)
        }
      ).then(response => {
        return this.props.history.push('/inventory')
      }).catch(err => {
        console.log(err);
      })
    }
  }

  handleChange = (e, key) => {
    if (key === 'quantity') {
      this.setState({
        [key]: e.target.value.replace(/^0+/, ''),
        stock: e.target.value > 0 ? 'in' : 'out',
        submitted: false
      })
    } else if (key === 'stock' ) {
      this.setState({
        [key]: e.target.value,
        quantity: e.target.value === 'in' ? 1 : 0,
        submitted: false
      })
    } else {
      this.setState({
        [key]: e.target.value,
        submitted: false
      });
    }
  };

  componentDidMount() {
    axios.get('/api/warehouses')
    .then(response => {
        this.setState({
          warehouses: response.data.warehouses.map(warehouse => ({
            id: warehouse.id,
            name: warehouse.name
          }))
        })
      }
    );

    axios.get('/api/inventories/categories')
    .then(response => {
        this.setState({
          categories: response.data.categories
        })
      }
    );
  }

  render() {
    const {
      categories,
      warehouses,
      warehouse,
      name,
      description,
      category,
      stock,
      quantity,
      submitted
    } = this.state;

    return (
      <div className='add-inv'>
        <div className='add-inv__main'>
          <div className='add-inv__top'>
            <Route render={({ history }) => (
              <img
                src={BackArrow}
                alt='An arrow icon to go to the previous page'
                onClick={() => { history.goBack() }}
              />
            )} />
            <h2 className='add-inv__title'>Add new inventory item</h2>
          </div>
          <form className='inv-form'>
            <div className='inv-form__details'>
              <h3 className='inv-form__title'>Item details</h3>
              <Textbox
                type='text'
                label='Item name'
                placeholder='Item Name'
                onChange={(e) => this.handleChange(e, 'name')}
                value={name}
                error={submitted && name.length === 0}
              />
              <TextboxLarge
                label='Description'
                placeholder='Please enter a brief item description...'
                onChange={this.handleChange}
                value={description}
                error={submitted && description.length === 0}
              />
              <Dropdown
                label='Category'
                defaultValue='Please select'
                options={categories}
                onChange={e => this.handleChange(e, 'category')}
                error={submitted && category.length === 0}
              />
            </div>
            <div className='inv-form__availibility'>
              <h3 className='inv-form__title'>Item availibility</h3>
              <Textbox
                type='number'
                label='Quantity'
                onChange={(e) => this.handleChange(e, 'quantity')}
                value={quantity}
                error={submitted && quantity.length === 0}
              />
              <label className='inv-form__label'>
                Status
                <div className='inv-form__radios'>
                  <label className='inv-form__label inv-form__label--radio'>
                    <input
                      className='inv-form__radio'
                      type='radio'
                      value='in'
                      onChange={(e) => this.handleChange(e, 'stock')}
                      checked={stock === 'in'}
                    />
                    <p className='inv-form__text'>
                      In stock
                    </p>
                  </label>

                  <label className='inv-form__label inv-form__label--radio'>
                    <input
                      className='inv-form__radio'
                      type='radio'
                      value='out'
                      onChange={(e) => this.handleChange(e, 'stock')}
                      checked={stock === 'out'}
                    />
                    <p className='inv-form__text'>
                      Out of stock
                    </p>
                  </label>
                </div>
              </label>
              <Dropdown
                label='Warehouse'
                defaultValue='Please select'
                options={warehouses}
                onChange={e => this.handleChange(e, 'warehouse')}
                error={submitted && warehouse.length === 0}
              />
            </div>
            <div className='inv-form__buttons'>
              <CancelButton />
              <PrimaryButton
                onClick={this.handleSubmit}
              >+ Add Item</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddInventory;