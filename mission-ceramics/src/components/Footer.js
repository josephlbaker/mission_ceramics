import React, { Component } from 'react';
import '../styles/Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <h3>Mission Ceramics</h3>
          <a href="mailto:hello@missionceramics.com" className="social-link">hello@missionceramics.com</a>
          <a href="https://www.instagram.com/missionceramics/" className="social-link">@missionceramics</a>
          <p className="copyright">&copy; 2020 all rights reserved</p>
        </div>
      </div>
    )
  }
}
