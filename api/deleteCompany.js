import APIClient from "../services/api-client";
import {useQueryClient} from "@tanstack/react-query";
import {displayNotification} from "../services/notificationService";

const apiClient = new APIClient("/companies");

const deleteCompany = () => {
  const queryClient = useQueryClient();

  return {
    mutationFn: id => {
      return apiClient.delete(id);
    },
    onError: (error, variables, context) => {
        displayNotification("error", "Could not delete company");
    },
    onSuccess: (data, variables, context) => {
      displayNotification("success", "Successfully Deleted");
      queryClient.invalidateQueries({queryKey: ["companies"]});
    },
  };
};

export default deleteCompany;
