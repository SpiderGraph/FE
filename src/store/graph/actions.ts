import { Graph, CreateGraphAction, ActionTypes } from "./types";



export function createGraph(graph: Graph): CreateGraphAction{
    return {
        type: ActionTypes.CREATE_GRAPH,
        payload: graph
    }
}