import React, { Component } from 'react'
import '../styles/DrawerToggleButton.scss';

export default class DrawerToggleButton extends Component {
  render() {
    return (
      <div>
        <button className="toggle-button" onClick={this.props.click}>
          <div className="toggle-button__line" />
          <div className="toggle-button__line" />
          <div className="toggle-button__line" />
        </button>
      </div>
    )
  }
}
