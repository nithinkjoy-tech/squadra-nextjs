import APIClient from "../../services/api-client";

const apiClient = new APIClient("/companies");

const getFilteredCompany = (filterQuery, pageNumber) => {
  if (!pageNumber || Object.is(NaN, pageNumber)) pageNumber = 1;
  let date =
    filterQuery?.validTill == "Invalid Date" ? "" : filterQuery?.validTill;
  return {
    queryKey: ["companies", filterQuery, pageNumber],
    queryFn: () => {
      return apiClient.getAll(
        `?companyName=${filterQuery?.companyName || ""}&companyEmail=${
          filterQuery?.companyEmail || ""
        }&validTill=${date || ""}&companyId=${
          filterQuery?.companyId || ""
        }&organizationName=${
          filterQuery?.organizationName || ""
        }&pageSize=4&pageNo=${pageNumber}`
      );
    },
    keepPreviousData: true,
  };
};

export default getFilteredCompany;
