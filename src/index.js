import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingList from './ShoppingList';
import * as serviceWorker from './serviceWorker';

var destination = document.querySelector("#wrapper");

ReactDOM.render(
  <div>
    <p><ShoppingList/></p>
  </div>,
  destination
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();