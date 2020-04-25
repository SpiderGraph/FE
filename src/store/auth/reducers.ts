import { AuthState, AuthActionTypes, ActionTypes } from "./types"


const initialState:AuthState = {
    isAuth: !!localStorage.getItem("token"),
    error: '',
    isLoading: false
}

export function authReducer(state = initialState, action: AuthActionTypes){
    
    switch(action.type){
        case ActionTypes.LOGIN_START:
            return {
                ...state,
                isAuth: false,
                isLoading: true
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                error: ''
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                error: action.payload
            }
        case ActionTypes.LOGOUT:
            return{
                ...state,
                isAuth: false,
            }

        case ActionTypes.REGISTER_START:
            return{
                ...state,
                isLoading: true
            }
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false
            }
        case ActionTypes.REGISTER_FAILURE:
            return{
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}