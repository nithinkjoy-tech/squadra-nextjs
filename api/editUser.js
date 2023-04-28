import {axiosInstance} from "../services/api-client"

export function editUser(id,data){
    return axiosInstance.put(`/users/${id}`,data)
}