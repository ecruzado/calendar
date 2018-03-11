import React, { Component } from 'react';
import Selector from './Selector';
import Calendar from './Calendar';
import moment from 'moment';

let counter = 0;
const generateKey = () => {
    counter++;
    return `${moment().unix()}_${counter}`;
};

class App extends Component {
    constructor(){
        super();
        this.state = {
            startDate: undefined,
            endDate: undefined
        };
    }

    onGenerateClickHandler = e => {
        const { startDate: startDateRaw, numberOfDays, countryCode } = e;
        const startDate = moment(startDateRaw);
        const endDate = startDate.clone().add(numberOfDays, 'd');
        this.setState({ startDate, endDate });
    };
    
    getDateRanges = ({ startDate, endDate }) => {
        const ranges = [];
        let date = startDate.clone();
        while (date.isBefore(endDate)) {
            const endOfMonth = date.clone().endOf('month');
            if (endOfMonth.isBefore(endDate)) {
                ranges.push({ startDate: date.clone(), endDate: endOfMonth });
            } else {
                ranges.push({ startDate: date.clone(), endDate });
            }
            date = endOfMonth.clone().add(1, 'd');
        }
        return ranges;
    };

    displayCalendars = () => {
        const { startDate, endDate } = this.state;
        if (!startDate) return undefined;
        const dateRanges = this.getDateRanges({ startDate, endDate});
        return dateRanges.map(range => 
            <Calendar key={generateKey()} startDate={range.startDate} endDate={range.endDate}/>
        );
    };

    render() {
        return (
            <div>
                <Selector onGenerateClick={this.onGenerateClickHandler} />
                { this.displayCalendars() }
            </div>
        );
    }
};

export default App;

