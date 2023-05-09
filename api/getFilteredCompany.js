import APIClient from "./../services/api-client";

const apiClient = new APIClient("/company");

const getFilteredCompany = (filterQuery, pageNumber) => {
  if(!pageNumber||Object.is(NaN,pageNumber)) pageNumber=1
  let date = filterQuery?.validTill == "Invalid Date" ? "" : filterQuery?.validTill;
  return {
    queryKey: ["company", filterQuery, pageNumber],
    queryFn: () => {
      return apiClient.getAll(
        `/filter?companyName=${filterQuery?.companyName||""}&companyEmail=${filterQuery?.companyEmail||""}&validTill=${date||""}&companyId=${filterQuery?.companyId||""}&organizationName=${filterQuery?.organizationName||""}&pagesize=4&pageno=${pageNumber-1}`
      );
    },
    keepPreviousData: true,
  };
};

export default getFilteredCompany;
