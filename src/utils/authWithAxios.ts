import axios, {AxiosResponse, AxiosError} from "axios";
import { store } from "../index";
import {Logout} from '../store/auth/actions'

export let axiosWithAuth = () => {
    let token = localStorage.getItem("token");
    let instance = axios.create({
        baseURL: "https://spider-graph-be.herokuapp.com",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    })
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        }, 
        (error: AxiosError) => {
            if(error.response?.status === 401){
                store.dispatch(Logout())
                let link = window.location
                window.location.replace(`${link}login`);
            }
            return Promise.resolve({ error });
    });

    return instance
};

