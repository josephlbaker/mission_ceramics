import React, { Component } from 'react';
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
require('dotenv').config();

class PaymentPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
    }
  }

  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    // ///////////////////////
    // paymentForm.verifyBuyer(
    //   nonce,
    //   verificationDetails,
    //   function (err, verificationResult) {
    //     if (err == null) {
    //       //TODO: Move existing Fetch API call here
    //     }
    //   });
    // //////////////////////


    let data = { nonce: nonce, token: buyerVerificationToken }

    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }

    this.setState({ errorMessages: [] })
    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken);

    fetch('http://localhost:8000/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nonce: nonce,
        token: buyerVerificationToken,
        amount: this.props.totalPrice,
        note: `
        CART ITEMS: ${JSON.stringify(this.props.cart)}
        NAME: John Smith,
        EMAIL: test@test.com,
        ADDRESS: 123 Fake Street, San Francisco CA 12345`
      })
    })
      .catch(err => {
        alert('Network error: ' + err);
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.text();
      })
      .then(data => {
        console.log(JSON.stringify(data));
        alert('Payment complete successfully!\nCheck browser developer console for more details');
      })
      .catch(err => {
        console.error(err);
        alert('Payment failed to complete!\nCheck browser developer console for more details');
      });
  }

  createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Payment Page</h1>

        <SquarePaymentForm
          sandbox={true}
          applicationId={process.env.REACT_APP_APPLICATION_ID}
          locationId={process.env.REACT_APP_LOCATION_ID}
          cardNonceResponseReceived={this.cardNonceResponseReceived}
          createVerificationDetails={this.createVerificationDetails}
        >
          <fieldset className="sq-fieldset">
            <CreditCardNumberInput />
            <div className="sq-form-third">
              <CreditCardExpirationDateInput />
            </div>

            <div className="sq-form-third">
              <CreditCardPostalCodeInput />
            </div>

            <div className="sq-form-third">
              <CreditCardCVVInput />
            </div>
          </fieldset>

          <CreditCardSubmitButton>
            Pay $1.00
          </CreditCardSubmitButton>

        </SquarePaymentForm>

        <div className="sq-error-message">
          {this.state.errorMessages.map(errorMessage =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )}
        </div>

      </div>
    )
  }
}

export default PaymentPage;
