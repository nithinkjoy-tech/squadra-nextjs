import APIClient from "./../services/api-client";

const apiClient = new APIClient("/company");

const getCompany = (pageNumber) => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 0;
  return {
    queryKey: ["company", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pagesize=4&pageno=${pageNumber-1}`);
    },
    keepPreviousData: true,
  };
};

export default getCompany;
