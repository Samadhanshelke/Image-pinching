import  { useRef, useState, useEffect } from 'react';
import src from './pexels-photo-9551192.webp'

const App = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isZoomed) {
        panImage(event);
      }
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isZoomed]);

  const handleWheel = (event) => {
    const scale = event.deltaY > 0 ? 1.1 : 0.9;
    setZoom((prevZoom) => {
      const newZoom = Math.max(1, Math.min(prevZoom * scale, 3));
      setIsZoomed(newZoom > 1);
      return newZoom;
    });
  };

  const panImage = (event) => {
    if (!isZoomed) return;

    const buffer = 10;
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;
    
    const originX = (mouseX / containerRect.width) * 100;
    const originY = (mouseY / containerRect.height) * 100;
    
    imgRef.current.style.transformOrigin = `${originX}% ${originY}%`;

    const maxX = imgRef.current.clientWidth - containerRef.current.clientWidth;
    const maxY = imgRef.current.clientHeight - containerRef.current.clientHeight;

    const xPercentage = (mouseX - buffer) / (containerRect.width - buffer * 2);
    const yPercentage = (mouseY - buffer) / (containerRect.height - buffer * 2);

    const offsetX = Math.min(Math.max(0, xPercentage * maxX), maxX);
    const offsetY = Math.min(Math.max(0, yPercentage * maxY), maxY);

    setPosition({ x: -offsetX, y: -offsetY });
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '350px',
    height: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid blue',
  };

  const imgStyle = {
    position: 'absolute',
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    transition: 'transform 0.2s, transform-origin 0.2s',
    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
    touchAction: 'none',
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onWheel={handleWheel}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoomable"
        style={imgStyle}
        className="zoom-img"
      />
    </div>
  );
};

export default App;

