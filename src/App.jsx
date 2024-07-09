import img from "./pexels-jckulkarni-910213.jpg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
function App() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x:0,y:0});


  const imageRef = useRef(null);

  const handleZoomIn = ()=>{
      setScale((scale)=> scale + 0.1 );
  }

  useEffect(()=>{
     const image =imageRef.current;
     let isDragging = false;
     let prevPosition = {x:0,y:0};
     const handleTouch = (e)=>{
            isDragging = true;
            prevPosition = {x:e.touches[0].clientX,y:e.touches[0].clientY};
     }

     const handleTouchMove = (e)=>{
      if(!isDragging) return;
      const deltaX = e.touches[0].clientX - prevPosition.x;
      const deltaY = e.touches[0].clientY - prevPosition.y;
      prevPosition = {x:e.touches[0].clientX,y:e.touches[0].clientY};
      setPosition((position)=>({
        x:position.x + deltaX,
        y:position.y + deltaY
      }))
     }

     const handleTouchUp = ()=>{
      isDragging = false;
     }

     image?.addEventListener("onTouchStart",handleTouch)
     image?.addEventListener("onTouchMove",handleTouchMove)
     image?.addEventListener("onTouchEnd",handleTouchUp)
     return ()=>{
      image?.removeEventListener("onTouchStart",handleTouch)
     image?.removeEventListener("onTouchMove",handleTouchMove)
     image?.removeEventListener("onTouchEnd",handleTouchUp)
     }
  },[imageRef,scale])

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div
       
        className="h-[400px] w-[400px] border-4 border-pink-600    overflow-hidden"
      >
        <img
          ref={imageRef}
       
          style={{ transform: `scale(${scale}) translate(${position.x}px,${position.y}px)` }}
          src={img}
          className="max-w-[400px] h-[400px] "
          alt="Background"
        />
      </div>
        <button onClick={handleZoomIn } className="bg-cyan-600 py-2 px-1 rounded-md mt-2">zoom in</button>
    </div>
  );
}

export default App;
