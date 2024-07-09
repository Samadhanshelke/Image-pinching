import img from './pexels-jckulkarni-910213.jpg';
import './App.css';
import {  useRef } from "react";
function App() {
  const imageRef = useRef(null)

  const handleTouchStart = ()=>{
    console.log('running');
    alert("handleTouchStart")
  }
const handleTouchMove = ()=>{
  console.log('moving')
  alert("handleTouchMove")
}

const handleTouchEnd = ()=>{
  console.log('touch end')
  alert("handleTouchEnd")
}
  return (
    <div className='flex justify-center items-center h-[100vh]' >
        <div
       
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
         className='h-[400px] w-[400px] border-4 border-red-600    overflow-hidden'>
          <img  ref={imageRef} src={img} className='max-w-[400px] h-[400px] '  alt='Background' />
        </div>
    </div>
  );
}

export default App;
