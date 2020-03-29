import { Graph, ActionTypes, GraphActionTypes } from "./types";


// for actions we need to type out its  parameters, and specify the return value
 
export function createGraph(graph: Graph): GraphActionTypes{
    return {
        type: ActionTypes.CREATE_GRAPH,
        payload: graph
    }
}