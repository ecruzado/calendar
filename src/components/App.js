import React, { Component } from 'react';
import Selector from './Selector';
import Calendar from './Calendar';
import moment from 'moment';

class App extends Component {
    constructor(){
        super();
    }

    onGenerateClickHandler = e => {
        console.log(e);
    }
    render() {
        return (
            <div>
                <Selector onGenerateClick={this.onGenerateClickHandler} />      
                <Calendar startDate={moment()} endDate={moment().add(10, 'd')}/>
            </div>
        );
    }
};

export default App;

