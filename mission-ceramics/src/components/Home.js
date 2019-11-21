import React, { Component } from 'react'
import '../styles/Home.scss';

export default class Home extends Component {

  render() {
    return (
      <div>
        <div id="columns">
          <img src="https://images.unsplash.com/photo-1481401908818-600b7a676c0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" alt="hero" className="hero-image" />
          <img src="https://images.unsplash.com/photo-1556707809-0c56f26b5dae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="hero" className="hero-image" />
          <img src="https://images.unsplash.com/photo-1556707765-f2b51aaf0d7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="hero" className="hero-image" />
          <img src="https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="hero" className="hero-image" />
          <img src="https://images.unsplash.com/photo-1557644978-f61037cfbe49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="hero" className="hero-image" />
        </div>
        {/* <div className="hero-image">
          <div className="hero-text">
            <h1>Mission Ceramics</h1>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div> */}
        <div className="homepage-content">
          <h2>Handmade in San Francisco</h2>
          <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    )
  }
}
