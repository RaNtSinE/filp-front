import React, {useRef, useLayoutEffect, useState, useEffect} from "react";
import './Book.css';
import book from '../../book.png'

import pathConfig from '../../pathConfig.json'

let url = pathConfig.path;

const Book = props => {
    const ref = useRef(null)
    const divRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [margin, setMargin] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);

    let imageUrl
    if (props.imageUrl != null) {
        imageUrl = url + props.imageUrl
    } else {
        imageUrl = book
    }

    useEffect(() => {
        setHeight(ref.current.clientHeight)
        setMargin(divRef.current.clientHeight);
    })

    function handleLoad() {
        setHeight(ref.current.clientHeight)
        setMargin(divRef.current.clientHeight);
    }

    function toBook() {
        window.location.href = '/book/' + props.id;
    }


    let newPrice = ""

    if (props.discount > 0) {
        newPrice = <div>
            <div className={"PriceLineLibrary"}>

            </div>
            <div className={"NewPriceLibrary"}>
                {Math.ceil(parseFloat(props.price) * (1 - parseFloat(props.discount) / 100))} р.
            </div>
        </div>
    }

     return (
            <div className="Book" onClick={toBook}>
                <div ref={divRef} className="ImageBook" style={{height: height}}>
                    <img onLoad={handleLoad} ref={ref} className="ImgBook" src={imageUrl}/>
                </div>
                <div className="Information">
                    <div className="Title">{props.title}</div>
                    <div className="PostInform">
                        <div className="Date"><span>Год издания: </span>{props.date}</div>
                        <div className="Authors"><span>Авторы: </span>{props.authors}</div>
                        <div className="Genres"><span>Жанры: </span>{props.genres}</div>
                    </div>
                    <div className="Description" style={{maxHeight: "calc(" + height + "px - 80px)"}}>{props.description}</div>
                    <div className="Price" style={{marginTop: "calc(" + margin + "px - 10px)"}}>Цена: {props.price} р.
                        {newPrice}
                    </div>
                </div>
            </div>
        );
}

export default Book;
