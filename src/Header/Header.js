import React from 'react';
import './Header.css';

import pathConfig from '../pathConfig.json'

let url = pathConfig.path;

class Header extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className="Header">
                <a href="/" className="Logo">BookNode</a>
                <div className="NavPanel">
                    <a href="/">Библиотека</a>
                </div>
                <div className="UserControl">

                </div>
            </div>
        );
    }
}

export default Header;
