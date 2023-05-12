import APIClient from "../services/api-client";
import {useQueryClient} from "@tanstack/react-query";
import {displayNotification} from "../services/notificationService";

const apiClient = new APIClient("/users");

const editUser = (
  setError,
  reset,
  handleClose,
  setEditFormData,
  initialUserData
) => {
  const queryClient = useQueryClient();

  return {
    mutationFn: data => {
      return apiClient.put(data._id, data);
    },
    onError: (error, variables, context) => {
      if (error.response.status == "409") {
        setError(error.response.data.property, {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        displayNotification("error", "Could not edit user data");
      }
    },
    onSuccess: (data, variables, context) => {
      setEditFormData(initialUserData);
      reset();
      handleClose();
      displayNotification("success", "Successfully Added");
      queryClient.invalidateQueries({queryKey: ["users"]});
    },
  };
};

export default editUser;
