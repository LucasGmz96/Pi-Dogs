import NavBar from "../../component/NavBar/NavBar"
import{useEffect} from "react"
import { useDispatch} from "react-redux";
import{getAllDogs, getTemperament} from "../../Redux/Actions"
import CardContainer from "../../component/CardContainer/CardContainer"
import styled from "./Home.module.css"


const Home = ()=>{

const dispatch = useDispatch(); //solicito dispatch
    

useEffect(()=> {
    dispatch(getAllDogs())
    dispatch(getTemperament())

}
,[dispatch]);



    

    return (
        <div className={styled.contenedor}>
            <NavBar/>
            <div>
                <CardContainer/>
            </div>
        </div>
    )
}
export default Home;