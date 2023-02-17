export default class CanvasContainer extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
      // const { dimensions:{width, height,margin}, data } = props;
      // this.state = {
      //   data: 'Jordan Belfort'
      // }
     
    }
  
    componentDidMount() {
      const {props:{ dimensions,controller} } = this
      console.log('this');
      if(dimensions) {
        const d3Props = {
          dimensions,
          controller
          // onDatapointClick2: function(value){ return setActive(value) }
        }
        let vis = new CanvasD3(this.myRef.current, d3Props);
      }
  
  
    }
  
  
    render() {
      return <div ref={this.myRef}>{/* dfghgfgh */}</div>;
    }
  }