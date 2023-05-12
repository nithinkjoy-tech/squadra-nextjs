import APIClient from "../../services/api-client";
import {useQueryClient} from "@tanstack/react-query";
import {displayNotification} from "../../services/notificationService";

const apiClient = new APIClient("/wholesalers");

const deleteWholesaler = () => {
  const queryClient = useQueryClient();

  return {
    mutationFn: id => {
      return apiClient.delete(id);
    },
    onError: (error, variables, context) => {
      displayNotification("error", "Could not delete wholesalers");
    },
    onSuccess: (data, variables, context) => {
      displayNotification("success", "Successfully Deleted");
      queryClient.invalidateQueries({queryKey: ["wholesalers"]});
    },
  };
};

export default deleteWholesaler;
