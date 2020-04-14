import React, { Component } from 'react';
import PaymentPage from './PaymentPage';
import '../styles/Checkout.scss';
import { v4 as uuidv4 } from 'uuid';

export default class CustomerForm extends Component {

  state = {
    fname: null,
    lname: null,
    email: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    custId: null,
    orderId: null,
    renderPaymentPage: false
  }

  createCustomer = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/create-customer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        given_name: `${this.state.fname}`,
        family_name: `${this.state.lname}`,
        email_address: `${this.state.email}`,
        address: {
          address_line_1: `${this.state.street}`,
          address_line_2: "",
          locality: `${this.state.city}`,
          administrative_district_level_1: `${this.state.state}`,
          postal_code: `${this.state.zip}`,
          country: "US"
        },
        phone_number: "",
        reference_id: "",
        note: ""
      })
    })
      .then(response => {
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          console.log(res.status, res.data);
          this.setState({
            custId: res.data.customer.id
          })
          this.createLineItems();
        })
      })
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
          line_items: line_items,
          customer_id: this.state.custId
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
          console.log(res.status, res.data);
          this.setState({
            orderId: res.data.order.id
          })
        })
      })
    this.renderPaymentPage();
  }

  renderPaymentPage = () => {
    this.setState({
      renderPaymentPage: true
    })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

  render() {
    if (!this.state.renderPaymentPage) {
      return (
        <div>
          <form className="customer-form" onSubmit={this.createCustomer}>
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="fname" placeholder="First Name" />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="lname" placeholder="Last Name" />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="email" placeholder="Email" />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="street" placeholder="Street" />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="city" placeholder="City " />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="state" placeholder="State" />
            <input className="customer-input" onChange={this.handleInputChange} type="text" name="zip" placeholder="Zip Code" />
            <input className="customer-input" type="submit" value="Continue" />
          </form>
          <button onClick={this.props.renderCart}>Back to cart</button>
        </div>
      )
    } else {
      return (
        <PaymentPage
          totalPrice={this.props.totalPrice}
          orderId={this.state.orderId}
        />
      )
    }
  }
}
