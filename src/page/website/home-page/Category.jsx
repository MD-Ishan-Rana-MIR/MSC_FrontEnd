import React from "react";

const Category = () => {
    return (
        <div className="bg-[#fafafa] lg:py-20 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-[#252B42] lg:text-2xl text-xl font-bold text-center">
                    EDITOR’S PICK
                </h1>
                <p className="text-center font-normal text-[#737373] lg:text-sm text-xs mt-2.5">
                    Problems trying to resolve the conflict between
                </p>

                {/* Category Layout */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mt-12">
                    {/* Card 1 - Big */}
                    <div className="relative w-full lg:w-[510px]">
                        <img
                            className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
                            src="/images/home/category/category-1.jpg"
                            alt="category-1"
                        />
                        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#252B42] px-10 py-2 bg-white shadow-md">
                            MEN
                        </button>
                    </div>

                    {/* Card 2 - Tall */}
                    <div className="relative w-full lg:w-[240px]">
                        <img
                            className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover"
                            src="/images/home/category/category-2.jpg"
                            alt="category-2"
                        />
                        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#252B42] px-10 py-2 bg-white shadow-md">
                            WOMEN
                        </button>
                    </div>

                    {/* Right side two small cards */}
                    <div className="flex flex-col gap-6 w-full lg:w-[240px]">
                        {/* Card 3 */}
                        <div className="relative">
                            <img
                                className="w-full h-[200px] sm:h-[220px] lg:h-[240px] object-cover"
                                src="/images/home/category/category-3.jpg"
                                alt="category-3"
                            />
                            <button className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-[14px] text-[#252B42] px-6 py-2 bg-white shadow-md">
                                ACCESSORIES
                            </button>
                        </div>

                        {/* Card 4 */}
                        <div className="relative">
                            <img
                                className="w-full h-[200px] sm:h-[220px] lg:h-[240px] object-cover"
                                src="/images/home/category/category-4.jpg"
                                alt="category-4"
                            />
                            <button className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-[14px] text-[#252B42] px-6 py-2 bg-white shadow-md">
                                KIDS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
