import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './addwarehouse.scss';
import GoBackIcon from '../../assets/icons/arrow_back-24px.svg';
import '../../components/secondary-button/secondaryBtn.scss';
import InputBox from '../../components/inputbox/InputBox';

import SecondaryBtn from '../../components/secondary-button/SecondaryBtn';
import PrimaryBtn from '../../components/primary-button/primaryBtn';

class AddWarehouse extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      city: '',
      country: '',
      error: 'This field is required',
      contact: {
        name: '',
        position: '',
        phone: '',
        email: '',
      },
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleChangeContact = (e, key) => {
    this.setState({
      contact: {
        ...this.state.contact,
        [key]: e.target.value,
      },
    });
  };
  submitHandler = (e) => {
    e.preventDefault();

    const newWarehouse = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      contact: {
        name: this.state.contact.name,
        position: this.state.contact.position,
        phone: this.state.contact.phone,
        email: this.state.contact.email,
      },
    };

    axios
      .post('/api/warehouses', newWarehouse)
      .then((response) => console.log('your response', response))
      .catch((error) => console.log('your error:', error));
  };

  render() {
    return (
      <div className="centerPage">
        <div className="add-warehouse__container">
          <div className="add-warehouse__nav">
            <Link to="/" className="text-link">
              <img src={GoBackIcon} className="goBackBtn" alt="previous page" />
            </Link>
            <h2 className="add-warehouse__header">Add New Warehouse</h2>
          </div>
          <form className="add-warehouse__info">
            <div className="add-warehouse__wdiv">
              <h3 className="add-warehouse__details">Warehouse Details</h3>
              <InputBox
                label="warehouse Name"
                placeholder="Warehouse Name"
                onChange={(e) => this.handleChange(e, 'name')}
                value={this.state.name}
                error={this.state.name.length === 0 ? this.state.error : ''}
              />
              <InputBox
                label="Street address"
                placeholder="Street Address"
                onChange={(e) => this.handleChange(e, 'address')}
                value={this.state.address}
                error={this.state.address.length === 0 ? this.state.error : ''}
              />
              <InputBox
                label="City"
                placeholder="City"
                onChange={(e) => this.handleChange(e, 'city')}
                value={this.state.city}
                error={this.state.city.length === 0 ? this.state.error : ''}
              />
              <InputBox
                label="Country"
                placeholder="Country"
                onChange={(e) => this.handleChange(e, 'country')}
                value={this.state.country}
                error={this.state.country.length === 0 ? this.state.error : ''}
              />
            </div>
            <div>
              <h3 className="add-warehouse__details add-warehouse__details--tablet">
                Contact Details
              </h3>
              <InputBox
                label="Contact Name"
                placeholder="Contact Name"
                onChange={(e) => this.handleChangeContact(e, 'name')}
                value={this.state.contact.name}
                error={
                  this.state.contact.name.length === 0 ? this.state.error : ''
                }
              />
              <InputBox
                label="Position"
                placeholder="Position"
                onChange={(e) => this.handleChangeContact(e, 'position')}
                value={this.state.contact.position}
                error={
                  this.state.contact.position.length === 0
                    ? this.state.error
                    : ''
                }
              />
              <InputBox
                label="Phone number"
                placeholder="Phone Number"
                onChange={(e) => this.handleChangeContact(e, 'phone')}
                value={this.state.contact.phone}
                error={
                  this.state.contact.phone.length === 0 ? this.state.error : ''
                }
              />
              <InputBox
                label="Email"
                placeholder="Email"
                onChange={(e) => this.handleChangeContact(e, 'email')}
                value={this.state.contact.email}
                error={
                  this.state.contact.email.length === 0 ? this.state.error : ''
                }
              />
            </div>
          </form>
          <div className="add__btn">
            <Link to="/">
              <SecondaryBtn />
            </Link>
            <PrimaryBtn className="primary" onClick={this.submitHandler}>
              + Add warehouse
            </PrimaryBtn>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWarehouse;
