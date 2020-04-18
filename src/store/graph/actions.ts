import { Graph, ActionTypes, GraphActionTypes, FilterGraphs } from "./types";


// for actions we need to type out its  parameters, and specify the return value
 
export function createGraphStart(): GraphActionTypes{
    return {
        type: ActionTypes.CREATE_GRAPH_START,
    }
}

export function createGraphSuccess(graph: Graph): GraphActionTypes{
    return{
        type: ActionTypes.CREATE_GRAPH_SUCCESS,
        payload: graph
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

// GRAPH DELETEION

export function deleteGraphStart(): GraphActionTypes{
    return{
        type: ActionTypes.DELETE_GRAPH_START,
    }
}

export function deleteGraphSuccess(id: string): GraphActionTypes{
    return{
        type: ActionTypes.DELETE_GRAPH_SUCCESS,
        payload: id
    }
}

export function deleteGraphFailure(err: string): GraphActionTypes{
    return{
        type: ActionTypes.DELETE_GRAPH_FAILURE,
        payload: err
    }
}

// UPDATE GRAPH

export function updateGraphStart(): GraphActionTypes {
    return{
        type: ActionTypes.UPDATE_GRAPH_START
    }
}

export function updateGraphSuccess(id: string, graph: Graph): GraphActionTypes{
    return{
        type: ActionTypes.UPDATE_GRAPH_SUCCESS,
        payload: {
            id: id,
            body: graph
        }
    }
}

export function updateGraphFailure(err: string): GraphActionTypes{
    return{
        type: ActionTypes.UPDATE_GRAPH_FAILURE,
        payload: err
    }
}

// filter graphs 

export function filterGraphs(graphs: Graph[]): FilterGraphs{
    return{
        type: ActionTypes.FILTER_GRAPHS,
        payload: graphs
    }
}