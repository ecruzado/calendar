import React, { Component } from 'react';
import Selector from './Selector';
import Calendar from './Calendar';
import moment from 'moment';
import getHolidays  from '../helpers/getHolidays';


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
            endDate: undefined,
            holidays: undefined,
        };
    }

    onGenerateClickHandler = e => {
        const { startDate: startDateRaw, numberOfDays, countryCode } = e;
        const startDate = moment(startDateRaw);
        const endDate = startDate.clone().add(numberOfDays, 'd');
        getHolidays(startDate.year(), countryCode).then(data => this.setState({ holidays: data }));
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
        const { startDate, endDate, holidays } = this.state;
        if (!startDate) return undefined;
        const dateRanges = this.getDateRanges({ startDate, endDate});
        return dateRanges.map(range => 
            <Calendar key={generateKey()} startDate={range.startDate} endDate={range.endDate} holidays={holidays}/>
        );
    };

    render() {
        const { holidays } = this.state;
        return (
            <div>
                <Selector onGenerateClick={this.onGenerateClickHandler} />
                { holidays && this.displayCalendars() }
            </div>
        );
    }
};

export default App;

