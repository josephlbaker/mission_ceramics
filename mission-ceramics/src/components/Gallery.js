import React, { Component } from 'react'
import '../styles/Gallery.scss';
import GalleryItem from '../images/gallery-item.jpeg';

export default class Gallery extends Component {
  render() {
    return (
      <div className="gallery-container">
        <div className="featured-product">
          <div className="featured-column1" id="featured-text-column">
            <h3>New for Fall 2019</h3>
            <h2>Morning Bloom</h2>
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
          <div className="featured-column2" id="featured-image-column">
            <img className="featured-image" src="http://atlas-content-cdn.pixelsquid.com/stock-images/medieval-ceramic-wine-jug-growler-7GYwGnB-600.jpg" alt="featured-product" />
          </div>
        </div>
        <div className="gallery-items">
          <div className="gallery-items-row">
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
          </div>
          <div className="gallery-items-row">
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
          </div>
          <div className="gallery-items-row">
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
            <div className="gallery-items-column"><img src={GalleryItem} alt="gallery-item" className="gallery-item-image" /></div>
          </div>
        </div>
      </div>
    )
  }
}
