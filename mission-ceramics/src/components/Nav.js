import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.png';
import '../styles/Nav.scss';

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <img src={Logo} alt="logo" className="logo" />
        <ul className="nav-links">
          <NavLink exact to="/" activeClassName="active"><li>Home</li></NavLink>
          <NavLink to="/gallery" activeClassName="active"><li>Gallery</li></NavLink>
          <NavLink to="/about" activeClassName="active"><li>About</li></NavLink>
          <NavLink to="/contact" activeClassName="active"><li>Contact</li></NavLink>
        </ul>
      </nav>
    )
  }
}
