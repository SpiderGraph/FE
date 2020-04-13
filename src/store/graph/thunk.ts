import { Graph } from "./types";
import { AppThunk } from "..";
import { createGraphSuccess, createGraphStart, getGraphsStart, getGraphsSuccess, getGraphsFailure, createGraphFailure, deleteGraphStart, deleteGraphSuccess, deleteGraphFailure, updateGraphStart, updateGraphSuccess, updateGraphFailure } from "./actions";
import { axiosWithAuth } from "../../utils/authWithAxios";



export const thunkCreateGraph = (graph: Graph): AppThunk => dispatch => {
    dispatch(createGraphStart())
    axiosWithAuth()
        .post(`/graphs`, graph)
        .then(res => {
            let newGraph:Graph = res.data
            dispatch(createGraphSuccess(newGraph))
        })
        .catch(err => dispatch(createGraphFailure(err)))
}

// GRAPH RETRIEVAL 

export const thunkGetGraphs = (): AppThunk => dispatch => {
    dispatch(getGraphsStart)
    axiosWithAuth()
        .get('/graphs')
        .then(res => dispatch(getGraphsSuccess(res.data)))
        .catch(err => dispatch(getGraphsFailure(err)))
}

// GRAPH DELETEION

export const thunkDeleteGraph = (id: string): AppThunk => dispatch => {
    dispatch(deleteGraphStart)
    axiosWithAuth()
        .delete(`/graphs/${id}`)
        .then(res => dispatch(deleteGraphSuccess(id)))
        .catch(err => dispatch(deleteGraphFailure(err)))
}

// GRAPH UPDATE

export const thunkUpdateGraph = (id: string, graph: Graph): AppThunk => dispatch => {
    dispatch(updateGraphStart)
    axiosWithAuth()
        .put(`/graphs/${id}`, graph)
        .then(res => dispatch(updateGraphSuccess(id, graph)))
        .catch(err => dispatch(updateGraphFailure(err)))
}