import {axiosInstance} from "../services/api-client"

export function editCompany(id,data){
    return axiosInstance.put(`/company/${id}`,data)
}