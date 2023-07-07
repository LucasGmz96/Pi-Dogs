import NavBar from "../../component/NavBar/NavBar"
import { useSelector } from 'react-redux'
import {detailRemove, getDetailDog} from '../../Redux/Actions'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import styled from './Detail.module.css'

const Detail = (props) => {

    const dispatch = useDispatch()

    const id = props.match.params.id
        
    
    console.log(props,"gol")

    const dogisId = useSelector(state => state.dogisId)

    useEffect(() => {
        dispatch(getDetailDog(id))
        return (()=> {
            dispatch(detailRemove([]))
        })
    },[id])


    return (
        <div className={styled.contenedor}>
            <NavBar />
            <div className={styled.divContenedor}>
                        <div>
                            <img src={dogisId.image} alt={dogisId.id} width="400" height="300" className={styled.image} />
                        </div>
                        <div className={styled.info}>
                                <h1>{dogisId.name}</h1>
                                <p> Weigth: {dogisId.weight} Kg</p>
                                <p> Height: {dogisId.height} Cm</p>
                                <p> Life Span: {dogisId.life_span} years </p>
                                <p> Temperament: {dogisId.temperament}</p>
                        </div>
            </div>
        </div>
    )
}
export default Detail;