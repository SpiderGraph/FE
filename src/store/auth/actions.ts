import { AuthActionTypes, ActionTypes } from "./types";


export function LoginStart():AuthActionTypes{
    return{
        type: ActionTypes.LOGIN_START
    }
}

export function LoginSuccess():AuthActionTypes{
    return{
        type: ActionTypes.LOGIN_SUCCESS
    }
}

export function LoginFailure(err: string):AuthActionTypes{
    return{
        type: ActionTypes.LOGIN_FAILURE,
        payload: err
    }
}

export function Logout():AuthActionTypes{
    return {
        type: ActionTypes.LOGOUT
    }
}

export function RegisterStart():AuthActionTypes{
    return{
        type: ActionTypes.REGISTER_START
    }
}

export function RegisterSuccess():AuthActionTypes{
    return{
        type: ActionTypes.REGISTER_SUCCESS
    }
}

export function RegisterFailure(err: string):AuthActionTypes{
    return{
        type: ActionTypes.REGISTER_FAILURE,
        payload: err
    }
}