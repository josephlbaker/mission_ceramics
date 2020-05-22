import React, { Component } from 'react';
import '../styles/Cart.scss';
import { v4 as uuidv4 } from 'uuid';
import 'font-awesome/css/font-awesome.min.css';

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
    fetch('test-app.missionceramics.com/api/orders', {
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
    fetch('test-app.missionceramics.com/api/checkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: order,
        idempotency_key: uuidv4(),
        ask_for_shipping_address: true,
        redirect_url: "test-app.missionceramics.com"
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
        <div className="item" key={i.name}>
          <img className="item-image" src={i.image} alt="home-item" />
          <div className="name-qty-wrapper">
            <div className="item-name">
              {i.name}
            </div>
            <div className="item-qty">
              <label for="quantity"><p className="qty">Qty:</p>
                <select value={i.quantity} onChange={this.props.updateQuantity(i.name)} id="quantity" class="quantity-input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>
              <button className="remove-button" onClick={() => this.props.removeItem(i)}>Remove</button>
            </div>
            <div className="item-price">
              {parseInt((i.price.replace(/[$.,]+/g, '')) * parseInt(i.quantity) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
          </div>
        </div>
      )
    })

    if (this.props.cart.length > 0) {
      return (
        <div className="cart-container">
          <div className="items-wrapper">
            {cartItems}
          </div>
          <div className="submit-wrapper">
            <p className="subtotal-text">Subtotal</p><p className="subtotal-num">{(this.state.totalPrice / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
            <button className="checkout-btn" onClick={this.createLineItems}>CHECKOUT</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="cart-empty">
          <h2>Cart is empty.</h2>
          <svg className="cart-icon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.17432 5.50359e-07C0.525743 5.50359e-07 0 0.525763 0 1.17432C0 1.82288 0.525743 2.34864 1.17432 2.34864H5.70035L9.73707 21.3946C9.89678 22.1116 10.3667 22.7083 10.9603 22.7035H30.5323C31.1527 22.7121 31.7234 22.1497 31.7234 21.5292C31.7234 20.9087 31.1527 20.3461 30.5323 20.3549H11.9145L11.4129 18.0062H32.0981C32.6239 18.0023 33.1206 17.6018 33.2357 17.0888L35.9758 5.3456C36.1285 4.66408 35.5366 3.91941 34.8382 3.9144H8.44043L7.80434 0.929671C7.69321 0.408233 7.18762 -0.000547466 6.65448 5.50359e-07H1.17432ZM8.92973 6.26304H33.3581L31.1684 15.6576H10.9236L8.92973 6.26304ZM14.8747 24.2693C12.7268 24.2693 10.9603 26.0357 10.9603 28.1837C10.9603 30.3316 12.7268 32.0981 14.8747 32.0981C17.0227 32.0981 18.7891 30.3316 18.7891 28.1837C18.7891 26.0357 17.0227 24.2693 14.8747 24.2693ZM26.6179 24.2693C24.47 24.2693 22.7035 26.0357 22.7035 28.1837C22.7035 30.3316 24.47 32.0981 26.6179 32.0981C28.7659 32.0981 30.5323 30.3316 30.5323 28.1837C30.5323 26.0357 28.7659 24.2693 26.6179 24.2693ZM14.8747 26.6179C15.7534 26.6179 16.4405 27.305 16.4405 28.1837C16.4405 29.0624 15.7534 29.7494 14.8747 29.7494C13.9961 29.7494 13.309 29.0623 13.309 28.1837C13.309 27.3051 13.9961 26.6179 14.8747 26.6179ZM26.6179 26.6179C27.4966 26.6179 28.1837 27.305 28.1837 28.1837C28.1837 29.0624 27.4966 29.7494 26.6179 29.7494C25.7393 29.7494 25.0522 29.0623 25.0522 28.1837C25.0522 27.3051 25.7393 26.6179 26.6179 26.6179Z" fill="#B92227" /></svg>
          <h3>Looks like you have no items in your shopping cart.</h3>
          <h3>Click <a href="test-app.missionceramics.com">here</a> to continue shopping.</h3>
        </div>
      )
    }
  }
}
