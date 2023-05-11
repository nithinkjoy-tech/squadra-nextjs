import APIClient from "./../services/api-client";

const apiClient = new APIClient("/users");

const getUser = (pageNumber) => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 0;
  return {
    queryKey: ["users", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pagesize=4&pageno=${pageNumber-1}`);
    },
    keepPreviousData: true,
  };
};

export default getUser;
