// Reducers for graph component

import { GraphState, ActionTypes, GraphActionTypes } from "./types"

const initialState: GraphState = {
    graphs: [],
    loading: false,
    error: ''
}

export function graphReducer(state = initialState, action: GraphActionTypes){
    switch(action.type){
        case ActionTypes.CREATE_GRAPH_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.CREATE_GRAPH_SUCCESS:
            return{
                ...state,
                loading: false
            }
        case ActionTypes.CREATE_GRAPH_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        // GRAPHS RETRIEVAL
        case ActionTypes.GET_GRAPHS_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.GET_GRAPHS_SUCCESS:
            return{
                ...state,
                graphs: action.payload,
                loading: false
            }
        case ActionTypes.GET_GRAPHS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: 
            return state
    }
}
