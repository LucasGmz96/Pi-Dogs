import React from "react"
import styled from "./Card.module.css"
import { Link } from "react-router-dom"






const Card = ({id, name, temperament, weight, image})=>{

    

    // const dispatch = useDispatch()

    // const handleClick = (id) => {       
    //     dispatch(getDetailDog(id));
      
    return(
        <div className={styled.cardDiv}>
            
            
            <Link to={`/detail/${id}`} >
            
            <img src={image} className={styled.img}/>
            <div className={styled.texto}>
            <h3 className={styled.name}>{name}</h3>
            <h3 className={styled.temp}>{temperament}</h3>
            <h3 className={styled.weight}>{weight}Kg</h3>
            </div>
            </Link>
        </div>
)
}

export default Card