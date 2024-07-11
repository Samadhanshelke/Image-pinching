import React, { useState, useRef } from 'react';

const ImagePanner = ({ imageUrl, containerWidth, containerHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
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
      } else if (newX < containerRect.width - imageRect.width) {
        x = containerRect.width - imageRect.width;
      }

      if (newY > 0) {
        y = 0;
      } else if (newY < containerRect.height - imageRect.height) {
        y = containerRect.height - imageRect.height;
      }

      setCurrentPosition({ x, y });
      e.preventDefault(); // Prevent scrolling
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={imageContainerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        position: 'relative',
        border: '4px solid blue',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Pannable"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
        }}
      />
    </div>
  );
};

export default ImagePanner;