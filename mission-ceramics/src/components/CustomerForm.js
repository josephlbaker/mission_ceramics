import React, { Component } from 'react';
import Payment from './Payment';
import '../styles/Checkout.scss';

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
        })
      })
    // this.renderPaymentPage();
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
        <Payment />
      )
    }
  }
}
