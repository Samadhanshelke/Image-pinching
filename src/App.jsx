import img from './pexels-jckulkarni-910213.jpg';
import './App.css';

function App() {
  return (
    <div className='flex justify-center items-center h-[100vh]' >
        <div className='h-[400px] w-[400px] border-4 border-red-600    overflow-hidden'>
          <img src={img} className='max-w-[400px] h-[400px]'  alt='Background' />
        </div>
    </div>
  );
}

export default App;
