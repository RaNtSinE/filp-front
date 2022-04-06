import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import './Books.css';
import Book from "./Book/Book";
import Page from "./Page";

import pathConfig from '../pathConfig.json'

let url = pathConfig.path;

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        background: "transparent",
        border: '1px solid #ced4da',
        fontSize: "1.5vw",
        padding: '10px 26px 10px 12px',
        // Use the system font instead of the default Roboto font.
        fontFamily: 'SAOUI',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 0
    },
    selectMenu: {
        background: "transparent"
    }
}));

export default function Library() {
    const classes = useStyles()

    const [param, setParam] = React.useState('title');
    const [books, setBooks] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [load, setLoad] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    async function getBooks(key="", type="") {
        let searchParams = {
            action: param,
            key: key,
            type: type,
            content: search
        }
        
        let promise = await fetch(url + "search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(searchParams)
        });

        let response = await promise.json();

        // this.setState({books: response.books})
        setBooks(response);
        if (loading) {
            setLoading(false)
        }
    }

    React.useEffect(()=>{
        if (!load) {
            getBooks();
            setLoad(true);
        }
    })

    const handleSearchClick = () => {
        getBooks();
    }

    const handleChange = (event) => {
        setParam(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const createBooks = (books) => {
        // let books = this.state.books.books;
        return (
            books.map((book) =>
                <Book
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    price={book.price}
                    date={book.year}
                    description={book.description}
                    genres={book.genres}
                    authors={book.author}
                />
            )
        )
    }

    let libraryBooks
    if (books && books.length > 0) {
        libraryBooks = createBooks(books)
        // console.log(books);
    }
    else if (!loading) {
        libraryBooks = <div className={"NotFound"}>Ничего не найдено</div>;
    } else {
        libraryBooks = []
    }

    const sortClickHandler = (key, type) => {
        getBooks(key, type);
    }

    return (
        <div className="Library">
            <div className="SearchBar">
                <input
                    className="SearchInput"
                    placeholder="Поиск"
                    value={search}
                    onChange={handleSearchChange}/>
                    <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label">Параметр поиска</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={param}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="title" className={classes.selectMenu}>
                                Название
                            </MenuItem>
                            <MenuItem value={"author"}>Автор</MenuItem>
                            <MenuItem value={"year"}>Год издания</MenuItem>
                            <MenuItem value={"genre"}>Жанр</MenuItem>
                        </Select>
                    </FormControl>
                <a className="SearchBarButton" onClick={handleSearchClick}>Найти</a>
            </div>
            <div className={"Sort"}>
                <div className={"SortYear"}>
                    <div>Сортировать по году:</div>
                    <div className={"SortButton"} onClick={()=>{sortClickHandler("year", "down")}}>По убыванию</div>
                    <div className={"SortButton"} onClick={()=>{sortClickHandler("year", "up")}}>По возрастанию</div>
                </div>
                <div className={"SortPrice"}>
                    <div>Сортировать по цене:</div>
                    <div className={"SortButton"} onClick={()=>{sortClickHandler("price", "down")}}>По убыванию</div>
                    <div className={"SortButton"} onClick={()=>{sortClickHandler("price", "up")}}>По возрастанию</div>
                </div>
            </div>
            <div>{libraryBooks}</div>
        </div>
    );
}

