import React from 'react';
import ZoomableImage from './ZoomableImage';
import img from './pexels-photo-9551192.webp';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='overflow-hidden w-full h-full'>
      <ZoomableImage src={img} />
    </div>
  );
};

export default App;
