import {axiosInstance} from "../services/api-client"

export function deleteCompany(id){
    console.log(id,"uuid")
    return axiosInstance.delete(`/company/${id}`)
}