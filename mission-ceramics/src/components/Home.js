import React, { Component } from 'react'
import '../styles/Home.scss';

export default class Home extends Component {

  render() {
    return (
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1>Mission Ceramics</h1>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
        <div className="homepage-content">
          <h2>Handmade in San Francisco</h2>
          <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    )
  }
}
