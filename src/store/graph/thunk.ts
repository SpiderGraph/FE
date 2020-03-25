import { Graph } from "./types";
import { AppThunk } from "..";
import { createGraph } from "./actions";



export const thunkCreateGraph = (graph: Graph): AppThunk => dispatch => {
    dispatch(createGraph(graph))
}