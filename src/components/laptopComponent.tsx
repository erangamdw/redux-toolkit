import React from 'react'
import {useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addLaptop, laptopSliceSelector } from '../store/reducers/laptopSlice';
import { nanoid } from '@reduxjs/toolkit'

const LaptopComponent = () => {

  const laptops = useSelector(laptopSliceSelector)
  const dispatch = useDispatch()
  const price = useRef<HTMLInputElement>(null);
  const cpu = useRef<HTMLInputElement>(null);
  const gen = useRef<HTMLInputElement>(null);
  const ram = useRef<HTMLInputElement>(null);
  const hdd = useRef<HTMLInputElement>(null);

  const addLaptopHandler = () => {
    const newLaptop = {
      id: nanoid(),
      price: parseInt(price.current?.value || "0"),
      specs: {
        cpu: cpu.current?.value ?? "",
        gen: parseInt(gen.current?.value || "0"), // Parse gen as an integer
        ram: ram.current?.value ?? "",
        hdd: hdd.current?.value ?? "",
      },
    };
  
    if (
      newLaptop.price !== undefined &&
      newLaptop.specs.cpu !== undefined &&
      !isNaN(newLaptop.specs.gen) && // Check if gen is a valid number
      newLaptop.specs.ram !== undefined &&
      newLaptop.specs.hdd !== undefined
    ) {
      dispatch(addLaptop(newLaptop));
    } else {
      // Handle the case when any of the values are missing or invalid
      console.log('Please enter all the laptop details.');
    }
  };
  
  

  return (
    <div>
        <div>
            <h4>Add laptop</h4>
            <input ref={price} type="text" placeholder='Enter price' />
            <input ref={cpu} type="text" placeholder='Enter CPU' />
            <input ref={gen} type="text" placeholder='Enter Gen' />
            <input ref={ram} type="text" placeholder='Enter RAM' />
            <input ref={hdd} type="text" placeholder='Enter HDD' />
            <button onClick={addLaptopHandler}>Add laptop</button>
        </div>
        {laptops.map((laptop:any)=>(
            <div key={laptop.id}>
                <p>{laptop.price}</p>
                <p>{laptop.specs.cpu}</p>
                <p>{laptop.specs.gen}</p>
                <p>{laptop.specs.ram}</p>
                <p>{laptop.specs.hdd}</p>
            </div>
        ))}
    </div>
  )
}

export default LaptopComponent