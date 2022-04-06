import React from 'react';
import './Book.css';
import book from "../book.png";

import pathConfig from '../pathConfig.json'
import RandomBook from "./RandomBook";

let url = pathConfig.path;

class Book extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            book: {id: "", title: "", price: "", description: "", year: ""},
            authors: "",
            genres: "",
            randomBooks: []
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    async handleDelete() {
        let url_string = window.location.href;
        let urlBook = new URL(url_string);
        let split = urlBook.pathname.split("/")
        let bookId = split[2];

        let book = {
            token: localStorage.getItem("bookNodeToken"),
            bookId: bookId
        }
        let promise = await fetch(url + "delete-book", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)

        });

        let response = await promise.json();

        console.log(response)

        if (response.message === "success") {
            window.location.href = "/library"
        }

    }


    async getBook() {

        let url_string = window.location.href;
        let urlBook = new URL(url_string);
        let split = urlBook.pathname.split("/")
        let bookId = split[2];

        console.log(url + "book/" + bookId)
        let promise = await fetch(url + "book/" + bookId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        let response = await promise.json();

        console.log(response)

        this.setState({book: response})
        this.setState({authors: response.author})
        this.setState({genres: response.genres})
        // console.log(this.state.books)
    }

    async getRandomBooks() {

        let url_string = window.location.href;
        let urlBook = new URL(url_string);
        let split = urlBook.pathname.split("/")
        let bookId = split[2];

        console.log(url + "book/" + bookId)
        let promise = await fetch(url + "random-books", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        let response = await promise.json();

        console.log(response)

        this.setState({randomBooks: response})
        // console.log(this.state.books)
    }



    componentDidMount() {
        this.getBook();
        this.getRandomBooks();
    }

    createBooks(books) {
        // let books = this.state.books.books;
        return (
            books.map((book) =>
                <RandomBook
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    price={book.price}
                />
            )
        )
    }

    render() {
        let imageUrl = book

        let randomBooks = this.createBooks(this.state.randomBooks);
        console.log(this.state.book)

        return (
            <div className={"BookPage"}>
                <div className="Book CurrentBook">
                    <div className="BookImage">
                        <div className="ImageBook">
                            <img className="ImgBook" src={imageUrl}/>
                            <div className={"Price"}>Цена: {this.state.book.price} р.
                            </div>
                        </div>
                    </div>
                    <div className="Information">
                        <div className={"Title"}>
                            {this.state.book.title}
                        </div>
                        <div className={"PostInform"}>
                            <div className={"Date"}>
                                <span>Год выпуска: </span>{this.state.book.year}
                            </div>
                            <div className={"Authors"}>
                                <span>Авторы: </span>{this.state.book.author}
                            </div>
                            <div className={"Genres"}>
                                <span>Жанры: </span>{this.state.book.genres}
                            </div>
                        </div>
                        <div className={"Description"}>
                            {this.state.book.description}
                        </div>
                    </div>
                </div>
                <div className={"RandomBooksTitle"}>
                    Рекомендуем к покупке:
                </div>
                <div className={"RandomBooks"}>
                    {randomBooks}
                </div>
            </div>
        );
    }
}

export default Book;
