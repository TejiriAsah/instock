import React from 'react';
import './editWarehouse.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputBox from '../../components/inputbox/InputBox';
import GoBackIcon from '../../assets/icons/arrow_back-24px.svg';
import SecondaryBtn from '../../components/secondary-button/SecondaryBtn';
import PrimaryBtn from '../../components/primary-button/primaryBtn';

class EditWarehouse extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
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

  componentDidMount() {
    const warehouseId = this.props.match.params.id;
    if (warehouseId) {
      axios
        .get('/api/warehouses/' + warehouseId)
        .then((response) => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            address: response.data.address,
            city: response.data.city,
            country: response.data.country,
            contact: {
              name: response.data.contact.name,
              position: response.data.contact.position,
              phone: response.data.contact.phone,
              email: response.data.contact.email,
            },
          });
        })
        .catch((error) => {
          console.log('your error:', error);
        });
    }
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

    const updatedWarehouse = {
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
      .put(`/api/warehouses/${this.props.match.params.id}`, updatedWarehouse)
      .then((response) => console.log('your response', response))
      .catch((error) => console.log('your error:', error));
  };

  render() {
    return (
      <div className="centerPage">
        <div className="edit-warehouse__container">
          <div className="edit-warehouse__nav">
            <Link to="/" className="text-link">
              <img
                src={GoBackIcon}
                alt="back to previous page"
                className="goBackBtn"
              />
            </Link>
            <h2 className="edit-warehouse__header">EDIT WAREHOUSE</h2>
          </div>
          <form className="edit-warehouse__info">
            <div className="edit-warehouse__wdiv">
              <h3 className="edit-warehouse__details">Warehouse Details</h3>
              <InputBox
                label="Warehouse Name"
                placeholder="Warehouse name"
                onChange={(e) => this.handleChange(e, 'name')}
                value={this.state.name}
                error={this.state.name.length === 0 ? this.state.error : ''}
              />
              <InputBox
                label="Street Address"
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
              <h3 className="edit-warehouse__details edit-warehouse__details--tablet">
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
          <div className="edit__btn">
            <Link to="/">
              <SecondaryBtn />
            </Link>
            <PrimaryBtn onClick={this.submitHandler}>Save</PrimaryBtn>
          </div>
        </div>
      </div>
    );
  }
}
export default EditWarehouse;
