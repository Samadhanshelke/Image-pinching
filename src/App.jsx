import  { useRef, useState } from 'react';
import src from './pexels-photo-9551192.webp'
const App = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    }

    if (event.touches.length === 1) {
      setInitialPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
        setIsZoomed(zoom > 1);
      }
    }

    if (event.touches.length === 1 ) {
      const deltaX = event.touches[0].clientX - initialPosition.x;
      const deltaY = event.touches[0].clientY - initialPosition.y;
      setInitialPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });

      setPosition((prevPosition) => {
        const newX = prevPosition.x + deltaX;
        const newY = prevPosition.y + deltaY;
        const boundedPosition = getBoundedPosition(newX, newY);
        return boundedPosition;
      });
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getBoundedPosition = (x, y) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const imgRect = imgRef.current.getBoundingClientRect();

    const minX = Math.min(0, containerRect.width - imgRect.width);
    const minY = Math.min(0, containerRect.height - imgRect.height);
    const maxX = 0;
    const maxY = 0;

    const boundedX = Math.max(minX, Math.min(maxX, x));
    const boundedY = Math.max(minY, Math.min(maxY, y));

    return { x: boundedX, y: boundedY };
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
    transition: 'transform 0.2s',
    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
    touchAction: 'none',
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoomable"
        style={imgStyle}
      />
    </div>
  );
};

export default App;
