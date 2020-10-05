import React, { Component } from "react";

class ListItems extends Component {
    createTasks(item) {
        return <li key={item.key}>{item.text}</li>
    }

    render() {
        var Entries = this.props.entries;
        var listItems = Entries.map(this.createTasks);

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default ListItems;
