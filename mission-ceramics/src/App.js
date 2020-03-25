import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.scss';
import Nav from './components/Nav';
import Home from './components/Home';
import Cart from './components/Cart';


export default class extends Component {

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

  addToCart = () => {
    if (this.state.cart.includes(this.state.currentItem)) {
      console.log('This item in cart already');
    } else {
      this.state.currentItem.quantity = this.state.quantity;
      let joined = this.state.cart.concat(this.state.currentItem);
      this.setState({ cart: joined });
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
                cart={this.state.cart}
              />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}
