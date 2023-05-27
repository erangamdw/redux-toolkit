import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import { decrement, increment } from './store/reducers/numberSlice';

function App() {
  const number = useSelector((store:any)=>store.numberSlice.number)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <h1>{number}</h1>
      <div>
        <button onClick={()=>dispatch(increment(1))}>Increment</button>
        <button onClick={()=>dispatch(decrement(1))}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
