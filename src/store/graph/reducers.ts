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
                graphs: [...state.graphs, action.payload],
                error: '',
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
                error: '',
                graphs: action.payload,
                loading: false
            }
        case ActionTypes.GET_GRAPHS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        // GRAPH DELETION
        case ActionTypes.DELETE_GRAPH_FAILURE: 
            return {
                ...state,
                loading: true,
            }
        case ActionTypes.DELETE_GRAPH_SUCCESS:
            let deleteGraph = state.graphs.filter(graph => graph._id !== action.payload)
            return {
                ...state,
                graphs: deleteGraph,
                loading: false,
                error: ''
            }
        case ActionTypes.DELETE_GRAPH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        // GRAPH UPDATE
        case ActionTypes.UPDATE_GRAPH_START:
            return{
                ...state,
                loading: true,
            }
        case ActionTypes.UPDATE_GRAPH_SUCCESS:
            let updateGraph = state.graphs.map(graph => {
                if(graph._id === action.payload.id) {
                    return action.payload.body
                }else{
                    return graph
                }
            })
            return{
                ...state,
                graphs: updateGraph,
                loading: false,
                error: '',
            }
        case ActionTypes.UPDATE_GRAPH_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}
