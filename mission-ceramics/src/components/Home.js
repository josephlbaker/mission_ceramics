import React, { Component } from 'react';
import '../styles/Home.scss';
import ProductDetails from './ProductDetails';
import Announcement from './Announcement';
import Footer from './Footer';
import SvgIcon from './SvgIcon';
import { NavLink } from 'react-router-dom';

export default class Home extends Component {

  showProductDetails = (item) => {
    this.props.setItem(item);
  }

  render() {
    let itemImages = this.props.items.map((i) => {
      return (
        <div key={i.name} className="home-items-column">
          <img src={i.image} alt="home-item" className="home-item-image" onClick={() => this.showProductDetails(i)} />
          <p className="home-item-name">{i.name}</p>
          <p className="home-item-price">{i.price}</p>
        </div>
      )
    })
    let cartIconClassName = this.props.itemsInCart ? 'visible-cart' : 'hidden-cart';

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
        <Announcement />
        <div id="homeHeader" className="home-header">
          <h1 className="company-name">Mission Ceramics</h1>
          <SvgIcon />
        </div>
        <div className="home-items">
          <div className="home-items-row row1">
            {itemImages[0]}{itemImages[1]}{itemImages[2]}
          </div>
          <div className="home-items-row">
            {itemImages[3]}{itemImages[4]}{itemImages[5]}
          </div>
          {/* <div className="home-items-row">
            {itemImages[6]}{itemImages[7]}{itemImages[8]}
          </div>
          <div className="home-items-row">
            {itemImages[9]}{itemImages[10]}{itemImages[11]}
          </div>
          <div className="home-items-row">
            {itemImages[12]}{itemImages[13]}{itemImages[14]}
          </div>
          <div className="home-items-row">
            {itemImages[15]}{itemImages[16]}{itemImages[17]}
          </div>
          <div className="home-items-row">
            {itemImages[18]}{itemImages[19]}{itemImages[20]}
          </div>
          <div className="home-items-row">
            {itemImages[21]}{itemImages[22]}
          </div> */}
        </div>
        <Footer />
      </div>
    )
  }
}

const productDetails = document.createElement("div");
document.body.appendChild(productDetails);
