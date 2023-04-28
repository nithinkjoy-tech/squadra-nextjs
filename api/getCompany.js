import {axiosInstance} from "../services/api-client";


export const getCompany = async(pageNumber) => {
    if(!pageNumber||Object.is(NaN,pageNumber)) pageNumber=1;
    const {data} = await axiosInstance.get(`/company?pagesize=10&pageno=${pageNumber-1}`)
    return data
};