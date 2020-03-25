// Reducers for graph component

import { GraphState, ActionTypes, GraphActionTypes } from "./types"

const initialState: GraphState = {
    graphs: []
}

export function graphReducer(state = initialState, {type}: GraphActionTypes){
    switch(type){
        default: 
            return state
    }
}
