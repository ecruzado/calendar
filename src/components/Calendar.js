import React, { Component } from 'react';
import moment from 'moment';

let counter = 0;
const generateKey = () => {
    counter++;
    return `${moment().unix()}_${counter}`;
};

class Calendar extends Component {
    constructor(){
        super();
        this.state = {
        };
    }

    onClickHandler = () => {
    }
    
    getEmptySpots = startDate => {
        return  Array.apply(null, Array(startDate.day())).map( (e, i) => <span key={generateKey()}></span>);
    };

    getDays = () => {
        const { startDate, endDate, holidays } = this.props;
        const holidaysFormatted = holidays.map(({ date }) => moment(new Date(date.year, +date.month - 1, date.day)));
        const startOfMonth = startDate.clone().startOf('month');
        const endOfMonth = startDate.clone().endOf('month'); 
        
        const days = this.getEmptySpots(startOfMonth);
        let date = startOfMonth.clone();

        while(date.isBefore(endOfMonth)) {
            let type = 'invalid';
            let text = date.date();
            if (date.isBefore(startDate, 'day') || date.isAfter(endDate, 'day')) {
                text = '';
            } else if (holidaysFormatted.some(holiday => holiday.isSame(date, 'day'))) {
                type = 'holiday';
            }
            else if ([0, 6].indexOf(date.day()) > -1) {
                type = 'weekend';
            } else {
                type = 'weekday';
            }
            days.push(<span key={generateKey()} className={type}>{text}</span>);
            date.add(1, 'd');
        }
        return days;
    };

    render() {
        const { startDate } = this.props;
        return (
            <div className="calendar">
                <div className="days">
                    <span className="header">S</span>
                    <span className="header">M</span>
                    <span className="header">T</span>
                    <span className="header">W</span>
                    <span className="header">T</span>
                    <span className="header">F</span>
                    <span className="header">S</span>
                </div>
                <div className="header">{startDate.format('MMMM YYYY')}</div>
                <div className="days">
                    {this.getDays()}
                </div>
            </div>
        );
    }
};

export default Calendar;
