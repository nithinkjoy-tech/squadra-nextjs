import APIClient from "./../services/api-client";

const apiClient = new APIClient("/users");

const getUser = (pageNumber) => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["users", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pageSize=4&pageNo=${pageNumber}`);
    },
    keepPreviousData: true,
  };
};

export default getUser;
