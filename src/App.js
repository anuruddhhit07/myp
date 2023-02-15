import logo from "./logo.svg";
import "./styles.scss";
import Navigation from "./Component/Header/Navbar";
import Gallery from "./Component/DummyPage/Gallery";
import { Routes, Route } from "react-router-dom";
import MyVisComponent from "./Component/Svg/MyVisComponent";
import Barchart from "./Component/Svg/barh.jsx"
import Linechart from "./Component/Svg/Linechart.jsx"
import CanvaS from "./Component/Svg/containersgcs"
import SVGCS from "./Component/Svg/containersgcs.jsx"
import MySvgCD from "./Component/Svg/mysvgcd";
//import D3Chart from "./Component/Application/Inter.jsx"
import D3Chart from "./Component/Application/ReactComponent.jsx"


function App() {
  return (
    <div className="container">
      <div className="header">
        <Navigation />
      </div>

      {/* <div className="height-100"> */}
      <div className="mainbody">
      <Routes>
        <Route exact path="/" element={<Gallery />} />
        <Route exact path="/svgimg" element={<MyVisComponent />} />
         <Route path="/contact" element={<Barchart />} />
         <Route path="/images" element ={<Linechart/>}/>
         <Route path="/canvasimg"element={<CanvaS/>}/>
         <Route path="/svgcanvas" element={<SVGCS/>}/>
         <Route path="/svgcd" element={<MySvgCD/>}/>
         <Route path="/cwrapper" element={<D3Chart/>}/>
      
      </Routes>
      {/* </div> */}
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
