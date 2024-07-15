import React, { useEffect, useRef, useState } from 'react';

interface ZoomableImageProps {
  src: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialTouchPosition, setInitialTouchPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touches = event.touches as unknown as TouchList;
    if (touches.length === 2) {
      const distance = getDistance(touches[0], touches[1]);
      setInitialDistance(distance);
    } else if (touches.length === 1) {
      setInitialTouchPosition({
        x: touches[0].clientX,
        y: touches[0].clientY
      });
      setInitialPosition(position);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touches = event.touches as unknown as TouchList;
    if (touches.length === 2) {
      const currentDistance = getDistance(touches[0], touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        if (scale > 1) {
          // Zoom in
          setZoom((prevZoom) => Math.min(3, prevZoom + 0.1));
        } else {
          // Zoom out
          setZoom((prevZoom) => Math.max(1, prevZoom - 0.1));
        }
              }
    } else if (touches.length === 1) {
      const deltaX = touches[0].clientX - initialTouchPosition.x;
      const deltaY = touches[0].clientY - initialTouchPosition.y;

      const container = containerRef.current;
      const img = imgRef.current;

      if (container && img) {
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        let newX = initialPosition.x + deltaX;
        let newY = initialPosition.y + deltaY;

        const maxLeft = containerRect.width - imgRect.width;
        const maxTop = containerRect.height - imgRect.height;

        newX = Math.min(0, Math.max(newX, maxLeft));
        newY = Math.min(0, Math.max(newY, maxTop));

        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

 

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '350px',
    height: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid red'
  };

  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    transition: 'width 0.2s, height 0.2s, transform 0.2s'
  };

 

  return (
    <main>
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
     
    </main>
  );
};

export default ZoomableImage;
