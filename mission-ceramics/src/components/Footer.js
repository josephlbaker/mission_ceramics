import React, { Component } from 'react';
import '../styles/Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <h3>Mission Ceramics</h3>
          <p>hello@missionceramics.com</p>
          <p>@missionceramics</p>
          <p className="copyright">&copy; 2020 all rights reserved</p>
        </div>
      </div>
    )
  }
}
