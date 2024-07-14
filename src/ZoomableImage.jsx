import { useEffect, useRef, useState } from 'react';

const ZoomableImage = ({ src }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  // const positionRef = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [initialDistance, setInitialDistance] = useState(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialTouchPosition, setInitialTouchPosition] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      const distance = getDistance(event.touches[0], event.touches[1]);
      setInitialDistance(distance);
    } else if (event.touches.length === 1) {
      setInitialTouchPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      });
      setInitialPosition(position);
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2) {
      const currentDistance = getDistance(event.touches[0], event.touches[1]);
      if (initialDistance) {
        const scale = currentDistance / initialDistance;
        if (scale > 1) {
          // Zoom in
          setZoom((prevZoom) => Math.min(3, prevZoom + 0.2));
        } else {
          // Zoom out
          setZoom((prevZoom) => Math.max(1, prevZoom - 0.2));
        }
      }
    } else if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - initialTouchPosition.x;
      const deltaY = event.touches[0].clientY - initialTouchPosition.y;

      const container = containerRef.current;
      const img = imgRef.current;

      if (container && img) {
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        let newX = initialPosition.x + deltaX;
        let newY = initialPosition.y + deltaY;

        const maxLeft = containerRect.width - imgRect.width;
        const maxTop = containerRect.height - imgRect.height;

        newX = Math.min(0, Math.max(newX, maxLeft));
        newY = Math.min(0, Math.max(newY, maxTop));

        setPosition({ x: newX, y: newY });
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

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (container && img) {
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

     
        let newX = position.x;
        let newY = position.y;

        const maxLeft = containerRect.width - imgRect.width;
        const maxTop = containerRect.height - imgRect.height;

        newX = Math.min(0, Math.max(newX, maxLeft));
        newY = Math.min(0, Math.max(newY, maxTop));
        console.log(maxLeft)
        setPosition({ x: newX, y: newY });
       
     
    }
  //  console.log(img.getBoundingClientRect().width)
  
   
  }, [position]);

  
  
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '350px',
    height: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid red'
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

  const handleZoomIn = () => {
    if(zoom > 3){
      setZoom(3)
    }else{
      setZoom((pre)=>{
        return pre + 0.2
      })
    }

  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = Math.max(prevZoom * 0.9, 1);
      if (newZoom === 1) {
        // Reset position to center when zoomed out completely
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

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
          Zoom In
        </button>
        <button className='bg-white text-black p-2' onClick={handleZoomOut}>
          Zoom Out
        </button>
        <span>{zoom}</span>
      </div>
    </main>
  );
};

export default ZoomableImage;
