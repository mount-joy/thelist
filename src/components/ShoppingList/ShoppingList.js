import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ListItems from '../ListItems';
import styles from './styles.module.css';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = { items: [], text: '' };
  }

  addItem(e) {
    const { text } = this.state;
    if (text !== '') {
      const newItem = {
        text,
        key: Date.now(),
      };

      this.setState((prevState) => ({
        items: prevState.items.concat(newItem),
      }));

      this.setState({ text: '' });
    }

    e.preventDefault();
  }

  deleteItem(key) {
    const { items } = this.state;
    const filteredItems = items.filter((item) => item.key !== key);

    this.setState({
      items: filteredItems,
    });
  }

  render() {
    const { items, text } = this.state;

    return (
      <div className={styles.listElements}>
        <form onSubmit={this.addItem} className={styles.newItem}>
          <input value={text} onChange={(e) => this.setState({ text: e.target.value })} placeholder="Item Name" />
          <button type="submit" aria-label="Add item"><FontAwesomeIcon icon={faPlusCircle} /></button>
        </form>
        <ListItems entries={items} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default ShoppingList;
