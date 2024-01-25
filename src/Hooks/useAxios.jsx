import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://house-rent-server-chi.vercel.app'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;