import React from 'react';
import { Dispatch } from 'redux';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import { decrement, increment, numberSliceSelector } from './store/reducers/numberSlice';
import LaptopComponent from './components/laptopComponent';
import { getPosts, selectAllPosts } from './store/reducers/postSlice';



function App() {
  const numberSelector = useSelector(numberSliceSelector)
  const postsObj = useSelector(selectAllPosts)
  const dispatch: Dispatch<any> = useDispatch();

  console.log(postsObj)
  
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
      <div>
      {postsObj.loading !== 'completed' && <h1>Loading...</h1>}
      <button onClick={() => dispatch(getPosts())}>Get Posts Data</button>
      </div>
    </div>
  );
}

export default App;
