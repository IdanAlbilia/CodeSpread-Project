import React, { Component } from "react";
import Thread from "./Thread";
import { Route } from "react-router-dom";

class ThreadList extends Component {
  // a function that check whether the text should be white or black according to background color.
  lightOrDark(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp < 127.5) {
      return "white";
    } else {
      return "black";
    }
  }

  render() {
    console.log("thread list - rendered");

    const { threads, onEditThread } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        {threads.map((thread) => (
          <Route
            key={thread._id}
            render={({ history }) => (
              <button
                style={{
                  width: "100%",
                  backgroundColor: `${thread.Color}`,
                }}
                key={thread._id}
                onClick={() => {
                  onEditThread(thread);
                  history.push({
                    pathname: "/ThreadView/" + thread._id,
                    state: { detail: thread._id },
                  });
                }}
              >
                <Thread
                  key={thread._id}
                  name={thread.ThreadName}
                  id={thread._id}
                  thread={thread}
                  onEdit={onEditThread}
                >
                  <h4 style={{ color: `${this.lightOrDark(thread.Color)}` }}>
                    {thread.ThreadName}
                  </h4>
                </Thread>
              </button>
            )}
          />
        ))}
      </div>
    );
  }
}

export default ThreadList;
