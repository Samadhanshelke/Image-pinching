
import ZoomableImage from './ZoomableImage';
import img from './pexels-jckulkarni-910213.jpg'
const App = () => {
  return (
    <div className='overflow-hidden'>
      <ZoomableImage src={img} />
    </div>
  );
};

export default App;