import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import * as serviceWorker from './serviceWorker';

function keyWordExtractor(text) {
  var keyword_extractor = require("keyword-extractor")
  var extraction_result = keyword_extractor.extract(text,{
                                                                  language:"english",
                                                                  remove_digits: true,
                                                                  return_changed_case:true,
                                                                  remove_duplicates: false
    
                                                              });
  return extraction_result;
}

function DrawCloud() {
  return(
    <canvas id="myCanvas" width="200" height="100"></canvas>
  )
}





class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(keyWordExtractor(this.state.value));

    //event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <h1> Paragraph dsfads</h1>
        <label>
          <textarea rows= "10" cols="50" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <DrawCloud/>
    
      </div>
    
    );
  }
}

ReactDOM.render(<EssayForm />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
