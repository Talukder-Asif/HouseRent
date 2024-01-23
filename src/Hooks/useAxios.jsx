import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-server-murex-psi.vercel.app'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;