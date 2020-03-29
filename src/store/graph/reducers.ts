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
                    points: [{pointName: 'point1', completed: false}]
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 72,
                    points: [
                        {pointName: 'point1', completed: false},
                        {pointName: 'point2', completed: false},
                        {pointName: 'point3', completed: false},
                        ]
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 144,
                    points: [
                        {pointName: 'point2', completed: false},
                        {pointName: 'point2', completed: false},
                    ]
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 216,
                    points: [{pointName: 'point2', completed: false},{pointName: 'point2', completed: false},{pointName: 'point2', completed: false},]
                },
                {
                    legId: 1,
                    legName: 'exLeg',
                    rotation: 288,
                    points: [{pointName: 'point2', completed: false},{pointName: 'point2', completed: false},]
                }
            ]
        }
    ]
}

export function graphReducer(state = initialState, action: GraphActionTypes){
    switch(action.type){
        case ActionTypes.CREATE_GRAPH:
            return {
                ...state,
                graphs: [...state.graphs, action.payload]
            }
        default: 
            return state
    }
}
