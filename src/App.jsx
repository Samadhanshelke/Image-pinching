import img from "./pexels-jckulkarni-910213.jpg";
import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  const [scale, setScale] = useState(1);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
   
  };

  
  const handleTouchMove = (e) => {
    console.log("moving");
    console.log(e);
    if (e.touches.length == 2) {
      alert("two fingers touched");
    }
  };

  const handleTouchEnd = () => {
    console.log("touch end");
  };

  useEffect(() => {
    const container = imageRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
    
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
       
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        ref={containerRef}
        className="h-[400px] w-[400px] border-4 border-green-600 overflow-hidden"
      >
        <img
          ref={imageRef}
          style={{ transform: `scale(${scale})` }}
          src={img}
          className="max-w-[400px] h-[400px]"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default App;
