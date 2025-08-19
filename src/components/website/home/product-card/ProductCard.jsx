import { Button } from '@/components/ui/button'
import React from 'react'

const ProductCard = ({ key, item }) => {
    return (
        <div>
            <div
                key={key}
                className="  bg-white   transition"
            >
                <div className="p-4">
                    <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full  object-cover"
                    />
                    <h2 className="font-bold lg:text-[16px] text-xs lg:mt-6 mt-3 text-center text-[#252B42]">
                        {item.productName}
                    </h2>
                    <p className="my-2.5 text-[#737373] lg:text-sm text-xs text-center font-bold ">{item.categoryName}</p>

                    <div className="flex items-center justify-center gap-3 mt-2">
                        <span className=" text-xs text-[#BDBDBD] lg:text-[16px]  font-bold ]">
                            ৳{item.discountPrice}
                        </span>
                        <span className="text-[16px] font-bold line-through text-[#23856D] ">
                            ৳{item.price}
                        </span>
                    </div>

                    <div className=' flex flex-row gap-x-3 justify-center mt-2.5  ' >
                        <div className=' w-4 h-4 rounded-full bg-[#23A6F0]  ' ></div>
                        <div className=' w-4 h-4 rounded-full bg-[#23856D]  ' ></div>
                        <div className=' w-4 h-4 rounded-full bg-[#E77C40]  ' ></div>
                        <div className=' w-4 h-4 rounded-full bg-[#252B42]  ' ></div>
                    </div>

                    {/* <Button className="w-full mt-4 bg-[#2DC071] font-bold text-sm ">Add to Cart</Button> */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard