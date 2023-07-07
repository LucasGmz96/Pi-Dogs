import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterDogs } from "../../Redux/Actions"
import { resetFilter } from "../../Redux/Actions"
import styled from "./FilterBar.module.css"




const FilterBar = () => {

    const dispatch = useDispatch()
    const temperamentsAll = useSelector(state => state.temperaments)


   

    const [temperaments, setTemperaments] = useState([])

    const [filter, setFilter] = useState({
        db: "all",
        temperament: "all",
        sort: "default",
        type: "name"
    })

    useEffect( () => {
        setTemperaments(temperamentsAll)

    },[temperamentsAll])


    const filterHandler = (e) => {
        const {name, value} = e.target
        setFilter({...filter, [name]: value})
        dispatch(filterDogs({...filter, [name]: value}))
    }

    const handlerReset = () => {

        setFilter({ 
            db: "all",
            temperament: "all",
            sort: "default",
            type: "name" })
        dispatch(resetFilter())

    }


  

    return (
        <div className={styled.contenedor}>
            <div>
                <select name="temperament" value={filter.temperament} onChange={filterHandler}>
                    <option value="all">All</option>
                    {
                        temperaments.map((e,i) => (
                            <option key={i} value={e.name}>{e.name}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <select name="db" value={filter.db} onChange={filterHandler}>
                    <option value="all">All</option>
                    <option value="api">Api</option>
                    <option value="db">DataBase</option>
                </select>
            </div>

            <div>
                <select name="sort" value={filter.sort} onChange={filterHandler}>
                    <option value="default">Default</option>
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
                </select>
            </div>

            <div>
                <select name="type" value={filter.type} onChange={filterHandler}>
                    <option value="name">Name</option>
                    <option value="weight">Weight</option>
                </select>
            </div>       
            <div>
                <button onClick={handlerReset}>Reset</button>
            </div>

        </div>
    )
}

export default FilterBar