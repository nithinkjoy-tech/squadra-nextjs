import {axiosInstance} from "../services/api-client"

export function filterCompany(data,pageNumber=0){
    let date=data.validTill=="Invalid Date"?"":data.validTill
    return axiosInstance.get(`/company/filter?companyName=${data.companyName}&companyEmail=${data.companyEmail}&validTill=${date}&companyId=${data.companyId}&organizationName=${data.organizationName}&pageno=${pageNumber}`,)
}