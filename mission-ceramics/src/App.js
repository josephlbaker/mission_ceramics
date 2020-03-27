import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.scss';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';
import update from 'immutability-helper';
import { withAlert } from 'react-alert'

class App extends React.Component {

  state = {
    items: [],
    currentItem: null,
    showProductDetails: false,
    cart: [],
    quantity: "1"
  }

  componentWillMount() {
    this.fetchItems();
  }

  setQuantity = (e) => {
    e.preventDefault();
    this.setState({
      quantity: e.target.value
    })
  }

  updateQuantity = (itemName) => (e) => {
    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].name === itemName) {
        this.state.cart[i].quantity = e.target.value;
        this.setState({
          cart: update(this.state.cart, { [i]: { quantity: { $set: e.target.value } } })
        })
      }
    }
  }

  addToCart = () => {
    const alert = this.props.alert;
    if (this.state.cart.includes(this.state.currentItem)) {
      this.setState({
        showProductDetails: false
      })
      alert.show('This item is already in your cart');
    } else {
      this.state.currentItem.quantity = this.state.quantity;
      let joined = this.state.cart.concat(this.state.currentItem);
      this.setState({
        cart: joined,
        quantity: "1",
        showProductDetails: false
      });
      alert.show('Added to cart!')
    }
  }

  setItem = (item) => {
    this.setState({
      currentItem: item,
      showProductDetails: true
    })
  }

  hideProductDetails = (e) => {
    if (e.target.matches('.product-details-main') ||
      e.target.matches('.product-details-image') ||
      e.target.matches('.product-details-text') ||
      e.target.matches('.product-name') ||
      e.target.matches('.product-price') ||
      e.target.matches('.product-description') ||
      e.target.matches('.add-to-cart-btn-wrapper') ||
      e.target.matches('.add-to-cart-btn') ||
      e.target.matches('.quantity-input')
    ) {
      return false;
    } else {
      this.setState({ showProductDetails: false })
    }
  }

  fetchItems = () => {
    fetch("http://localhost:8000/", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.objects.length; i++) {
          if (res.objects[i].type === 'ITEM') {
            let item = {};
            item['name'] = res.objects[i].item_data.name;
            item['price'] = (res.objects[i].item_data.variations[0].item_variation_data.price_money.amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });;
            item['description'] = res.objects[i].item_data.description;
            // item['quantity'] = this.state.quantity;

            if (res.objects[i + 1].type === 'IMAGE') {
              item['image'] = res.objects[i + 1].image_data.url;
            }
            let joined = this.state.items.concat(item);
            this.setState({
              items: joined
            })
          }
        }
      })
  };

  render() {
    return (
      <Router>
        <div className="row">
          <Nav />
          <Switch>
            <Route path="/" exact component={() =>
              <Home
                addToCart={this.addToCart}
                currentItem={this.state.currentItem}
                showProductDetails={this.state.showProductDetails}
                hideProductDetails={this.hideProductDetails}
                items={this.state.items}
                setItem={this.setItem}
                setQuantity={this.setQuantity}
                quantity={this.state.quantity}
              />}
            />
            <Route path="/cart" component={() =>
              <Cart
                updateQuantity={this.updateQuantity}
                cart={this.state.cart}
              />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withAlert()(App)
