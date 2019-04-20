import React, { Component } from 'react';
import textArray from './textlist'
import './App.css';

class App extends React.Component {
  render() {
    return(
      <Container textArray={textArray}></Container>
    )
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      items: [],
      textArray: this.props.textArray,
      bubbleClass: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addItem(text) {
    if(text) {
      this.setState(state => {
        state.items.push({text: text, class: 'bubble left'})
      });
    }else {
      this.setState(state => {
        state.items.push({text: textArray.shift(), class: 'bubble right'})
      });
    }
  }

  handleClick(e){
    this.addItem(this.state.inputValue)
    this.setState({
      inputValue: ''
    })
    this.addItem()
  }

  handleChange(val) {
    this.setState({
      inputValue: val
    });
    console.log(this.state.inputValue);
  }

  componentDidUpdate() { //After render()
    var elem = document.getElementById('list-container');
    elem.scrollTop = elem.scrollHeight;
  }

  componentWillMount() {
    this.addItem();
  }
  
  render() {
    const itemList = this.state.items.map(item => {
      // eslint-disable-next-line no-unused-expressions
      return (
        <Bubble key={item.text} text={item.text} class={item.class}></Bubble>
      )
    });

    return (
      <div>
        <div id='list-container'>
          {itemList}
        </div>
        <MessageInput value={this.state.inputValue} onInputChange={this.handleChange} onButtonClick={this.handleClick}></MessageInput>
      </div>
    );
  }
}

// Components
class MessageInput extends React.Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  handleClick(e) {
    this.props.onButtonClick(e);
  }

  render() {
    return (
      <div class="input-box">
       <input class="" type="text" value={this.props.value} onChange={this.handleChange} />
       <button class='btn btn-dark' onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}

function Bubble(props) {
  return (
      <div class={props.class}>{ props.text }</div> 
  );
}

export default App;
