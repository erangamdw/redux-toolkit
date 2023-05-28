import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import { decrement, increment, numberSliceSelector } from './store/reducers/numberSlice';
import LaptopComponent from './components/laptopComponent';


function App() {
  const numberSelector = useSelector(numberSliceSelector)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <h1>{numberSelector.number}</h1>
      <div>
        <button onClick={()=>dispatch(increment(1))}>Increment</button>
        <button onClick={()=>dispatch(decrement(1))}>Decrement</button>
      </div>
      <br />
      <div>
        <LaptopComponent/>
      </div>
    </div>
  );
}

export default App;
