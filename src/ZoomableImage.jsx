import React, { useRef, useState, useEffect } from 'react';

const ZoomableImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.onload = () => {
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }
  }, []);

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    } else if (event.touches.length === 1) {
      setInitialTouchPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      setInitialPosition(position);
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;

        if (scale > 1) {
          console.log('Zooming in');
        } else if (scale < 1) {
          console.log('Zooming out');
        }

        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
      }
    } else if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - initialTouchPosition.x;
      const deltaY = event.touches[0].clientY - initialTouchPosition.y;
      setPosition({
        x: initialPosition.x + deltaX,
        y: initialPosition.y + deltaY,
      });
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const totalWidth = originalDimensions.width * zoom;
  const totalHeight = originalDimensions.height * zoom;

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '400px',
    height: '400px',
  };

  const imgStyle = {
    position: 'absolute',
    top: `${position.y}px`,
    left:` ${position.x}px`,
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    transition: 'width 0.2s, height 0.2s, transform 0.2s',
  };

  return (
    <>
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
      <div>
        <p>Total Widthh: {totalWidth}px</p>
        <p>Total Height: {totalHeight}px</p>
      </div>
    </>
  );
};

export default ZoomableImage;