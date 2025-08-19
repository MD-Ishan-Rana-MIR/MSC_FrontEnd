import React from 'react'

import PostCard from '@/components/website/home/PostCard';
const Post = () => {
    const blogData = [
        {
            "image": "/images/home/post/blog-1.png",
            "tag": ["Technology", "AI"],
            "title": "How AI is Changing the World",
            "description": "Artificial Intelligence is rapidly transforming industries, from healthcare to finance.",
            "date": "2025-08-15",
            "totalComment": 12
        },
        {
            "image": "/images/home/post/blog-2.png",
            "tag": ["Design", "UI/UX"],
            "title": "Top 10 UI Trends in 2025",
            "description": "Explore the latest design trends that are shaping modern user experiences.",
            "date": "2025-08-12",
            "totalComment": 8
        },
        {
            "image": "/images/home/post/blog-3.png",
            "tag": ["Business", "Startup"],
            "title": "Scaling Your Startup the Right Way",
            "description": "Learn the strategies successful founders use to grow their businesses sustainably.",
            "date": "2025-08-10",
            "totalComment": 20
        }
    ]
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
                    {blogData.map((blog, index) => (
                        <PostCard key={index} blog={blog}  />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post