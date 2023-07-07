import { GET_ALLDOGS, GET_NAMEDOGS, GET_DETAILDOG, DETAIL_REMOVE, FILTER_DOGS, GET_TEMPERAMENT, RESET_FILTER} from "./Actions";

const initialState = { 
    dogis: [],
    dogisName: [],
    dogisId: [],
    temperaments: [],
    filterDogs:{ db: "all", temperament: "all", sort: "default", type: "name" }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALLDOGS:
            return {...state, dogis: action.payload }
            
        case GET_NAMEDOGS:
            return {...state, dogis: action.payload }
            
        case GET_DETAILDOG:
            return {...state, dogisId: action.payload }

        case DETAIL_REMOVE:
            return {...state, dogisId: action.payload }
        
        case FILTER_DOGS:
            return {...state, filterDogs: action.payload }

        case GET_TEMPERAMENT:
            return {...state, temperaments: action.payload }

        case RESET_FILTER:
            return {...state, filterDogs: action.payload } 


        default:
            return state
    }
}


export default reducer;