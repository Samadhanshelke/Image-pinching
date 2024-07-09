import { useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);
  const [initialTouch, setInitialTouch] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    } else if (event.touches.length === 1) {
      setInitialTouch({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
        setInitialDistance(currentDistance);
      }
    } else if (event.touches.length === 1 && zoom > 1) {
      const currentTouch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      const deltaX = currentTouch.x - initialTouch.x;
      const deltaY = currentTouch.y - initialTouch.y;
      setPan((prevPan) => ({
        x: prevPan.x + deltaX,
        y: prevPan.y + deltaY,
      }));
      setInitialTouch(currentTouch);
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
    setInitialTouch(null);
  };

  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] ">
      <div className="h-[400px] w-[400px] border-4 border-blue-600 overflow-hidden relative">
        <img
          ref={imgRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center',
            transition: zoom > 1 ? 'none' : 'transform 0.1s ease-out', // Disable transition during panning
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
