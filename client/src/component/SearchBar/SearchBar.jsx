import React, { useEffect } from "react";
import {useState} from "react"
import {resetFilter, getNamedDogs } from "../../Redux/Actions";
import { useDispatch } from "react-redux";



const SearchBar = () => {


        


        const dispatch = useDispatch()
        
        const [state, setState] = useState('')
  
        
        const handlerChange = (e) => {
            setState(e.target.value)
        }

        const handlerSubmit = (e) => {
            e.preventDefault()
            dispatch(resetFilter())
            dispatch(getNamedDogs(state))
            setState('')
        }
            return (
            <div>
                <input onChange={handlerChange} type="search" value={state} placeholder='Dog Name...' />
                <button onClick={(e)=>handlerSubmit(e)}>Search</button>
            </div>
        )


  };











export default SearchBar;