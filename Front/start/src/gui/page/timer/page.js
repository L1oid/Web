import React from 'react';

import Welcome from '../../component/welcome/component.js';
import ButtonToStrat from './button.js';
  
class Page extends React.Component {
  
    constructor(props) {
      super(props);
      console.log('Page_Timer::constructor');
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      console.log('Page_Timer::componentDidMount');
      this._timerID = setInterval( () => this._tick() , 1000 );
      //setTimeout( () => this._tick() , 1000 );      
    }
  
    componentWillUnmount() {
      console.log('Page_Timer::componentWillUnmount');
      clearInterval(this._timerID);
    }
  
    render() {
      console.log('Page_Timer::render:' + this.state.date);
      return (
        <div>
          <Welcome id = {this.props.id.value + 1} name = 'Name 11' time = {this.state.date}  />
          <Welcome id = {this.props.id.value + 2} name = 'Name 22' time = {this.state.date} />
          <Welcome id = {this.props.id.value + 3} name = 'Name 33' time = {this.state.date} />                        
          <ButtonToStrat />
        </div>        
      );
    }
    
    _tick() {
      this.setState(
        {
          date: new Date()
        }
      );
    }
}

export default Page;