import  { useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);  // store the distance betn two touch point

  


  const handleTouchStart = (event) => {    // set the initial position of two finger touch
    console.log(event.touches[0], event.touches[1])
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    } 
  };

  const handleTouchMove = (event) => {  // called when finger move on the screen  
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * scale, 3)));
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

 

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '350px',
    height: '350px',
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    border:'4px solid red'
  };

  const imgStyle = {
    position: 'absolute',
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    transition: 'width 0.2s, height 0.2s, transform 0.2s',
  };

  return (
     
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
      
  

  );
};

export default ZoomableImage;