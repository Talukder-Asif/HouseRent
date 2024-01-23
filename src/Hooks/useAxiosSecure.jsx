import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://task-server-murex-psi.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;