
// Graph`s state
export type GraphState = {
    graphs: Graph[],
    filteredGraphs: Graph[],
    loading: boolean,
    error: string, 
}

export type Graph = {
    _id?: string,
    graphName: string,
    dataSets?: DataSet[],
    legs: Leg[],
    date?: Date,
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

    DELETE_GRAPH_START = 'DELETE_GRAPH_START',
    DELETE_GRAPH_SUCCESS = 'DELETE_GRAPH_SUCCESS',
    DELETE_GRAPH_FAILURE = 'DELETE_GRAPH_FAILURE',

    UPDATE_GRAPH_START = 'UPDATE_GRAPH_START',
    UPDATE_GRAPH_SUCCESS = 'UPDATE_GRAPH_SUCCESS',
    UPDATE_GRAPH_FAILURE = 'UPDATE_GRAPH_FAILURE',

    FILTER_GRAPHS = "FILTER_GRAPHS"
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
    payload: Graph
}

export type CreateGraphFailure = {
    type: ActionTypes.CREATE_GRAPH_FAILURE,
    payload: string,
}

// GRAPH DELETION
export type DeleteGraphStart = {
    type: ActionTypes.DELETE_GRAPH_START,
}

export type DeleteGraphSuccess = {
    type: ActionTypes.DELETE_GRAPH_SUCCESS,
    payload: string,
}

export type DeleleGraphFailure = {
    type: ActionTypes.DELETE_GRAPH_FAILURE,
    payload: string
}

// GRAPH UPDATE

export type UpdateGraphStart = {
    type: ActionTypes.UPDATE_GRAPH_START,
}

export type UpdateGraphSuccess = {
    type: ActionTypes.UPDATE_GRAPH_SUCCESS,
    payload: {
        id: string,
        body: Graph
    }
}

export type UpdateGraphFailure = {
    type: ActionTypes.UPDATE_GRAPH_FAILURE,
    payload: string,
}

// FILTER GRAPHS

export type FilterGraphs = {
    type: ActionTypes.FILTER_GRAPHS,
    payload: Graph[]
}

export type GraphActionTypes = 
    | GetGraphsStart
    | GetGraphsSuccess
    | GetGraphsFailure

    | CreateGraphStart
    | CreateGraphSuccess
    | CreateGraphFailure

    | DeleteGraphStart
    | DeleteGraphSuccess
    | DeleleGraphFailure

    | UpdateGraphStart
    | UpdateGraphSuccess
    | UpdateGraphFailure

    | FilterGraphs