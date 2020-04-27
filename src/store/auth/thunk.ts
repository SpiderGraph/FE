import { AppThunk } from "..";
import { LoginStart, LoginSuccess, LoginFailure, Logout, RegisterStart, RegisterSuccess, RegisterFailure } from "./actions";
import axios, {AxiosResponse, AxiosError} from 'axios'
import {History} from 'history'


export const loginThunk = (credentials: {username: string, password: string}, history: History):AppThunk => dispatch => {
    dispatch(LoginStart())
    axios
        .post('https://spider-graph-be.herokuapp.com/auth/login', credentials)
        .then((res: AxiosResponse) =>{
            dispatch(LoginSuccess())
            localStorage.setItem("token", res.data);
            history.push('/')
        })
        .catch((err: AxiosError)=> dispatch(LoginFailure(err.response?.data.errorMessage || '')))
}

export const registerThunk = (credentials: {username: string, password: string}, history: History):AppThunk => dispatch => {
    dispatch(RegisterStart())
    axios
        .post('https://spider-graph-be.herokuapp.com/auth/register', credentials)
        .then((res: AxiosResponse) => {
            dispatch(RegisterSuccess())
            history.push('/login')
        })
        .catch((err: AxiosError) => dispatch(RegisterFailure(err.response?.data.errorMessage || '')))
}