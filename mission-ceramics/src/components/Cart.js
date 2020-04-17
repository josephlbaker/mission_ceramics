import React, { Component } from 'react';
import '../styles/Cart.scss';
import PaymentPage from './PaymentPage';
import CustomerForm from './CustomerForm';

export default class Cart extends Component {

  state = {
    totalPrice: 0,
    renderCheckout: false
  }

  componentWillMount() {
    let totalPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      totalPrice += (Number(this.props.cart[i].price.replace(/[^0-9.-]+/g, "")) * parseInt(this.props.cart[i].quantity) * 100);
    }

    this.setState({
      totalPrice
    });
  }

  renderCustomerForm = () => {
    this.setState({
      renderCheckout: true
    })
  }

  renderCart = () => {
    this.setState({
      renderCheckout: false
    })
  }

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

    if (!this.state.renderCheckout) {
      if (this.props.cart.length > 0) {
        return (
          <div className="cart-container">
            {cartItems}
            {this.state.totalPrice}
            <button onClick={this.renderCustomerForm}>Proceed to Checkout</button>
          </div>
        )
      } else {
        return (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
          </div>
        )
      }
    } else {
      return (
        <CustomerForm
          totalPrice={this.state.totalPrice}
          cart={this.props.cart}
          renderCart={this.renderCart}
        />
      )
    }
  }
}
