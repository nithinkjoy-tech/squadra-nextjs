import APIClient from "../services/api-client";
import {useQueryClient} from "@tanstack/react-query";
import {displayNotification} from "../services/notificationService";

const apiClient = new APIClient("/roles");

const addRole= (setError, reset, handleClose) => {
  const queryClient = useQueryClient();

  return {
    mutationFn: data => {
      return apiClient.post(data);
    },
    onError: (error, variables, context) => {
      if (error.response.status == "409") {
        setError(error.response.data.property, {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        displayNotification("error", "Could not edit role data");
      }
    },
    onSuccess: (data, variables, context) => {
      reset();
      handleClose();
      displayNotification("success", "Successfully Added");
      queryClient.invalidateQueries({queryKey: ["roles"]});
    },
  };
};

export default addRole;
