
import img from './pexels-jckulkarni-910213.jpg';
import ZoomableImage from './ZoomableImage'
const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ZoomableImage src={img}/>
    </div>
  );
};

export default App;
