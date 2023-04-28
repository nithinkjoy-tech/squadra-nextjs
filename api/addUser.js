import {axiosInstance} from "../services/api-client"

export function addUser(data){
    return axiosInstance.post("/users/",data)
}