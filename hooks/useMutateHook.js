import {useMutation} from "@tanstack/react-query"

const useMutateHook = (properties) => {
    return useMutation(properties)
}

export default useMutateHook