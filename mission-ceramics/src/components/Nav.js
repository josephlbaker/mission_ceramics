import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DrawerToggleButton from './DrawerToggleButton';
import '../styles/Nav.scss';

export default class Nav extends Component {
  state = {
    isTop: true
  };

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 180;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }

  render() {
    let className = this.state.isTop ? 'toolbar__logo' : 'toolbar__logo scrolled';
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className={className}>Mission Ceramics</div>
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
