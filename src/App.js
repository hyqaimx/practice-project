import logo from './logo.svg';
import './App.css';
import { maxValue1 } from './utils';
import { useEffect, useState } from 'react/cjs/react.development';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const data = maxValue1([7,1,3,6,3,5]);
    console.log(data);
    // for(let i = 0; i < 5; i++) {
    //   setTimeout(() => {
    //     setCount((prev) => {
    //       return prev + 1;
    //     });
    //     console.log(count);
    //   }, i * 1000);
    // }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
