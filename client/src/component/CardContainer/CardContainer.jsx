import Card from "../Card/Card"
import { useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import styled from "./CardContainer.module.css"
import { getAllDogs, filterDogs } from "../../Redux/Actions"
import { FaArrowLeft, FaArrowRight  } from "react-icons/fa";
import Paginado  from "../Paginado/Paginado"
import FilterBar from "../FilterBar/FilterBar"



const CardContainer = ()=>{
    


    const dogis = useSelector(state => state.dogis)
    const filterDogs = useSelector(state => state.filterDogs)
    const [dogsAll, setDogsAll] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState(8)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogs())
    },[])


    useEffect( () => {
            const filDB = filterDB(dogis, filterDogs.db)

            const filTemp = filterTemperaments(filDB, filterDogs.temperament)

            const filOrder = createSort(filTemp, filterDogs)

            setDogsAll(filOrder)
            setCurrentPage(1)
        },[filterDogs,dogis])




    //paginado
   
    const finalDog = currentPage * items
    const firstDog = finalDog - items
    const pageDog = dogsAll.slice(firstDog, finalDog)

    const cantidadPage = Math.ceil(dogsAll.length / items)

    const paginado = (pagina) =>{
        setCurrentPage(pagina)
    }
    

    //filtros
    const filterTemperaments = (data, filter) => {
        const newDogsFilter     = [...data];
        if(filter === "all"){
            return newDogsFilter;
        }
        const newDogsContains = newDogsFilter.filter(d => {
            if(d.temperament?.includes(filter)){
                return true
            } else {
                return false
            }
        })
        return newDogsContains;
    }

    const filterDB = (data, filter) => {
        
        let newDogFilter = []
        switch(filter){
            case "api":
                newDogFilter = [...data].filter(e => !!Number(e.id))
                return newDogFilter;
                case "db":
                    newDogFilter = [...data].filter(e => !Number(e.id))
                return newDogFilter;
            default:
                return data;
                
            } 
            
              
    }

    // Funcion para ordenar por nombre o por peso
    const createSort = (data, orderBy) => {
        const sortDogsAll = [...data]
        switch (orderBy.sort){
            case "asc":
                sortDogsAll.sort( (a,b) => {
                    if((a[orderBy.type].toLowerCase()) > (b[orderBy.type].toLowerCase())){
                        return 1
                    }                        
                    if((a[orderBy.type].toLowerCase()) < (b[orderBy.type].toLowerCase())){
                        return -1
                    }
                    return 0
                });
                return sortDogsAll
            case "desc":
                console.log(sortDogsAll);
                sortDogsAll.sort( (a,b) => {
                    if((a[orderBy.type].toLowerCase()) > (b[orderBy.type].toLowerCase())){
                        return -1
                    }                        
                    if((a[orderBy.type].toLowerCase()) < (b[orderBy.type].toLowerCase())){
                        return 1
                    }
                    return 0
                });
                return sortDogsAll
            default:
                return sortDogsAll
        }
    }





    
    return(
        <div className="card-container" >
            <FilterBar/>
            <div className={styled.cardDiv}>
                {
                pageDog && pageDog.map((dog,index) => (
                    <Card 
                    key={index}
                    id={dog.id}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    image={dog.image}
                    />))
                    
                }
             
            </div>

                <div className={styled.divPaginado}>

                    <div onClick={()=>currentPage >= cantidadPage ? paginado(1): paginado(currentPage + 1 )}><FaArrowRight /></div>

                    <Paginado className={styled.paginado}
                        items = {items}
                        dogsAll = {dogsAll.length}
                        paginado = {paginado}/>

                    <div onClick={()=>currentPage <= 1 ? paginado(cantidadPage): paginado(currentPage - 1 )}><FaArrowLeft /></div>


                

                </div>
               

        </div>
    )
}

export default CardContainer