import React from 'react'

import PostCard from '@/components/website/home/PostCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/hooks/useAxiosPublic';
const Post = () => {

    const axiosPublic = useAxiosPublic();

    const { data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-blog')
            return res?.data?.data;
        }
    })

    console.log(blogs)

    return (
        <div className=' max-w-6xl mx-auto lg:my-20 my-12 lg:px-0 px-4 ' >
            <div>
                <div className=' text-center ' >
                    <h1 className=' lg:text-sm text-xs font-bold text-[#23A6F0] ' >Practice Advice</h1>
                    <h1 className=' lg:text-[40px] text-xl font-bold text-[#252B42] my-2.5 ' >Featured Posts</h1>
                    <p className=' lg:text-sm text-xs text-[#737373] font-normal ' >Problems trying to resolve the conflict between <br />
                        the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
            </div>
            <div>
                <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        blogs?.map((blog, index) => (
                            <PostCard key={index} blog={blog} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Post