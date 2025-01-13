import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

const fetchData = async ({ queryKey }) => {
    const [_key, url] = queryKey;
    const { data } = await axiosInstance.get(url);
    return data;
};

const useFetchData = (key, url) => {
    return useQuery({
        queryKey: [key, url],
        queryFn: fetchData,
    });
};

export default useFetchData;