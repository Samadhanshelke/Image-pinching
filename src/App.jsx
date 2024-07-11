import "./App.css";
import img from './pexels-photo-9551192.webp';
import ZoomableImage from './ZoomableImage'
const App = () => {
  return (
    <div>
      <ZoomableImage src={img}/>
      {/* <ZoomableImage
  imageUrl={img}
  containerWidth={300}
  containerHeight={300}
/> */}
    </div>
  );
};

export default App;

