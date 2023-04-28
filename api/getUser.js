import {axiosInstance} from "../services/api-client";

export const getUser = async(pageNumber) => {
    if(!pageNumber||Object.is(NaN,pageNumber)) pageNumber=1;
    const {data} = await axiosInstance.get(`/users?pagesize=10&pageno=${pageNumber}`)
    return data
};