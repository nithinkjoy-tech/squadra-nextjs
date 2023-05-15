import APIClient from "../../services/api-client";

const apiClient = new APIClient("/roles");

const getRole = pageNumber => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["roles", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pageSize=4&pageNo=${pageNumber}`);
    },
    keepPreviousData: true,
  };
};

export default getRole;
