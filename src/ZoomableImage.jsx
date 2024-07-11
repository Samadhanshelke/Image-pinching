import React, { useState, useRef } from 'react';

const ImagePanner = ({ imageUrl, containerWidth, containerHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.touches[0].clientX - currentPosition.x, y: e.touches[0].clientY - currentPosition.y });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const newX = e.touches[0].clientX - startPosition.x;
      const newY = e.touches[0].clientY - startPosition.y;
      const containerRect = imageContainerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      let x = newX;
      let y = newY;

      if (newX > 0) {
        x = 0;
      } else if (newX < containerRect.width - imageRect.width * scale) {
        x = containerRect.width - imageRect.width * scale;
      }

      if (newY > 0) {
        y = 0;
      } else if (newY < containerRect.height - imageRect.height * scale) {
        y = containerRect.height - imageRect.height * scale;
      }

      setCurrentPosition({ x, y });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchZoom = (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      const newScale = scale * (distance / e.currentTarget.offsetWidth);
      setScale(Math.max(0.5, Math.min(2, newScale)));
    }
  };

  return (
    <div
      ref={imageContainerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        position: 'relative',
        border: '4px solid pink',
      }}
      onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchZoom}
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Pannable and Zoomable"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          objectFit: 'contain',
          transform: `translate(${currentPosition.x}px, ${currentPosition.y}px) scale(${scale})`,
        }}
      />
    </div>
  );
};

export default ImagePanner;