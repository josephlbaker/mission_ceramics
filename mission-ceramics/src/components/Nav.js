import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DrawerToggleButton from './DrawerToggleButton';
import '../styles/Nav.scss';

export default class Nav extends Component {
  render() {
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul>
              <NavLink exact to="/" activeClassName="active"><li>Home</li></NavLink>
              <NavLink to="/gallery" activeClassName="active"><li>Gallery</li></NavLink>
              <NavLink to="/about" activeClassName="active"><li>About</li></NavLink>
              <NavLink to="/contact" activeClassName="active"><li>Contact</li></NavLink>
            </ul>
          </div>
          <div className="toolbar__toggle-button"><DrawerToggleButton click={this.props.drawerClickHandler} /></div>
        </nav>
      </header>
    )
  }
}
