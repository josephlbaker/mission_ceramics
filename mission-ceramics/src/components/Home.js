import React, { Component } from 'react';
import '../styles/Home.scss';
import ProductDetails from './ProductDetails';
import Footer from './Footer';
import FeaturedImage from '../images/pngguru.com.png'
import SvgIcon from './SvgIcon';

export default class Home extends Component {

  showProductDetails = (item) => {
    this.props.setItem(item);
  }

  render() {
    let itemImages = this.props.items.map((i) => {
      return <div key={i.name} className="home-items-column"><img src={i.image} alt="home-item" className="home-item-image" onClick={() => this.showProductDetails(i)} /></div>
    })

    return (
      <div className="home-container">
        <ProductDetails
          addToCart={this.props.addToCart}
          currentItem={this.props.currentItem}
          showProductDetails={this.props.showProductDetails}
          handleClose={this.props.hideProductDetails}
          setQuantity={this.props.setQuantity}
          quantity={this.props.quantity}
        />
        <div className="home-header">
          <h1 className="company-name">Mission Ceramics</h1>
          <SvgIcon />
        </div>
        <div className="featured-product">
          <div className="featured-column1" id="featured-text-column">
            <h3>NEW FOR FALL 2019</h3>
            <h2>Morning Bloom</h2>
            <img src={FeaturedImage} alt="home-item" className="featured-image-mobile" />
            <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
            <div className="shop-now-btn-wrapper"><button className="shop-now-btn">SHOP NOW</button></div>
          </div>
          <div className="featured-column2">
            <img src={FeaturedImage} alt="home-item" className="featured-image" />
          </div>
        </div>
        <div className="home-items">
          <div className="home-items-row">
            {itemImages[0]}{itemImages[1]}{itemImages[2]}
          </div>
          <div className="home-items-row">
            {itemImages[3]}{itemImages[4]}{itemImages[5]}
          </div>
        </div>
        <div className="newsletter-registration-wrapper">
          <div className="newsletter-registration">
            <div className="newsletter-registration-column1">
              <h3>JOIN NOW!</h3>
              <h2>Newsletter</h2>
            </div>
            <div className="newsletter-registration-column2">
              <p>Stay up to date with Mission Ceramics. Get early access to open studios, exhibitions, and new releases.</p>
            </div>
          </div>
          <div className="newsletter-registration-inputs">
            <input type="text" className="email-form" placeholder="EMAIL"></input>
            <button className="subscribe-button">SUBSCRIBE</button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const productDetails = document.createElement("div");
document.body.appendChild(productDetails);
