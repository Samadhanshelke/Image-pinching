import img from "./pexels-jckulkarni-910213.jpg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const initialDistanceRef = useRef(0);
  const initialScaleRef = useRef(1);

  useEffect(() => {
    const image = imageRef.current;
    let isPinching = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistanceRef.current = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialScaleRef.current = scale;
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
        
        const scaleFactor = currentDistance / initialDistanceRef.current;
        setScale(initialScaleRef.current * scaleFactor);
      }
    };

    const handleTouchEnd = () => {
      isPinching = false;
    };

    image.addEventListener("touchstart", handleTouchStart);
    image.addEventListener("touchmove", handleTouchMove);
    image.addEventListener("touchend", handleTouchEnd);

    return () => {
      image.removeEventListener("touchstart", handleTouchStart);
      image.removeEventListener("touchmove", handleTouchMove);
      image.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scale]);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
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
