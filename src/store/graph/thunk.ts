import { Graph } from "./types";
import { AppThunk } from "..";
import { createGraphSuccess, createGraphStart, getGraphsStart, getGraphsSuccess, getGraphsFailure, createGraphFailure, deleteGraphStart, deleteGraphSuccess, deleteGraphFailure, updateGraphStart, updateGraphSuccess, updateGraphFailure } from "./actions";
import axios from 'axios'



export const thunkCreateGraph = (graph: Graph): AppThunk => dispatch => {
    dispatch(createGraphStart())
    axios.post(`https://spider-graph-be.herokuapp.com/graphs`, graph)
    .then(res => dispatch(createGraphSuccess()))
    .catch(err => dispatch(createGraphFailure(err)))
}

// GRAPH RETRIEVAL 

export const thunkGetGraphs = (): AppThunk => dispatch => {
    dispatch(getGraphsStart)
    axios.get('https://spider-graph-be.herokuapp.com/graphs')
    .then(res => dispatch(getGraphsSuccess(res.data)))
    .catch(err => dispatch(getGraphsFailure(err)))
}

// GRAPH DELETEION

export const thunkDeleteGraph = (id: string): AppThunk => dispatch => {
    dispatch(deleteGraphStart)
    axios.delete(`https://spider-graph-be.herokuapp.com/graphs/${id}`)
    .then(res => dispatch(deleteGraphSuccess(id)))
    .catch(err => dispatch(deleteGraphFailure(err)))
}

// GRAPH UPDATE

export const thunkUpdateGraph = (id: string, graph: Graph): AppThunk => dispatch => {
    dispatch(updateGraphStart)
    axios.put(`https://spider-graph-be.herokuapp.com/graphs/${id}`, graph)
    .then(res => dispatch(updateGraphSuccess))
    .catch(err => dispatch(updateGraphFailure(err)))
}