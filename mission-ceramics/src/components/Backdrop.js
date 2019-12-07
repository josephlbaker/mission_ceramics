import React, { Component } from 'react';
import '../styles/Backdrop.scss';

export default class Backdrop extends Component {
  render() {
    return (
      <div className="backdrop" onClick={this.props.click} />
    )
  }
}
