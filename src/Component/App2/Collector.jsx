import React, { Component, Children } from "react";
import CanvasContainer from "./CanvasContainer/CanvasContainer";

export default class Collector extends Component {
  constructor(props) {
    super(props);
    // console.log("props", props);

    this.childrenarray = this.props.children;
    this.welcome(this.childrenarray);

    
  }

  welcome = (child) => {
    // console.log(`Hello from collector`);
  };

//   childrenWithProps=React.cloneElement(this.props.children,this.props)

  childrenWithProps = Children.map(this.props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child,this.props);
    }
    return child;
  });



  render() {
    const { dimensions, data, children } = this.props;
    return (
      <div>

        hello
        <CanvasContainer  dimensions={dimensions} data={data} />
        {/* {console.log(this.childrenWithProps)} */}
        
        {this.childrenWithProps}

      </div>
    );
  }
}
