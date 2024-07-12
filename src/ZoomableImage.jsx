import  { useEffect, useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);  // store the distance betn two touch point

  const [position, setPosition] = useState({ x: 0, y: 0 });    // position of the img
  
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });


  const handleTouchStart = (event) => {    // set the initial position of two finger touch
    // console.log(event.touches[0], event.touches[1])
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    } else if (event.touches.length === 1) {
      setInitialTouchPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      });
      setInitialPosition(position);
     console.log(position,event.touches[0].clientX,event.touches[0].clientY)
    }
  };

  const handleTouchMove = (event) => {  // called when finger move on the screen  
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
      }
    } else if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - initialTouchPosition.x;   //Calculates how much the finger has moved horizontally.
      const deltaY = event.touches[0].clientY - initialTouchPosition.y; //  Calculates how much the finger has moved vertically.

      console.log('moving')
      const container = containerRef.current;
      const img = imgRef.current;

      if (container && img) {
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        let newX = initialPosition.x + deltaX;
        let newY = initialPosition.y + deltaY;

        const maxLeft = containerRect.width - imgRect.width;
        const maxTop = containerRect.height - imgRect.height;
         console.log(containerRect.width,imgRect.width)
        newX = Math.min(0, Math.max(newX, maxLeft));
        newY = Math.min(0, Math.max(newY, maxTop));

        setPosition({ x: newX, y: newY });
      }
    }
  };

  useEffect(()=>{
    if(zoom < 1){
  console.log('zoom',zoom)
  setPosition(
    { x: 0, y: 0 }
  )
  setZoom(1)
}
  },[zoom,position])

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

 

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '350px',
    height: '350px',
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    border:'4px solid blue'
  };

  const imgStyle = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    transition: 'width 0.2s, height 0.2s, transform 0.2s',
  };
  const handleZoomIn = ()=>{
    setZoom((preValue)=> preValue * 1.2)
  }
  const handleZoomOut = ()=>{
    setZoom((preValue)=> preValue * 0.9)
  }

  const handlePanLeft = ()=>{
    setPosition({
      x:position.x + 5,
      y:position.y + 5,

    })
  }

 

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
    <div className='flex gap-4 mt-4 ms-8'>
      <button className='bg-white text-black p-2' onClick={handleZoomIn}>
        zoom in
      </button>
      <button className='bg-white text-black p-2' onClick={handleZoomOut}>
        zoom out
      </button>

      <button className='bg-white text-black p-2' onClick={handlePanLeft}>
        Left
      </button>

    </div>
     </main>
  

  );
};

export default ZoomableImage;