import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';
import MyPromise from './utils/MyPromise';
import {PromiseTest} from './utils/PromiseTest';
import {backpack, RecursionBackpack, runAllTask, inputs, dijkstra, insertSort, mergeSort, quickSort, countSort} from './utils/mianshi';
import {complexNumberMultiply} from './utils';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    class RangeList {
      constructor() {
        this.rangeArr = [];
        this.maxLength = Number.MIN_SAFE_INTEGER;
      }
    
      add(range) {
        // TODO: implement this
        const [start, end] = range;
        if(end > this.maxLength) {
          this.maxLength = end;
          this.rangeArr.length = end;
        }
        for(let i = start; i < end; i++) {
          this.rangeArr[i] = true;
        }
      }
    
      remove(range) {
        // TODO: implement this
        const [start, end] = range;
        // 此处避免浪费空间可以减少数组长度
        for(let i = start; i < end; i++) {
          this.rangeArr[i] = false;
        }
      }
    
      print() {
        // TODO: implement this
        let str = "";
    
        for(let i = 0, j = 0; i <= j && j < this.rangeArr.length;) {
          const start = this.rangeArr[i];
          const end = this.rangeArr[j];
          if(!start && !end) {
            i++;
            j++;
          }else if(start && end){
            if(j === this.rangeArr.length - 1) {
              str += `[${i}, ${j + 1}) `;
            }
            j++;
          }else if(start && !end) {
            str += `[${i}, ${j}) `;
            i = j;
          }
        }
        console.log(str);
        return str;
      }
    }
    
    const rl = new RangeList();
    rl.add([1, 5]); rl.print();
    // Should display: [1, 5)
    rl.add([10, 20]);
    rl.print();
    // Should display: [1, 5) [10, 20)
    rl.add([20, 20]);
    rl.print();
    // Should display: [1, 5) [10, 20)
    rl.add([20, 21]);
    rl.print();
    // Should display: [1, 5) [10, 21)
    rl.add([2, 4]);
    rl.print();
    // Should display: [1, 5) [10, 21)
    rl.add([3, 8]);
    rl.print();
    // Should display: [1, 8) [10, 21)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
