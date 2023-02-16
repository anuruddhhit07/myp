import React, { Component } from 'react';
import CanvasContainer from './CanvasContainer/CanvasContainer';


export default class Collector extends Component {
constructor(props) {
  super(props)
console.log('props',props);

this.childrenarray=this.props.children

this.welcome(this.childrenarray);
}

welcome= (child) => {
    console.log(`Hello from ${child[1].props.msg} the child`);
  }

// childrenWithProps = React.Children.map(children, child => {
//     // Checking isValidElement is the safe way and avoids a
//     // typescript error too.
//     if (React.isValidElement(child)) {
//       return React.cloneElement(child, { sayHello });
//     }
//     return child;
//   });


  render() {
    const { dimensions,data,children } = this.props
    return (
      <div>
        <CanvasContainer  dimensions={dimensions} data={data} >
            {/* <Chart1 /> */}
            {/* {children()} */}
           {/* { console.log(this.props.children)}; */}

           {this.props.children}

        </CanvasContainer>  
      </div>
    );
  }
}
