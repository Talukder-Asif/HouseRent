import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTaskById = (Id) => {
    const axiosPublic = useAxios();
    const { data: Task, isPending: isTaskLoading, refetch } = useQuery({
        queryKey: ['isTask'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/Tasks/${Id}`);
            return res.data;
        }
    });
    return [Task, isTaskLoading, refetch]
};

export default useTaskById;