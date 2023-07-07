import axios from 'axios';

export const GET_ALLDOGS = 'GET_ALLDOGS';
export const GET_NAMEDOGS = 'GET_NAMEDOGS';
export const GET_DETAILDOG = 'GET_DETAILDOG';
export const DETAIL_REMOVE = 'DETAIL_REMOVE';
export const FILTER_DOGS = 'FILTER_DOGS';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const RESET_FILTER = 'RESET_FILTER';
export const POST_PAGO = 'POST_PAGO';
export const GET_PAGO = 'GET_PAGO';






export function getAllDogs() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/dogs')
       return dispatch({
            type: GET_ALLDOGS,
            payload: json.data 
    })
    }
}

export function getNamedDogs(name) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
       return dispatch({
            type: GET_NAMEDOGS,
            payload: json.data
    })
    }
}

export function getDetailDog(id) {
    return async function(dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type : GET_DETAILDOG,
            payload: json.data
            
    })
}}

export function detailRemove(payload) {
    return {
        type : DETAIL_REMOVE,
        payload: payload
    }
}

export function filterDogs(payload){
    return {
        type : FILTER_DOGS,
        payload: payload
    }

}

export function getTemperament() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
        type: GET_TEMPERAMENT,
        payload: json.data
        })   
}}

export function resetFilter() {
    return {
        type: RESET_FILTER,
        payload: { db: "all", temperament: "all", sort: "default", type: "name" }
    }
}


export function postPago() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/pago')
       return dispatch({
            type: POST_PAGO,
            payload: json.data 
})
}
}

export function getPago() {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/pago')
       return dispatch({
            type: GET_PAGO,
            payload: json.data 
    })
    }
}