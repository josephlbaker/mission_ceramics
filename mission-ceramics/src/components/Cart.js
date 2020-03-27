import React, { Component } from 'react';
import '../styles/Cart.scss';

export default class Cart extends Component {
  render() {
    let cartItems = this.props.cart.map((i) => {
      return (
        <div key={i.name}>
          {i.name} : {i.quantity}
          <label for="quantity">Quantity
            <select value={i.quantity} onChange={this.props.updateQuantity(i.name)} id="quantity" class="quantity-input">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      )
    })

    return (
      <div className="cart-container">
        {cartItems}
      </div>
    )
  }
}
