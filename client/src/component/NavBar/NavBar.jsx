import {Link} from "react-router-dom"
import styled from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar"
import {getAllDogs, resetFilter} from "../../Redux/Actions"
import { useDispatch } from "react-redux"


const Navbar = () => {

const dispatch = useDispatch()

const reset = () => {
    dispatch(getAllDogs())
    dispatch(resetFilter())}


//Codigo mercadoPago







return (
    <div className={styled.NavBar}>
        <div className={styled.div}>
            <h2 >
                <Link to= "/Home" className={styled.home} onClick={reset}>Home Dogs</Link>
            </h2>
            <h2>
                <Link to= "/Create" className={styled.create} >Create</Link>
            </h2>                       
        </div>
        <div className={styled.divSearch}>
             <SearchBar className={styled.searchBar}/>
        </div>
       
        
    </div>
)
}

export default Navbar;