import React from "react";
import Book from "./Book/Book";
import Header from "./Header/Header";
import Library from "./Books/Library";


import pathConfig from './pathConfig.json'

let url = pathConfig.path;

const collection = {
    '/book': RenderBook,
    '/': RenderLibrary
}

function RenderLibrary(username) {
    return(
        <Library/>
    )
}

function RenderBook(username) {
    return(
        <Book username={username}/>
    )
}

export default class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            username: "",
            balance: 0,
            token: localStorage.getItem("bookNodeToken")
        }

        this.changeToken = this.changeToken.bind(this);
    }

    changeToken() {
        this.setState({token: localStorage.getItem("bookNodeToken")})
    }

    render() {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let split = url.pathname.split("/")
        let pathname = "/"
        if (split[1] === "book") {
            pathname = "/book"
        } else if(split[1] === "game") {
            pathname = "/game"
        } else {
            pathname = url.pathname
        }
        let page;
        page = collection[pathname] && collection[pathname](this.state.username, this.state.id);
        if(page === undefined)
        {
            // page = <Page404/>;
        }
        console.log(this.state.id)
        return (
            <div>
                <Header changeToken={this.changeToken}/>
                {page}
            </div>
        );
    }
}