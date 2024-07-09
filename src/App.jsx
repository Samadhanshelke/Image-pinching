import img from "./pexels-jckulkarni-910213.jpg";
import "./App.css";
import { useRef, useState } from "react";
function App() {
  const [scale, setScale] = useState(1);
  const imageRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      alert('two fingers touched')
    }
  };
  const handleTouchMove = () => {
    console.log("moving");
    // alert("handleTouchMove")
  };

  const handleTouchEnd = () => {
    console.log("touch end");
    // alert("handleTouchEnd")
  };
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="h-[400px] w-[400px] border-4 border-pink-600    overflow-hidden"
      >
        <img
          ref={imageRef}
          style={{ transform: `scale(${scale})` }}
          src={img}
          className="max-w-[400px] h-[400px] "
          alt="Background"
        />
      </div>
    </div>
  );
}

export default App;
