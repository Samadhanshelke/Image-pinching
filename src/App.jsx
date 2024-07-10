import ZoomableImage from './ZoomableImage';
import img from './pexels-jckulkarni-910213.jpg'
import './App.css'
const App = () => {
  return (
    <div className='overflow-hidden h-full'>
      <ZoomableImage src={img} />
    </div>
  );
};

export default App;