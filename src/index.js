import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingList from './components/ShoppingList';
import * as serviceWorker from './serviceWorker';

import './style/index.css';

const destination = document.querySelector('#wrapper');
ReactDOM.render(<ShoppingList />, destination);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
