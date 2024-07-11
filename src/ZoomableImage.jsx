import React, { useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [InitialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
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
  
    if (event.touches.length === 1 && isZoomed) {
      const deltaX = event.touches[0].clientX - InitialPosition.x;
      const deltaY = event.touches[0].clientY - InitialPosition.y;
  
      // Calculate new position
      const newPosX = position.x + deltaX;
      const newPosY = position.y + deltaY;
  
      // Get container dimensions
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
  
      // Get image dimensions
      const imageRect = imgRef.current.getBoundingClientRect();
      const imageWidth = imageRect.width * zoom;
      const imageHeight = imageRect.height * zoom;
  
      // Calculate bounds
      const maxX = containerWidth - imageWidth;
      const maxY = containerHeight - imageHeight;
  
      // Clamp position within bounds
      const clampedX = Math.min(Math.max(newPosX, maxX), 0);
      const clampedY = Math.min(Math.max(newPosY, maxY), 0);
  
      // Update state
      setPosition({ x: clampedX, y: clampedY });
  
      // Update initial position for next move
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

export default ZoomableImage;
