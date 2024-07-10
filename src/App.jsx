import "./App.css";
import img from './pexels-jckulkarni-910213.jpg';
import ZoomableImage from './ZoomableImage'
const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh',display:'flex',justifyContent:'center',alignItems:'center' }}>
      <ZoomableImage src={img}/>
    </div>
  );
};

export default App;
