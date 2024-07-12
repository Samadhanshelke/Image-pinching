import ZoomableImage from './ZoomableImage';
import img from './pexels-photo-9551192.webp'
import './App.css'
const App = () => {
  return (
    <div className='overflow-hidden'>
      <ZoomableImage src={img} />
    </div>
  );
};

export default App;