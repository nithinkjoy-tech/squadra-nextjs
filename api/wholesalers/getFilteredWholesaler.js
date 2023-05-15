import APIClient from "../../services/api-client";

const apiClient = new APIClient("/wholesalers");

const getFilteredWholesaler = (filterQuery, pageNumber) => {
  let url = `?pageSize=4&pageNo=${pageNumber}&firstName=${filterQuery?.firstName||""}&lastName=${filterQuery?.lastName||""}&email=${filterQuery?.email||""}&phoneNumber=${filterQuery?.phoneNumber||""}&wholesalerId=${filterQuery?.wholesalerId||""}`;
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["wholesalers", filterQuery, pageNumber],
    queryFn: () => {
      return apiClient.getAll(url);
    },
    keepPreviousData: true,
  };
};

export default getFilteredWholesaler;
