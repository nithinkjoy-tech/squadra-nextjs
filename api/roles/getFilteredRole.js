import APIClient from "../../services/api-client";

const apiClient = new APIClient("/roles");

const getFilteredUser = (filterQuery, pageNumber) => {
  let date =
    filterQuery?.createdDate == "Invalid Date" ? "" : filterQuery?.createdDate;
  let url = `?pageSize=4&pageNo=${pageNumber}&roleName=${filterQuery?.roleName}&organizationName=${filterQuery?.organizationName}&createdDate=${date}&roleState=${filterQuery?.roleState}&roleId=${filterQuery?.roleId}`;
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  return {
    queryKey: ["roles", filterQuery, pageNumber],
    queryFn: () => {
      return apiClient.getAll(url);
    },
    keepPreviousData: true,
  };
};

export default getFilteredUser;
