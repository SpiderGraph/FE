import { Graph, ActionTypes, GraphActionTypes } from "./types";


// for actions we need to type out its  parameters, and specify the return value
 
export function createGraphStart(): GraphActionTypes{
    return {
        type: ActionTypes.CREATE_GRAPH_START,
    }
}

export function createGraphSuccess(): GraphActionTypes{
    return{
        type: ActionTypes.CREATE_GRAPH_SUCCESS,
    }
}

export function createGraphFailure(err: string):GraphActionTypes{
    return{
        type: ActionTypes.CREATE_GRAPH_FAILURE,
        payload: err
    }
}

// GRAPH RETRIEVAL 
export function getGraphsStart(): GraphActionTypes{
    return {
        type: ActionTypes.GET_GRAPHS_START,
    }
}

export function getGraphsSuccess(graphs: Graph[]): GraphActionTypes{
    return {
        type: ActionTypes.GET_GRAPHS_SUCCESS,
        payload: graphs
    }
}

export function getGraphsFailure(err: string): GraphActionTypes{
    return{
        type: ActionTypes.GET_GRAPHS_FAILURE,
        payload: err
    }
}