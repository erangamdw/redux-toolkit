import React, { useReducer } from 'react'

//component eka rerender wena nisa reducer function eka daanne udin
const reducer = (state:any, action:any)=>{
  if(action.type === 'setImage'){
    return {
      ...state,
      image: action.data
    }
  } else if(action.type === 'setName') {
    return {
      ...state,
      name: action.data
    } 
  } else if(action.type === 'setCity') {
    return {
      ...state,
      city: action.data
    }
  } else if(action.type === 'setPosition') {
    return {
      ...state,
      position: action.data
    }
  }else if(action.type === 'setArray') {
    return {
      ...state,
      dataArray: [...state.dataArray, action.data]
    }
  }
  
  else{
    return state
  }
}

const UseReducerComp = () => {
  const [state, setState] = useReducer(reducer, {
    name: '',
    image:'',
    city:'',
    position:'',
    dataArray:[]
  })

  console.log(state)
  return (
    <div>
      
      <input type="text" value={state.name} placeholder='enter Name' onChange={(e)=> setState({
        type:'setName',
        data:e.target.value
      })}/>
      <input type="text" placeholder='enter image URL' value={state.image} onChange={(e)=> setState({
        type:'setImage',
        data:e.target.value
      })}/>
      <input type="text" value={state.city} onChange={(e)=> setState({
        type:'setCity',
        data: e.target.value
      })} placeholder='enter city'/>
      <input type="text" value={state.posion} onChange={(e)=> setState({
        type:'setPosition',
        data: e.target.value
      })} placeholder='enter posion'/>
      <button  onClick={()=>setState({
        type: 'setArray',
        data: {
          name: state.name,
          image: state.image,
          city: state.image,
          position: state.position
        }
      })}>Set Data</button>
    </div>
  )
}

export default UseReducerComp