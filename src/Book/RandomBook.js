import React from 'react';
import './Book.css';
import book from "../book.png";

import pathConfig from '../pathConfig.json'


class RandomBook extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            book: {Id: "", title: "", price: "", description: "", year: ""},
            authors: "",
            genres: "",
        }

        this.toBook = this.toBook.bind(this);
    }

    toBook() {
        window.location.href = '/book/' + this.props.id;
    }

    render() {
        return (
            <div className="RandomBook" onClick={this.toBook}>
                <div className="Information">
                    <div className="RandomTitle">{this.props.title}</div>
                    <div className="RandomPrice">Цена: {this.props.price} р.
                    </div>
                </div>
            </div>
        );
    }
}

export default RandomBook;
