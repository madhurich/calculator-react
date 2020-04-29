import React from 'react';
import './App.css';

const operators = ['+', '-', 'X', '/'];
const resetSymbols = ['/', 'X', '+', '='];
class App extends React.Component {
  constructor() {
    super();
    this.addNegative = false;
    this.initialState = {
      displayVal: '0',
      operator: null,
      leftVal: '0',
      operationDone: false,
      isMinus: false,
    }
  }

  componentWillMount() {
    this.setState({
      ...this.initialState
    });
  }

  onStartCalc(e) {
    let clickedChar = e.target.innerText;
    let currentDisplayVal = this.state.displayVal.toString();

    if (this.state.displayVal !== '0') {
      if (clickedChar === 'AC') {
        this.setState(this.initialState);
        return;
      } else if (clickedChar === '+/-') {
        this.addNegative = !this.addNegative;
        //to remove previously added minuses and get only the numeric value
        const numeric = (currentDisplayVal.match(/[1-9]+/))[0];
        this.setState({
          displayVal: this.addNegative ? '-' + numeric : numeric,
        });
        return;
      } else if (clickedChar === '%' && !this.state.operationDone) {
        this.setState({
          displayVal: this.state.displayVal / 100,
        });
        return;
      } else if (operators.includes(clickedChar)) {
        const numeric = (currentDisplayVal.match(/[1-9]+/))[0];
        this.setState({
          operator: clickedChar,
          leftVal: this.state.isMinus || this.addNegative ? '-'+ numeric : numeric,
          displayVal: this.state.isMinus || this.addNegative ? '-'+ numeric : '0',
          isMinus: false,
        });
        return;
      }
    }

    if(this.state.displayVal === '0') {
      if(clickedChar === '-'){
        this.setState({
          isMinus: true,
        });
        return;
      }else if(resetSymbols.includes(clickedChar)) {
        this.setState({
          isMinus: false,
        });
        return;
      }
    }

    currentDisplayVal = ((currentDisplayVal !== 0 && (currentDisplayVal).match(/^([1-9]+(\.[0-9]+)?)/)) || currentDisplayVal === '.' ? currentDisplayVal : '');
    if (clickedChar.match(/^\d+(\.\d+)*$/) || clickedChar === '.') {
      currentDisplayVal = clickedChar === '.' || currentDisplayVal[currentDisplayVal.length - 1] === '.' ? currentDisplayVal + clickedChar : (!this.state.operationDone ? currentDisplayVal + clickedChar : clickedChar);
      this.setState({
        displayVal: currentDisplayVal
      });
      return;
    } else if (clickedChar === '=' && this.state.operator) {
      const leftVal = Number(this.state.leftVal || 0);
      const rightVal = Number(this.state.displayVal);
      switch (this.state.operator) {
        case '+':
          this.setState({
            displayVal: leftVal + rightVal,
            operationDone: true,
          });
          break;
        case '-':
          this.setState({
            displayVal: leftVal - rightVal,
            operationDone: true,
          });
          break;
        case 'X':
          this.setState({
            displayVal: leftVal * rightVal,
            operationDone: true,
          });
          break;
        case '/':
          this.setState({
            displayVal: leftVal / rightVal,
            operationDone: true,
          });
          break;
      }
    }

  }

  render() {
    return (
      <div className="calculator">
        <table>
          <thead><tr><td>{this.state.displayVal}</td></tr></thead>
          <tbody onClick={this.onStartCalc.bind(this)}>
            <tr><td>AC</td><td>+/-</td><td>%</td><td>/</td></tr>
            <tr><td>7</td><td>8</td><td>9</td><td>X</td></tr>
            <tr><td>4</td><td>5</td><td>6</td><td id={this.state.isMinus ? 'highlight': ''}>-</td></tr>
            <tr><td>1</td><td>2</td><td>3</td><td>+</td></tr>
            <tr><td colSpan="2">0</td><td className="spn">.</td><td className="spn">=</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
