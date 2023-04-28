import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "../services/api-client";


const useCompany = async(pageNumber) => {
    const {data} = await axiosInstance.get(`/company?pagesize=10&pageno=${pageNumber-1}`)
    return data
};

export default useCompany;
