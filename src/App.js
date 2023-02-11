import logo from "./logo.svg";
import "./styles.scss";
import Navigation from "./Component/Header/Navbar";
import Gallery from "./Component/DummyPage/Gallery";
import { Routes, Route } from "react-router-dom";
import MyVisComponent from "./Component/Svg/MyVisComponent";
import Barchart from "./Component/Svg/barh.jsx"
import Linechart from "./Component/Svg/Linechart.jsx"

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
      
      </Routes>
      {/* </div> */}
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
