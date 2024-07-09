import React, { useState, useRef } from 'react';
import img from './pexels-jckulkarni-910213.jpg';
import './App.css';

function App() {
  const [scale, setScale] = useState(1);
  const [lastDistance, setLastDistance] = useState(null);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      setLastDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      if (lastDistance) {
        const delta = distance - lastDistance;
        const newScale = Math.max(1, scale + delta / 200);
        setScale(newScale);
      }
      setLastDistance(distance);
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setLastDistance(null);
    }
  };

  const getDistance = (touches) => {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div
        className='h-[400px] w-[400px] border-4 border-blue-600 overflow-hidden'
       
      >
        <img
          src={img}
          ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
          className='max-w-[400px] h-[400px]'
          alt='Zoomable'
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

export default App;
