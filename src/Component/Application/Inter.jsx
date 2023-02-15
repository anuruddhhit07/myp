import React, { useRef, Component } from "react";
import testdata from "./testdata"
import Chartcontainer from "./Chartcontainer"

export default class EntryChart extends Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return (
      <>
    <h2>I am a {this.state.color} Car!</h2>
    <Chartcontainer />
    </>
    )
  }
}