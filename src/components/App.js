import React, { Component } from 'react';
import Selector from './Selector';

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
            </div>
        );
    }
};

export default App;

