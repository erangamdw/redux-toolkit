import React, { useRef } from 'react';
import { Dispatch } from 'redux';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import { decrement, increment, numberSliceSelector } from './store/reducers/numberSlice';
import LaptopComponent from './components/laptopComponent';
import { getPosts, selectAll, selectIds, selectPostLoading, updatePost } from './store/reducers/postSlice';
import { increment2, number2Selector } from './store/reducers/number2Slice';
import Post from './components/post';
import {getUsers} from './store/reducers/userSlice'
import UseReducerComp from './components/useReducer';


function App() {
  const postTitleRef = useRef<HTMLInputElement | null>(null);
  const postIdRef = useRef<HTMLInputElement | null>(null);
  const numberSelector = useSelector(numberSliceSelector)
  // const postsObj = useSelector(selectAllPosts)
  const postLoading = useSelector(selectPostLoading)
  const number2: number = useSelector(number2Selector);
  // const selectPost = useSelector(selectAll)

  //mehema karanne usememo eka wenuwata (components memorize karaganna)
  const selectPost = useSelector(selectIds)

  const dispatch: Dispatch<any> = useDispatch();
  console.log(selectPost)

  // console.log(postsObj)
  
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
      {postLoading !== 'completed' && <h1>Loading...</h1>}
      <button onClick={() => dispatch(getPosts())}>Get Posts Data</button>
      <button onClick={() => dispatch(getUsers())}>Get Users Data</button>
      <br></br> <hr />
        <h1>{number2}</h1>
        <button onClick={() => dispatch(increment2({name:'test', value: 1}))}>Increment</button>
        <hr />

        <h1>Change post</h1>
        <input placeholder='Post title' ref={postTitleRef} /> <br />
        <input type="text" placeholder='post Id' ref={postIdRef} /> <br />

        <button onClick={()=>{dispatch(updatePost({
          id: Number(postIdRef.current?.value), changes: {title: postTitleRef.current?.value}
        }))}}>Submit</button>

        {/* {selectPost.map((post)=> <Post key={post.id} ele={post}/>)}  */}
        {selectPost.map((postId) => <Post key={postId} postId={postId} />)}
      </div>
      <hr /><hr /><hr /><hr />
      <UseReducerComp/>
    </div>
  );
}

export default App;
