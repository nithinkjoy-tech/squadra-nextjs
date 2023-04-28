import {axiosInstance} from "../services/api-client"

export function deleteUser(id){
    return axiosInstance.delete(`/users/${id}`)
}