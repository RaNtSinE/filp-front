import React from 'react';

class Page extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            page: this.props.page,
            classActive: ""
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.pageChange(this.state.page);
    }

    componentWillUpdate(nextProps, nextState, snapshot) {
        if (nextProps.currentPage === nextProps.page) {
            nextState.classActive = "Active"
        } else {
            nextState.classActive = ""
        }
    }

    render() {
        return (
            <div  onClick={this.handleClick} className={"Page " + this.state.classActive}>
                <a>{this.props.page}</a>
            </div>
        );
    }
}

export default Page;
