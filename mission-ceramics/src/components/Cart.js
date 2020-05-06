import React, { Component } from 'react';
import '../styles/Cart.scss';
import { v4 as uuidv4 } from 'uuid';


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

  // renderCustomerForm = () => {
  //   this.setState({
  //     renderCheckout: true
  //   })
  // }

  // renderCart = () => {
  //   this.setState({
  //     renderCheckout: false
  //   })
  // }

  createLineItems = () => {
    let line_items = [];
    for (let i = 0; i < this.props.cart.length; i++) {
      let line_item = {};
      line_item.name = this.props.cart[i].name;
      line_item.quantity = this.props.cart[i].quantity;
      line_item.base_price_money = {
        amount: parseInt(this.props.cart[i].price.replace(/[$.,]+/g, '')),
        currency: "USD"
      }
      line_items.push(line_item);
    }
    this.createOrder(line_items);
  }

  createOrder = (line_items) => {
    fetch('http://localhost:8000/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          line_items: line_items
        },
        idempotency_key: uuidv4(),
      })
    })
      .then(response => {
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          this.setState({
            order: res.data.order,
            orderId: res.data.order.id
          })
          this.createCheckout(res.data.order);
        })
      })
      .catch(err => { console.log(err) });
  }

  createCheckout = (order) => {
    fetch('http://localhost:8000/checkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: order,
        idempotency_key: uuidv4(),
        ask_for_shipping_address: true,
        redirect_url: "http://localhost:3000"
      })
    })
      .then(response => {
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          window.location.replace(res.data.checkout.checkout_page_url);
        })
      })
      .catch(err => { console.log(err) });
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

    if (this.props.cart.length > 0) {
      return (
        <div className="cart-container">
          {cartItems}
          {this.state.totalPrice}
          <button onClick={this.createLineItems}>Proceed to Checkout</button>
        </div>
      )
    } else {
      return (
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
        </div>
      )
    }
  }
}
