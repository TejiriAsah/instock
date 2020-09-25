import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Chevron from '../../assets/icons/chevron_right-24px.svg';
import Delete from '../../assets/icons/delete_outline-24px.svg';
import Edit from '../../assets/icons/edit-24px.svg';
import DeleteWarehouse from '../DeleteWarehouse/DeleteWarehouse';

import './WarehouseListItem.scss';

class WarehouseListItem extends Component {
  state = {
    isShown: false,
  };

  handleChangeDelete = (e) => {
    console.log('hello');
    this.setState({
      isShown: true,
    });
  };

  render() {
    const { id, name, address, city, country, contact } = this.props;

    return (
      <>
        <div className="warehouse">
          <label className="warehouse__header">
            <p>Warehouse</p>
            <Link
              to={`/warehouses/${id}`}
              className="warehouse__text warehouse__text--title"
            >
              {name}
              <img
                className="warehouse__chevron"
                src={Chevron}
                alt="A blue chevron"
              />
            </Link>
          </label>
          <label className="warehouse__header">
            <p>Contact name</p>
            <p className="warehouse__text">{contact.name}</p>
          </label>
          <label className="warehouse__header warehouse__header--address">
            <p>Address</p>
            <p className="warehouse__text">{`${address}, ${city}, ${country}`}</p>
          </label>
          <label className="warehouse__header warehouse__header--contact">
            <p>Contact information</p>
            <p className="warehouse__text">{contact.phone}</p>
            <p className="warehouse__text">{contact.email}</p>
          </label>
          <div className="warehouse__buttons">
            <button
              className="btn btn--trash"
              onClick={this.handleChangeDelete}
            >
              <img
                className="warehouse__icon"
                src={Delete}
                alt="The delete button icon"
              />
            </button>
            <Link to={`warehouses/edit/${id}`} className="btn">
              <img
                className="warehouse__icon"
                src={Edit}
                alt="The edit button icon"
              />
            </Link>
          </div>
        </div>
        {this.state.isShown && <DeleteWarehouse id={this.props.id} />}
      </>
    );
  }
}

export default WarehouseListItem;
