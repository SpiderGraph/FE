
// Graph`s state
export type GraphState = {
    graphs: Graph[],
    loading: boolean,
    error: string,
}

export type Graph = {
    _id?: string,
    graphName: string,
    dataSets?: DataSet[],
    legs: Leg[]
}

export type Leg = {
    _id?: string,
    legName: string,
    rotation: number | undefined,
    points: Point[]
}

export type DataSet = {
    _id?: string,
    radius?: number[],
    dataSetName: string,
    points: string,
    color: string,
}

export type Point = {
    _id?: string,
    pointName: string,
}

// Types for graph component

export enum ActionTypes {
    GET_GRAPHS_START = 'GET_GRAPHS_START',
    GET_GRAPHS_SUCCESS = 'GET_GRAPHS_SUCCESS',
    GET_GRAPHS_FAILURE = 'GER_GRAPHS_FAILURE',

    CREATE_GRAPH_START = 'CREATE_GRAPH_START',
    CREATE_GRAPH_SUCCESS = 'CREATE_GRAPH_SUCCESS',
    CREATE_GRAPH_FAILURE = 'CREATE_GRAPH_FAILURE',

    DELTE_GRAPH = 'DELETE_GRAPH',

    CREATE_LEG = 'CREATE_LEG',
    DELETE_LEG = 'DELETE_LEG',

    CREATE_POINT = 'CREATE_POINT',
    DELETE_POINT = 'DELETE_POINT',
}

// GRAPH RETRIEVAL 
export type GetGraphsStart = {
    type: ActionTypes.GET_GRAPHS_START,
}

export type GetGraphsSuccess = {
    type: ActionTypes.GET_GRAPHS_SUCCESS,
    payload: Graph[]
}

export type GetGraphsFailure = {
    type: ActionTypes.GET_GRAPHS_FAILURE,
    payload: string
}

// GRAPH CREATION
export type CreateGraphStart = {
    type: ActionTypes.CREATE_GRAPH_START,
}

export type CreateGraphSuccess = {
    type: ActionTypes.CREATE_GRAPH_SUCCESS,
}

export type CreateGraphFailure = {
    type: ActionTypes.CREATE_GRAPH_FAILURE,
    payload: string,
}

// GRAPH DELETION
export type DeleteGraphAction = {
    type: ActionTypes.DELTE_GRAPH,
    payload: number
}

export type GraphActionTypes = 
    | GetGraphsStart
    | GetGraphsSuccess
    | GetGraphsFailure

    | CreateGraphStart
    | CreateGraphSuccess
    | CreateGraphFailure
    | DeleteGraphAction
