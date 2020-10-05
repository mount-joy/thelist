import React, { Component } from "react";
import ListItems from '../ListItems';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
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

  render() {
    return (
      <div>
        <form onSubmit={this.addItem}>
          <input value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} placeholder="Item Name">
          </input>
          <button type="submit">Add</button>
        </form>
        <ListItems entries={this.state.items}/>
      </div>
    );
  }
}

export default ShoppingList;