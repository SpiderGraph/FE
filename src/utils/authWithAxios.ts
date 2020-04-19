import axios, {AxiosResponse, AxiosError} from "axios";


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
                localStorage.removeItem("token")
            }
            return Promise.resolve({ error });
    });

    return instance
};

