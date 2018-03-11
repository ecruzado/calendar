import React, { Component } from 'react';

class Selector extends Component {
    constructor(){
        super();
        this.state = {
            startDate: '',
            numberOfDays: 10,
            countryCode: 'usa'
        };
    }

    onGenerateClickHandler = e => {
        e.preventDefault();
        const { onGenerateClick } = this.props;
        onGenerateClick && onGenerateClick(this.state);
    }
    
    render() {
        const { onGenerateClick, supportedCountries = [] } = this.props;
        return (
            <form className="form">
                <h2>Generate calendar </h2>
                <label>Start date: </label>
                <input type="date" placeholder="Start date" value={this.state.startDate} onChange={({ target }) => this.setState({ startDate: target.value })} />
                <label>Number of days: </label>
                <input type="number" placeholder="Number of days" value={this.state.numberOfDays} onChange={({ target }) => this.setState({ numberOfDays: target.value })} />
                <label>Country Code: </label>
                {/* <input type="text" value={this.state.countryCode} onChange={({ target }) => this.setState({ countryCode: target.value })} /> */}
                <select value={this.state.countryCode} onChange={({ target }) => this.setState({ countryCode: target.value })}>
                    {supportedCountries.map(country => <option key={`option_${country.countryCode}`} value={country.countryCode}>{country.fullName}</option>)}
                </select>
                <button onClick={this.onGenerateClickHandler}>Generate</button>
            </form>
        );
    }
};

export default Selector;
