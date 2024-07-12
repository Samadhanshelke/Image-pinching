import React, { useRef, useState, useEffect } from 'react';
import img from './pexels-photo-9551192.webp'
const App = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
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
        setZoom((prevZoom) => {
          const newZoom = Math.max(1, Math.min(prevZoom * scale, 3));
          setIsZoomed(newZoom > 1);
          return newZoom;
        });
      }
    }

    if (event.touches.length === 1 ) {
      const deltaX = event.touches[0].clientX - initialPosition.x;
      const deltaY = event.touches[0].clientY - initialPosition.y;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const imageRect = imgRef.current.getBoundingClientRect();
      const imageWidth = imageRect.width;
      const imageHeight = imageRect.height;

      // Calculate the bounds within which the image can move
      const minX = Math.min(0, containerWidth - imageWidth);
      const minY = Math.min(0, containerHeight - imageHeight);
      const maxX = 0;
      const maxY = 0;

      // Ensure the position stays within the bounds
      const newPosX = Math.max(minX, Math.min(position.x + deltaX, maxX));
      const newPosY = Math.max(minY, Math.min(position.y + deltaY, maxY));

      setPosition({ x: newPosX, y: newPosY });

      setInitialPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
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

  const panImage = (event) => {
    if (!isZoomed) return;

    const buffer = 10; // Adjust this value to control the buffer area around the frame

    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imgRef.current.getBoundingClientRect();

    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const maxX = imageRect.width - containerRect.width;
    const maxY = imageRect.height - containerRect.height;

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
    transition: 'width 0.2s, height 0.2s, transform 0.2s',
    transform: `translate(${position.x}px, ${position.y}px)`,
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
        src={img}
        alt="Zoomable"
        style={imgStyle}
      />
    </div>
  );
};

export default App;
