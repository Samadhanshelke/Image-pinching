import React, { useState, useRef } from 'react';

const ImagePanner = ({ imageUrl, containerWidth, containerHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
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
    }
  };

  const handleMouseUp = () => {
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
        border:'4px solid red'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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