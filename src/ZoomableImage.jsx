import React, { useState, useRef } from 'react';

const ImagePanner = ({ imageUrl, containerWidth, containerHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + e.deltaY * -0.01;
    setScale(Math.max(0.5, Math.min(2, newScale)));
  };

  return (
    <div
      ref={imageContainerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Pannable and Zoomable"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          objectFit: 'contain',
          transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
        }}
      />
    </div>
  );
};

export default ImagePanner;