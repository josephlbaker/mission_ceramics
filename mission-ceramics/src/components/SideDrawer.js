import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SideDrawer.scss';

export default class SideDrawer extends Component {
  render() {
    let drawerClasses = 'side-drawer';

    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <nav className={drawerClasses}>
        <ul>
          <NavLink exact to="/" activeClassName="active"><li>Home</li></NavLink>
          <NavLink to="/gallery" activeClassName="active"><li>Gallery</li></NavLink>
          <NavLink to="/about" activeClassName="active"><li>About</li></NavLink>
          <NavLink to="/contact" activeClassName="active"><li>Contact</li></NavLink>
        </ul>
      </nav>
    )
  }
}
