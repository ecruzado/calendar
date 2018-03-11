import React, { Component } from 'react';

class Selector extends Component {
    constructor(){
        super();
        this.state = {
            startDate: '',
            numberOfDays: 10,
            countryCode: 'usa',
            messages: []
        };
    }

    validateForm = () => {
        const { startDate, numberOfDays } = this.state;
        const messages = [];
        if(!startDate) messages.push('Select start date');
        if(!numberOfDays || numberOfDays< 0) messages.push('Insert a valid number of days');
        this.setState({messages});
        return messages.length === 0;
    };

    onGenerateClickHandler = e => {
        e.preventDefault();
        if(!this.validateForm()) return;
        const { onGenerateClick } = this.props;
        onGenerateClick && onGenerateClick(this.state);
    };

    getMessages = () => {
        const { messages } = this.state;
        return messages.map((message, i) => <p key={`message_${i}`} className="message">{message}</p>);
    };

    render() {
        const { onGenerateClick, supportedCountries = [] } = this.props;
        return (
            <form className="form">
                <h2>Generate calendar </h2>
                <label>Start date: </label>
                <input type="date" value={this.state.startDate} onChange={({ target }) => this.setState({ startDate: target.value })} />
                <label>Number of days: </label>
                <input type="number" value={this.state.numberOfDays} onChange={({ target }) => this.setState({ numberOfDays: target.value })} />
                <label>Country Code: </label>
                {/* <input type="text" value={this.state.countryCode} onChange={({ target }) => this.setState({ countryCode: target.value })} /> */}
                <select value={this.state.countryCode} onChange={({ target }) => this.setState({ countryCode: target.value })}>
                    {supportedCountries.map(country => <option key={`option_${country.countryCode}`} value={country.countryCode}>{country.fullName}</option>)}
                </select>
                {this.getMessages()}
                <button onClick={this.onGenerateClickHandler}>Generate</button>
            </form>
        );
    }
};

export default Selector;
