// combine reducers
import { combineReducers } from "redux";
import { graphReducer } from "./graph/reducers";
// thunk
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// create shape of all reducers

const rootReducer = combineReducers({
    graph: graphReducer,
})

export type RootState = ReturnType<typeof rootReducer>


// reusable AppThunk type 

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>