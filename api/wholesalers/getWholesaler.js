import APIClient from "../../services/api-client";

const apiClient = new APIClient("/wholesalers");

const getWholesaler = pageNumber => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["wholesalers", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pageSize=4&pageNo=${pageNumber}`);
    },
    keepPreviousData: true,
  };
};

export default getWholesaler;
