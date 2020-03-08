import React, { Component } from 'react';
import '../styles/Cart.scss';

export default class Cart extends Component {
  render() {
    if (JSON.parse(localStorage.getItem('items') === null)) {
      return <p>Your Cart is empty</p>;
    }

    let groupedItems = groupBy(JSON.parse(localStorage.getItem('items')), 'name');
    let items = getQuantities();

    function getQuantities() {
      return Object.keys(groupedItems).map(function(obj, i) {
        return (
          <div className="item-wrapper">
            <li key={i}>{obj} {groupedItems[obj].length} </li>
            <input type="number" id="quantity" name="quantity" min="1" max="10" />
          </div>
        )
      })
    }

    // const items = JSON.parse(localStorage.getItem('items')).map(function(item, i){
    // return <li key={i}> {item.name} {JSON.stringify(item)}</li>;
    // });
    return (
      <div className="cart-container">
        {items}
      </div>
    )
  }
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};