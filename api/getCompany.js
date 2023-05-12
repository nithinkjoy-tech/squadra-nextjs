import APIClient from "./../services/api-client";

const apiClient = new APIClient("/companies");

const getCompany = (pageNumber) => {
  console.log(pageNumber,"pnooo")
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["companies", pageNumber],
    queryFn: () => {
      return apiClient.getAll(`?pageSize=4&pageNo=${pageNumber}`);
    },
    keepPreviousData: true,
  };
};

export default getCompany;
