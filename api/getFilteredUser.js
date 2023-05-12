import APIClient from "./../services/api-client";

const apiClient = new APIClient("/users");

const getFilteredUser = (filterQuery, pageNumber) => {
    let url=`?pageSize=4&pageNo=${pageNumber}&firstName=${filterQuery?.firstName}&lastName=${filterQuery?.lastName}&email=${filterQuery?.email}&phoneNumber=${filterQuery?.phoneNumber}&companyName=${filterQuery?.companyName}&userState=${filterQuery?.userState}`
    console.log(url)
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
