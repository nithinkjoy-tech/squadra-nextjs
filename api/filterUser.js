import {axiosInstance} from "../services/api-client"

export function filterUser(data,pageNumber=0){
    if(pageNumber>0) pageNumber=pageNumber-1
    return axiosInstance.get(`/users/filter?pagesize=4&pageno=${pageNumber}&first_name=${data.first_name}&last_name=${data.last_name}&email=${data.email}&phone=${data.phone}&company_name=${data.company_name}&user_state=${data.user_state}`)
}