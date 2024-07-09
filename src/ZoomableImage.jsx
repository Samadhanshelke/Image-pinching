import { useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
        setInitialDistance(currentDistance); // Update the initial distance for continuous zooming
      }
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

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] ">
      <div className="h-[400px] w-[400px] border-4 border-blue-600 overflow-hidden">
        <img
          ref={imgRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center', // Ensure scaling from the center
            transition: 'transform 0.1s ease-out', // Smooth zoom transitions
          }}
          src={src}
          className="max-w-[400px] h-[400px]"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default ZoomableImage;
