import img from "./pexels-jckulkarni-910213.jpg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const initialTouchDistanceRef = useRef(0);
  const initialScaleRef = useRef(1);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  const lastTouchPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const image = imageRef.current;
    let touchStartDistance = 0;
    let touchStartScale = 1;
    let isPinching = false;
    let isDragging = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        touchStartDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        touchStartScale = scale;
      } else if (e.touches.length === 1) {
        isDragging = true;
        lastTouchPositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        initialPositionRef.current = { ...position };
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && isPinching) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        const scaleFactor = (currentDistance / touchStartDistance) * touchStartScale;

        // Adjusting the scaling factor for faster zoom
        const zoomFactor = 0.5; // Adjust this value to increase or decrease zoom speed
        const newScale = scale + zoomFactor * (scaleFactor - 1);

        // Limiting the scale factor to a reasonable range (e.g., 0.5 to 3)
        const minScale = 0.5;
        const maxScale = 3;
        const boundedScaleFactor = Math.min(Math.max(newScale, minScale), maxScale);

        setScale(boundedScaleFactor);
      } else if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - lastTouchPositionRef.current.x;
        const deltaY = e.touches[0].clientY - lastTouchPositionRef.current.y;

        setPosition({
          x: initialPositionRef.current.x + deltaX / scale,
          y: initialPositionRef.current.y + deltaY / scale,
        });

        lastTouchPositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = () => {
      isPinching = false;
      isDragging = false;
    };

    image.addEventListener("touchstart", handleTouchStart);
    image.addEventListener("touchmove", handleTouchMove);
    image.addEventListener("touchend", handleTouchEnd);

    return () => {
      image.removeEventListener("touchstart", handleTouchStart);
      image.removeEventListener("touchmove", handleTouchMove);
      image.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scale, position]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-[400px] w-[400px] border-4 border-yellow-600 overflow-hidden">
        <img
          ref={imageRef}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          }}
          src={img}
          className="max-w-[400px] h-[400px]"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default App;
