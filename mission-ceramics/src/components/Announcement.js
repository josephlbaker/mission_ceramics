import React, { Component } from 'react';
import '../styles/Announcement.scss';

export default class Announcement extends Component {
  render() {
    return (
      <div className="announcement-container">
        <p className="announcement-text">All shipping is currently paused.<br />Placed orders will be processed in ~3 months.</p>
      </div>
    )
  }
}
