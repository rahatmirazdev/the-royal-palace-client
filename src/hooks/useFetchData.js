import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async (url) => {
    const { data } = await axios.get(url);
    return data;
};

const useFetchData = (key, url) => {
    return useQuery([key], () => fetchData(url));
};

export default useFetchData;