import React, { Component } from 'react';
import '../styles/Cart.scss';

export default class Cart extends Component {
  render() {

    let cartItems = this.props.cart.map((i) => {
      return <div key={i.name}>{i.name} : {i.quantity}</div>
    })

    return (
      <div className="cart-container">
        {cartItems}
      </div>
    )
  }
}
