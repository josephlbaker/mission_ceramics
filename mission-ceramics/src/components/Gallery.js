import React, { Component } from 'react'
import '../styles/Gallery.scss';

export default class Gallery extends Component {
  render() {
    return (
      <div className="gallery-container">
        <h3>New for Fall 2019</h3>
        <h2>Morning Bloom</h2>
        <button className="shop-now-btn">SHOP NOW</button>
      </div>
    )
  }
}
