import { Graph } from "./types";
import { AppThunk } from "..";
import { createGraphSuccess, createGraphStart, getGraphsStart, getGraphsSuccess, getGraphsFailure, createGraphFailure, deleteGraphStart, deleteGraphSuccess, deleteGraphFailure, updateGraphStart, updateGraphSuccess, updateGraphFailure } from "./actions";
import { axiosWithAuth } from "../../utils/authWithAxios";
import {AxiosResponse, AxiosError} from 'axios'
import {History} from 'history'

export const thunkCreateGraph = (graph: Graph, history: History): AppThunk => dispatch => {
    dispatch(createGraphStart())
    axiosWithAuth()
        .post(`/graphs`, graph)
        .then((res: AxiosResponse) => {
            let newGraph:Graph = res.data
            dispatch(createGraphSuccess(newGraph))
            history.push('/')
        })
        .catch((err: AxiosError) => dispatch(createGraphFailure(err.message)))
}

// GRAPH RETRIEVAL 

export const thunkGetGraphs = (): AppThunk => dispatch => {
    dispatch(getGraphsStart)
    axiosWithAuth()
        .get('/graphs')
        .then((res: AxiosResponse) => dispatch(getGraphsSuccess(res.data)))
        .catch((err: AxiosError) => dispatch(getGraphsFailure(err.message)))
}

// GRAPH DELETEION

export const thunkDeleteGraph = (id: string): AppThunk => dispatch => {
    dispatch(deleteGraphStart)
    axiosWithAuth()
        .delete(`/graphs/${id}`)
        .then((res: AxiosResponse) => dispatch(deleteGraphSuccess(id)))
        .catch((err: AxiosError)=> dispatch(deleteGraphFailure(err.message)))
}

// GRAPH UPDATE

export const thunkUpdateGraph = (id: string, graph: Graph, history: History): AppThunk => dispatch => {
    dispatch(updateGraphStart)
    axiosWithAuth()
        .put(`/graphs/${id}`, graph)
        .then((res: AxiosResponse) => {
            dispatch(updateGraphSuccess(id, graph))
            history.push('/')
        })
        .catch((err: AxiosError)=> dispatch(updateGraphFailure(err.message)))
}