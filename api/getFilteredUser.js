import APIClient from "./../services/api-client";

const apiClient = new APIClient("/users");

const getFilteredUser = (filterQuery, pageNumber) => {
    let url=`/filter?pagesize=4&pageno=${pageNumber-1}&first_name=${filterQuery?.first_name}&last_name=${filterQuery?.last_name}&email=${filterQuery?.email}&phone=${filterQuery?.phone}&company_name=${filterQuery?.company_name}&user_state=${filterQuery?.user_state}`
  if(!pageNumber||Object.is(NaN,pageNumber)) pageNumber=1
  return {
    queryKey: ["users", filterQuery, pageNumber],
    queryFn: () => {
      return apiClient.getAll(url);
    },
    keepPreviousData: true,
  };
};

export default getFilteredUser;
