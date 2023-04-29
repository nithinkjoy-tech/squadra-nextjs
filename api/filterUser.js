import {axiosInstance} from "../services/api-client"

export function filterUser(data,pageNumber=0){
    if(pageNumber>0) pageNumber=pageNumber-1
    data.date=data.validTill=="Invalid Date"?"":data.validTill
    return axiosInstance.get(`/users/filter?pagesize=10&pageno=${pageNumber}`,data)
}