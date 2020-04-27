
export type AuthState = {
    isAuth: boolean,
    error: string,
    isLoading: boolean
}

export enum ActionTypes {
    LOGIN_START = 'LOGIN_START',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',

    REGISTER_START = "REGISTER_START",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAILURE = "REGISTER_FAILURE",
    
    LOGOUT = 'LOGOUT',

    CLEAN_ERR = 'CLEAN_ERR',
}

type loginStart = {
    type: ActionTypes.LOGIN_START,
}

type loginSuccess = {
    type: ActionTypes.LOGIN_SUCCESS
}

type loginFailure = {
    type: ActionTypes.LOGIN_FAILURE,
    payload: string,
}

type registerStart = {
    type: ActionTypes.REGISTER_START
}

type registerSuccess = {
    type: ActionTypes.REGISTER_SUCCESS
}

type registerFailure = {
    type: ActionTypes.REGISTER_FAILURE
    payload: string
}

type logout = {
    type: ActionTypes.LOGOUT
}

type cleanErr = {
    type: ActionTypes.CLEAN_ERR
}

export type AuthActionTypes = 
    | loginStart 
    | loginSuccess
    | loginFailure
    | logout
    | registerStart
    | registerSuccess
    | registerFailure
    | cleanErr