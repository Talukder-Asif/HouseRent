import { useContext } from "react";
import { AuthContext } from "../Authantication/AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useTask = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: Task, isPending: isTaskLoading, refetch } = useQuery({
        queryKey: ['isUsersTask'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/Task/${user?.email}`);
            return res.data;
        }
    });

    return [Task, isTaskLoading, refetch]
};

export default useTask;