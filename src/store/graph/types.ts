
// Graph`s state
export type GraphState = {
    graphs: Graph[]
}

export type Graph = {
    graphId: number,
    graphName: string,
    legs: Leg[]
}

export type Leg = {
    legId: number,
    legName: string,
    rotation: number,
    points: Point[]
}

export type Point = {
    pointId: number,
    pointName: string,
    completed: boolean,
}

// Types for graph component

export enum ActionTypes {
    GET_GRAPHS = 'GET_GRAPHS',
    CREATE_GRAPH = 'CREATE_GRAPH',
    DELTE_GRAPH = 'DELETE_GRAPH',

    CREATE_LEG = 'CREATE_LEG',
    DELETE_LEG = 'DELETE_LEG',

    CREATE_POINT = 'CREATE_POINT',
    DELETE_POINT = 'DELETE_POINT',
}

export type GetGraphsAction = {
    type: ActionTypes.CREATE_GRAPH,
}

export type CreateGraphAction = {
    type: ActionTypes.CREATE_GRAPH,
    payload: Graph
}

export type DeleteGraphAction = {
    type: ActionTypes.DELTE_GRAPH,
    payload: number
}

export type GraphActionTypes = 
    | GetGraphsAction
    | CreateGraphAction 
    | DeleteGraphAction
