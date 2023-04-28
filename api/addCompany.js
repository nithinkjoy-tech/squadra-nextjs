import {axiosInstance} from "../services/api-client"

export function addCompany(data){
    return axiosInstance.post("/company",data)
}