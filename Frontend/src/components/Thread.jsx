import React, { Component } from "react";

class Thread extends Component {
  render() {
    console.log("thread - rendered");
    return (
      <React.Fragment>
        <div>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Thread;
