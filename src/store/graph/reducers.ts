// Reducers for graph component

import { GraphState, ActionTypes, GraphActionTypes } from "./types"

const initialState: GraphState = {
    graphs: [
        {
            graphId: 1,
            graphName: 'example',
            legs: [
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 0,
                    points: []
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 72,
                    points: []
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 144,
                    points: []
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 216,
                    points: []
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 288,
                    points: []
                }
            ]
        }
    ]
}

export function graphReducer(state = initialState, {type}: GraphActionTypes){
    switch(type){
        default: 
            return state
    }
}
