import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
})

export const fetchJobs = async (searchTerm) => {
    try{
        const response = await axiosInstance.get(`/jobs?search=${searchTerm}`);
        return response.data;
    } catch(error) {
        console.error('Error Fetching Jobs : ', error);
        throw new Error('Could not fetch jobs');
    }
};