import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Nav.scss';

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <ul className="nav-links">
          <Link to="/"><li>Home</li></Link>
          <Link to="/gallery"><li>Gallery</li></Link>
          <Link to="/about"><li>About</li></Link>
          <Link to="/contact"><li>Contact</li></Link>
        </ul>
      </nav>
    )
  }
}
