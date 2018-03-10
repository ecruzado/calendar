import React, { Component } from 'react';

class Selector extends Component {
    constructor(){
        super();
        this.state = {
            startDate: '',
            numberOfDays: 0,
            countryCode: ''
        };
    }

    onGenerateClickHandler = () => {
        const { onGenerateClick } = this.props;
        onGenerateClick && onGenerateClick(this.state);
    }
    
    render() {
        return (
            <div>
                <h1>Generate calendar </h1>
                <p>
                    <span>Start date: </span>
                    <input type="date" value={this.state.startDate} onChange={({ target }) => this.setState({ startDate: target.value })} />
                </p>
                <p>
                    <span>Number of days: </span>
                    <input type="number" value={this.state.numberOfDays} onChange={({ target }) => this.setState({ numberOfDays: target.value })} />
                </p>
                <p>
                    <span>Country Code: </span>
                    <input type="text" value={this.state.countryCode} onChange={({ target }) => this.setState({ countryCode: target.value })} />
                </p>
                <p>
                    <input type="button" value="Generate" onClick={this.onGenerateClickHandler} />
                </p>
            </div>
        );
    }
};

export default Selector;
