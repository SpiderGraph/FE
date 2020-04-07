import { Graph } from "./types";
import { AppThunk } from "..";
import { createGraphSuccess, createGraphStart, getGraphsStart, getGraphsSuccess, getGraphsFailure, createGraphFailure } from "./actions";
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