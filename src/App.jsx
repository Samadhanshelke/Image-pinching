// import "./App.css";
import img from './pexels-photo-9551192.webp';
import ZoomableImage from './ZoomableImage'
const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh',display:'flex',justifyContent:'center',alignItems:'center' }}>
      {/* <ZoomableImage src={img}/> */}
      <ZoomableImage
  imageUrl={img}
  containerWidth={500}
  containerHeight={300}
/>
    </div>
  );
};

export default App;

