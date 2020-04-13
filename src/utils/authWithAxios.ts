import axios from "axios";


export let axiosWithAuth = () => {
    let token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://spider-graph-be.herokuapp.com",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
};