import React, { Component } from 'react';
import '../styles/Cart.scss';

export default class Cart extends Component {
  render() {
    let cartPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      cartPrice += (Number(this.props.cart[i].price.replace(/[^0-9.-]+/g, "")) * parseInt(this.props.cart[i].quantity));
    }

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
        {cartPrice}
      </div>
    )
  }
}
