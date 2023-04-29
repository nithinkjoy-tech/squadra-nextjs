import {axiosInstance} from "../services/api-client";

export const getUser = async pageNumber => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  const {data} = await axiosInstance.get(
    `/users?pagesize=5&pageno=${pageNumber - 1}`
  );
  return data;
};
