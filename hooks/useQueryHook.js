import {useQuery} from "@tanstack/react-query";

const useQueryHook = (properties) => {
  return useQuery(properties);
};

export default useQueryHook;
