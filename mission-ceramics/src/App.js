import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import SideDrawer from './components/SideDrawer';
import Backdrop from './components/Backdrop';
import Cart from './components/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.scss';
export default class extends Component {

  state = {
    sideDrawerOpen: false,
    items: [],
    currentItem: null,
    showProductDetails: false
  }

  componentWillMount() {
    this.fetchItems();
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
      e.target.matches('.add-to-cart-btn')
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

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    })
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="row">
          <Nav drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <Switch>
            <Route path="/" exact component={() =>
              <Home
                currentItem={this.state.currentItem}
                showProductDetails={this.state.showProductDetails}
                hideProductDetails={this.hideProductDetails}
                currentItem={this.state.currentItem}
                items={this.state.items}
                setItem={this.setItem}
              />} />
            <Route path="/cart" component={Cart} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    )
  }
}
