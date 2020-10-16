import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './items.css';

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item) {
        return <li key={item.key}>{item.text} <FontAwesomeIcon icon={faTrash} onClick={() => this.delete(item.key)} /></li>
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