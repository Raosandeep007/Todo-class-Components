import React from 'react';

// * class components
// * prototype chain
// * sugar syntex

class Counter extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    // initialise
    // state managemnet
    this.state = {
      counter: 0,
      totalClicks: 0,
    };
    // single object
  }

  handleCounterChange = (value) => {
    // patch

    // 1............................
    this.setState(
      {
        counter: value + this.state.counter,
        totalClicks: this.state.totalClicks + 1,
      },
      () => console.log(this.state)
    );
    // * remember setState is a bit async

    // 2...............
    // this.setState((prev) => {
    //   console.log(prev.counter);
    //   return {
    //     counter: prev.counter + value,
    //   };
    // });
  };
  render() {
    const { title } = this.props;
    const { counter, totalClicks } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{counter}</h3>
        <button onClick={() => this.handleCounterChange(1)}>ADD</button>
        <button onClick={() => this.handleCounterChange(-1)}>REDUCE</button>
        <div>TOTAL CLICKS = {totalClicks}</div>
      </div>
    );
  }
}

export { Counter };
// * constructor
