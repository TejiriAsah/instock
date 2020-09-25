import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/logo/instock-logo.svg';

import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <img className='header__logo' src={Logo} alt='The InStock logo'/>
        <div className='header__nav'>
          <NavLink
            activeClassName='header__nav-link header__nav-link--selected'
            className='header__nav-link'
            to='/warehouses'
          >Warehouses</NavLink>
          <NavLink
            activeClassName='header__nav-link header__nav-link--selected'
            className='header__nav-link'
            to='/inventory'
          >Inventory</NavLink>
        </div>
      </div>
    )
  }
}

export default Header;
