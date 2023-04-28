import {axiosInstance} from "../services/api-client"

export function deleteCompany(id){
    return axiosInstance.delete(`/company/${id}`)
}