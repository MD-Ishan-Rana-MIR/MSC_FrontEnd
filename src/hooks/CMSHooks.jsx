import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const useBlogData = () => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ['blogData'],
        queryFn: async()=>{
            const {data} = await axiosPublic.get('/all-blog');
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}