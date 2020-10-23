import React, { Component } from "react";
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
    if (this.state.text !== "") {
      const newItem = {
        text: this.state.text,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });

      this.setState({ text: '' });
    }
    console.log(this.state.items);

    e.preventDefault();
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => item.key !== key);

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className={styles.listElements}>
        <form onSubmit={this.addItem}>
          <input value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} placeholder="Item Name">
          </input>
          <button type="submit">Add</button>
        </form>
        <ListItems entries={this.state.items} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default ShoppingList;